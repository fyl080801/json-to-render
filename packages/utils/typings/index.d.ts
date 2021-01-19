declare type FunctionNext = (scope: any) => void

declare type FunctionHook = (scope: any, next: FunctionNext) => void

declare type FunctionPipeLine = (funcs: FunctionHook[]) => FunctionNext
