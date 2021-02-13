export default (logic: any, v1: any, v2: any) => {
  const result = (typeof logic === 'function' ? logic() : logic) ? v1 : v2
  return typeof result === 'function' ? result() : result
}
