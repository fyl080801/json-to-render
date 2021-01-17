import { FunctionHook } from '@jrender/types/index'

const handleObject = (field: any) => {
  field.component = 'el-form'
  field.props = { labelWidth: '120px' }
  field.children = Object.keys(field.properties || {}).map(key => {
    const name = field.parent ? `${field.parent}.${key}` : key
    return {
      ...field.properties[key],
      name,
      parent: name
    }
  })
}

const handleString = (field: any) => {
  const nameProp = Reflect.getOwnPropertyDescriptor(field, 'name')

  field.component = 'el-form-item'
  field.props = {
    label: nameProp?.value
  }
  field.children = [
    {
      component: 'el-input',
      props: {
        modelValue: { $type: 'bind', $source: nameProp?.value },
        'onUpdate:modelValue': {
          $type: 'on',
          $model: nameProp?.value,
          $result: 'arguments[0]'
        }
      }
    }
  ]
}

const handleNumber = (field: any) => {
  const nameProp = Reflect.getOwnPropertyDescriptor(field, 'name')

  field.component = 'el-form-item'
  field.props = {
    label: nameProp?.value
  }
  field.children = [
    {
      component: 'el-input-number',
      props: {
        modelValue: { $type: 'bind', $source: nameProp?.value },
        'onUpdate:modelValue': {
          $type: 'on',
          $model: nameProp?.value,
          $result: 'arguments[0]'
        }
      }
    }
  ]
}

const jsonSchema: FunctionHook = (field, next) => {
  if (field.type === 'object') {
    handleObject(field)
  } else if (field.type === 'string') {
    handleString(field)
  } else if (field.type === 'number') {
    handleNumber(field)
  }

  next(field)
}

export default jsonSchema
