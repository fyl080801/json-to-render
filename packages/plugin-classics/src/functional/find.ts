export default (list: any[], exp: any, def: any) => {
  const result = list.find(exp)
  return result !== undefined && result !== null ? result : def
}
