import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    user_name: '',
    user_email: '',
    user_phone: '',
    user_uid: '',
    user_headShot: '',
    user_background: ''
  })
  const user_token = ref('')
  const loginEmailUser = ref({
    user_email: '',
    user_captcha: ''
  })
  const loginPhoneUser = ref({
    user_phone: '',
    user_captcha: ''
  })
  console.log('注册')
  return {
    user,
    user_token,
    loginEmailUser,
    loginPhoneUser,
  }
},  {
  persist: [
      {
        key: 'user',
        storage: localStorage,
        pick: ['user'], // 仅持久化 user
      },
    {
      key: 'user_token',
      storage: localStorage,
      pick: ['user_token'], // 仅持久化 user_token
    },
  ]
})
