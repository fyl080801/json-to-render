export default (array = [], init = {}, mapper = () => true) => {
  return array.reduce(mapper, init)
}
