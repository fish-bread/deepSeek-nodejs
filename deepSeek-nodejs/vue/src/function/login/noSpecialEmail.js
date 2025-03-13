import { isValidEmail } from '@/function/login/noticeLogin'
// 防抖函数
const debounce = (func, wait) => {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}
export const validateEmail = (value) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  isValidEmail.value = emailRegex.test(value)
  console.log('isValidateEmail', isValidEmail.value)
}
export default {
  beforeMount(el, binding) {
    const validateEmail = binding.value
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const handleInput = debounce((event) => {
      const value = event.target.value
      const filteredValue = value.replace(/[^a-zA-Z0-9@.]/g, '')
      if (value !== filteredValue) {
        event.target.value = filteredValue
        console.log('执行特殊', value, '->', filteredValue)
      } else {
        console.log('非特殊字符')
      }
      const isValid = emailRegex.test(value)
      if (isValid) {
        console.log('是邮箱')
      } else {
        console.log('不是邮箱')
      }
      validateEmail(value)
    }, 100)
    el.addEventListener('input', handleInput)
  }
}
