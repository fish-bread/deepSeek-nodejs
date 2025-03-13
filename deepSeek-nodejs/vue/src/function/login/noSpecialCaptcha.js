const debounce = (func, wait) => {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}
export default {
  beforeMount(el) {
    const handleInput = debounce((event) => {
      const value = event.target.value
      const filteredValue = value.replace(/[^0-9]/g, '')
      if (value !== filteredValue) {
        event.target.value = filteredValue
        console.log('执行特殊', value, '->', filteredValue)
      } else {
        console.log('非特殊字符')
      }
    }, 100)
    el.addEventListener('input', handleInput)
  }
}
