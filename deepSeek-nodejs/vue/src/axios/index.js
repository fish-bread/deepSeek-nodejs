import axios from 'axios'
import {useUserStore} from "@/stores/user.js";
import router from "@/router/index.js";
export const createAxios =axios.create({
  baseURL: 'http://localhost:3000',
    timeout: 5000,
  headers: {
    'content-type': 'application/json'
  }
})
export const loginAxios = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'content-type': 'application/json'
  }
})
//请求拦截器
createAxios.interceptors.request.use(async (config) => {
  const token = await useUserStore().user_token
  config.headers['Authorization'] = `Bearer ${token}`
  return config
})
//响应拦截器
createAxios.interceptors.response.use(async (response) => {
  const status = response.status
  console.log('token代码', status)
  if (status === 200) {
    console.log('token有效')
  } else if (status === 401) {
    console.log('token无效')
    await router.push('/login')
  } else {
    console.log('其他报错')
  }
  return response
})
