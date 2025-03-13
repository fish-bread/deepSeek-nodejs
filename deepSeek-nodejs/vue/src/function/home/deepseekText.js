import { ref } from 'vue'
import {newTitle} from "@/function/home/window.js";
export const TextDeepSeek = ref() // 用户输入的文本
export const currentMessage = ref({ user: '', assistant: '' }); // 当前对话的用户提问和AI回答
export const history = ref([]); // 存储所有会话历史
export const nowSessionHistoryId = ref()
// 选择历史记录的方法
export const selectHistory = (historyId) => {
  newTitle.value = true
  nowSessionHistoryId.value = historyId;
  console.log('当前选中的 history_id:', nowSessionHistoryId.value);
};
