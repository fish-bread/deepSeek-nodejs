import {
  currentMessage,
  history,
  TextDeepSeek,
  nowSessionHistoryId,
} from "@/function/home/deepseekText.js";
import { newTitle } from "@/function/home/window.js";
import { v4 as uuidv4 } from 'uuid'
import {createAxios} from "@/axios/index.js";
import {useUserStore} from "@/stores/user.js";
export const intoDeepSeek = async () => {
  console.log('Input text:', TextDeepSeek.value);
  newTitle.value = true;

  const apiKey = 'your_deepseek_api_key';
  const url = 'https://api.deepseek.com/v1/chat/completions';

  try {
    //添加id
    if (nowSessionHistoryId.value === undefined) {
      nowSessionHistoryId.value = uuidv4();
      console.log('现在id',nowSessionHistoryId.value);
    }

    // 查找是否已存在对应的 history_id
    const existingHistory = history.value?.find(item => item.history_id === nowSessionHistoryId.value);

    // 根据查找结果决定使用哪个 history 数组
    const historyMessages = existingHistory
      ? existingHistory.history.flatMap(msg => [
        { role: "user", content: msg.user },
        { role: "assistant", content: msg.assistant }
      ])
      : [{ role: "user", content: "用户空白对话,不必理会" }, { role: "assistant", content: "ai空白对话,不必理会" }];

    console.log('historyMessages', historyMessages);

    const messages = [
      { role: "user", content: "一步一步分析下面的问题，用中文回答" },
      ...historyMessages,
      { role: "user", content: TextDeepSeek.value }
    ];
    console.log('Messages', messages);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: messages,
        model: 'deepseek-chat',
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API request failed: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    if (!response.body) {
      throw new Error('Response body is undefined');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data:')) {
          const data = line.slice(5).trim();

          if (data === '[DONE]') {
            console.log('Stream finished');
            // 查找是否已存在对应的 history_id
            const existingHistoryIndex = history.value.findIndex(item => item.history_id === nowSessionHistoryId.value);

            if (existingHistoryIndex !== -1) {
              // 如果存在，更新对应的 history 对象
              history.value[existingHistoryIndex].history.push({
                user: currentMessage.value.user,
                assistant: currentMessage.value.assistant
              });
            } else {
              // 如果不存在，新增一个 history_id 和 history 对象
              history.value.push({
                history_id: nowSessionHistoryId.value,
                history: [{
                  user: currentMessage.value.user,
                  assistant: currentMessage.value.assistant
                }]
              });
            }
            //向后端添加历史对话
            await createAxios({
              method: "POST",
              url: '/user/userHistory',
              data: {
                user_uid: useUserStore().user.user_uid,
                user_history: {
                  history_id: nowSessionHistoryId.value,
                  history: [{
                    user: currentMessage.value.user,
                    assistant: currentMessage.value.assistant
                  }]
                },
              }
            })
            console.log('History:', history.value);
            currentMessage.value = { user: '', assistant: '' }; // 清空当前对话
            break;
          }

          try {
            const jsonData = JSON.parse(data);
            if (jsonData.choices && jsonData.choices[0].delta.content) {
              // 实时更新AI的回答
              currentMessage.value.assistant += jsonData.choices[0].delta.content;
              console.log('Received content:', jsonData.choices[0].delta.content);
            }
          } catch (error) {
            console.error('Failed to parse JSON:', error);
          }
        }
      }
    }

    console.log('Final response:', currentMessage.value.assistant);
    console.log('现在id',nowSessionHistoryId.value);
  } catch (error) {
    console.error('请求失败:', error);
    currentMessage.value.assistant = '请求失败，请检查控制台。';
  }
};
export const userHistory = async () => {
  await createAxios({
    method: "POST",
    url: '/user/searchUserHistory',
    data: {
      user_uid: useUserStore().user.user_uid,
    }
  }).then(res => {
    console.log('Response历史:', res.data.user_history);
    history.value = res.data.user_history;
  }).catch(err => {
    console.error('Failed to parse JSON:', err);
  })
}
