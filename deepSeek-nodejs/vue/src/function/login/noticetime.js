import { isCaptcha } from '@/function/login/loginToHome'
//登录定时器
export let isCaptchaTimeId
//登录页定时器
export const isCaptchaTime = () => {
  clearTimeout(isCaptchaTimeId)
  isCaptchaTimeId = setTimeout(() => {
    isCaptcha.value = false
  }, 1500)
  return isCaptchaTimeId
}
