// export declare interface JField {
//   component: string
//   props?: any
//   children?: JFieldArray | { [key: string]: any }
//   [x: string]: any
// }

// export declare type JFieldArray = Array<JField>

export declare interface ClassicTransform {
  $type: string
}

export declare interface ComputedTransform extends ClassicTransform {
  $result: string
}

export declare interface MethodTransform extends ClassicTransform {
  $context: string
  $result: string
}
