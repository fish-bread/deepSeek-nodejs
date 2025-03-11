import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
export const TextDeepSeek = ref()
export const chatHistory = ref([]) // 新增对话历史
export const currentMessage = ref({ user: '', assistant: '' }); // 当前对话的用户提问和AI回答
export const currentSessionId = ref(''); // 当前会话的唯一ID
export const history = ref([]); // 存储所有会话历史
export const selectedSessionId = ref(''); // 当前选中的会话ID
