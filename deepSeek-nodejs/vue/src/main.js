import { createApp } from 'vue'
import pinia from '@/stores/index.js'

import noSpecialChars from '@/function/login/noSpecialChars'
import NoSpecialEmail from '@/function/login/noSpecialEmail'
import NoSpecialCaptcha from '@/function/login/noSpecialCaptcha'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.directive('no-special-chars', noSpecialChars)
app.directive('no-special-email', NoSpecialEmail)
app.directive('no-special-captcha', NoSpecialCaptcha)

app.mount('#app')
