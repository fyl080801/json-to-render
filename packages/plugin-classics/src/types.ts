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
