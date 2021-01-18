declare interface JField {
  component: string
  props?: any
  children?: JFieldArray | { [key: string]: any }
  [x: string]: any
}

declare type JFieldArray = Array<JField>

// 经典转换类型
// export interface Proxy
declare interface ClassicTransform {
  $type: string
}
declare interface RawTransform extends ClassicTransform {
  $value: unknown
}
declare interface ConditionTransform extends ClassicTransform {
  $condition: unknown
  $value: unknown
}
declare interface BindTransform extends ClassicTransform {
  $source: string
}
declare interface FunctionTransform extends ClassicTransform {
  $model: string
  $result: string
}
