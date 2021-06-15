import { defineComponent, ref } from 'vue'
import yaml from 'js-yaml'
import { assignArray, deepSet } from '@json2render/core'
import pluginElementUI from '@json2render/plugin-elementui'

export default defineComponent({
  setup() {
    const json = ref({ datasource: {}, listeners: [], fields: [], model: {} })

    fetch(`/data/yaml/testform.yaml`).then(async (response) => {
      const text = await response.text()

      const obj = yaml.load(text)

      Object.assign(
        json.value,
        { datasource: {}, listeners: [], fields: [], model: {} },
        obj
      )
    })

    const onSetup = (hooks: any) => {
      const { proxy } = hooks

      pluginElementUI(hooks)

      // 用 = 代替 # 表示模板字符
      proxy((value: any, { functional }: any) => {
        const func = (context: any) => {
          try {
            const expr = value.slice(value.indexOf(':') + 1, value.length)
            const contextKeys = Object.keys(context)
            const functionals = functional()
            const exprStr = '`' + expr + '`'

            return new Function(
              ...assignArray(contextKeys, functionals.names, [
                `return ${exprStr}`,
              ])
            )(
              ...assignArray(
                contextKeys.map((key) => context[key]),
                functionals.executers
              )
            )
          } catch {
            //
          }
        }

        return typeof value === 'string' && /^([=]:)/g.test(value)
          ? func
          : undefined
      })

      // yaml 里用 ~ 代替 @ 表示事件
      proxy((value: any, { functional }: any) => {
        const execute = (context: any) => {
          return (...args: any) => {
            try {
              const expr = value.slice(value.indexOf(':') + 1, value.length)
              const expProp = value.slice(1, value.indexOf(':'))
              const contextkeys = Object.keys(context)
              const functionals = functional()
              const inputs = assignArray(
                contextkeys.map((key) => context[key]),
                functionals.executers,
                [args]
              )

              const result = new Function(
                ...assignArray(contextkeys, functionals.names, [
                  'arguments',
                  `return ${expr}`,
                ])
              )(...inputs)

              if (expProp && expProp.length > 0) {
                const keyExpr = '`' + expProp + '`'
                const expKey = new Function(
                  ...assignArray(contextkeys, [
                    'arguments',
                    `return ${keyExpr}`,
                  ])
                )(...inputs)
                deepSet(context, expKey, result)
              } else {
                return result
              }
            } catch {
              // console.log(e)
            }
          }
        }

        return typeof value === 'string' && /^(~[\s\S]*:)/g.test(value)
          ? execute
          : undefined
      })
    }

    return () => (
      <div>
        <v-jrender
          v-model={json.value.model}
          fields={json.value.fields}
          datasource={json.value.datasource}
          listeners={json.value.listeners}
          class="j-form"
          onSetup={onSetup}
        ></v-jrender>
      </div>
    )
  },
})
