export const debounce = (fn: (...args: any[]) => void, delay: number) => {
  let timer: NodeJS.Timeout | null = null

  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
