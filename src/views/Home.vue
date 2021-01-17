<template>
  <div class="home">
    <v-jrender
      v-model="model"
      :fields="fields"
      class="j-form"
      @setup="onSetup"
    ></v-jrender>
    <hr />
    <!-- <p>{{ model.text1 }}</p>
    <span v-bind:class="model.text1"></span>
    <input v-model="model.text1" />
    <el-input v-model="model.text1"></el-input> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '../components/HelloWorld.vue'

export default defineComponent({
  name: 'Home',
  setup: () => {
    const rmodel: any = { text1: 'xxx', obj: { selected: 0 } }
    const fields = [
      {
        component: 'p',
        condition: { $type: 'bind', $source: 'obj.selected' },
        text: { $type: 'bind', $source: 'text1' }
      },

      {
        component: 'div',
        children: [
          {
            component: 'el-form',
            props: {
              labelWidth: '120px'
            },
            children: [
              {
                component: 'el-form-item',
                props: { label: 'input1' },
                children: [
                  {
                    component: 'el-input',
                    props: {
                      modelValue: { $type: 'bind', $source: 'text1' },
                      'onUpdate:modelValue': {
                        $type: 'on',
                        $model: 'text1',
                        $result: 'arguments[0]'
                      }
                    }
                  },
                  {
                    component: 'p',
                    props: { class: { $type: 'bind', $source: 'text1' } },
                    text: { $type: 'bind', $source: 'text1' }
                  }
                ]
              },
              {
                component: 'el-form-item',
                props: { label: 'select1' },
                children: [
                  {
                    component: 'el-select',
                    props: {
                      modelValue: { $type: 'bind', $source: 'obj.selected' },
                      'onUpdate:modelValue': {
                        $type: 'on',
                        $model: 'obj.selected',
                        $result: 'arguments[0]'
                      }
                    },
                    children: [
                      {
                        component: 'el-option',
                        props: { value: 0, label: '选项1' }
                      },
                      {
                        component: 'el-option',
                        props: { value: 1, label: '选项2' }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            component: 'el-button',
            text: 'click1',
            props: {
              type: 'primary',
              onClick: { $type: 'on', $result: 'alert("aaa")' }
            }
          },
          {
            component: 'v-jrender',
            props: {
              class: 'j-form',
              modelValue: { $type: 'bind', $source: 'obj' },
              fields: {
                $type: 'raw',
                $value: [
                  { component: 'p', text: '嵌套渲染' },
                  {
                    component: 'p',
                    text: { $type: 'bind', $source: 'selected' }
                  }
                ]
              }
            }
          }
        ]
      }
    ]

    // console.log(fields)

    return {
      // model: { text1: text1 },
      model: rmodel,
      fields
    }
  },
  methods: {
    onSetup(instacne: any) {
      instacne.use((builder: any) => {
        builder.component(HelloWorld)
      })
    }
  }
})
</script>
