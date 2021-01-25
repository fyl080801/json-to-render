declare type FunctionNext = (scope: any) => void

declare type FunctionHook = (
  opts: any
) => (scope: any, next: FunctionNext) => void

declare type FunctionPipeLine = (
  funcs: FunctionHook[],
  opts: any
) => FunctionNext
