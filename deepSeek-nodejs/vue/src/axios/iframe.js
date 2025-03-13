import {createAxios, loginAxios} from "@/axios/index.js";
//import { user } from "@/function/store.js";
import { useUserStore } from '../stores/user'
import {isCaptcha, number, startCountdown} from "@/function/login/loginToHome.js";
import {isCaptchaTime} from "@/function/login/noticetime.js";
import router from '@/router/index.js'
//邮箱注册
export const loginEmailUser = async () => {
  await loginAxios({
      method: 'post',
    url: '/user_login_email',
    data: {
      user_email:useUserStore().loginEmailUser.user_email,
      user_captcha: useUserStore().loginEmailUser.user_captcha
    }
    }).then(res => {
      console.log(res)
    useUserStore().user_token = res.data.user_token;
      useUserStore().user = res.data.user
      router.replace('/home');
  }).catch(err => {
      console.log(err)
  })
}
//手机注册
export const loginPhoneUser = async () => {
  await loginAxios({
    method: 'post',
    url: '/user_login_phone',
    data: {
      user_phone:useUserStore().loginPhoneUser.user_phone,
      user_captcha: useUserStore().loginPhoneUser.user_captcha
    }
  }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}
//验证token
export const userToken = async () => {
  await createAxios({
    method: 'post',
    url: '/user_login_token',
    data: {
      user_token: useUserStore().user_token
    }
  })
}
//邮箱验证码
export const emailCaptcha = async () => {
  await loginAxios({
    method: 'POST',
    url: `/user_sendEmail`,
    data: {
      to: useUserStore().loginEmailUser.user_email
    },
    timeout: 10000
  })
    .then((res) => {
      console.log(res.status)
      console.log('成功', res.data.message)
      number.value = 4
      isCaptcha.value = true
      isCaptchaTime()
      startCountdown()
      console.log('验证码已发送')
    })
    .catch((err) => {
      if (err.code === 'ERR_NETWORK') {
        // 处理网络错误
        console.error('网络错误:', err.message)
      } else {
        console.log(err.status)
      }
    })
}
