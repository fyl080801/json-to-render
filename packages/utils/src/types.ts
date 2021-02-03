export declare type FunctionNext = (scope: any) => void

export declare type FunctionHook = (
  opts: any
) => (scope: any, next: FunctionNext) => void

export declare type FunctionPipeLine = (
  funcs: FunctionHook[],
  opts: any
) => FunctionNext
