import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useWindowStore = defineStore('window_size', () => {
  const window_height = ref(window.innerHeight)
  const window_width = ref(window.innerWidth)

  // 更新窗口尺寸的方法
  const updateWindowSize = () => {
    window_height.value = window.innerHeight
    window_width.value = window.innerWidth
    console.log('高',window_height.value)
    console.log('宽',window_width.value)
  }

  return {
    window_height,
    window_width,
    updateWindowSize,
  }
})
