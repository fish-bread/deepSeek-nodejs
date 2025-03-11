import {
  chatHistory,
  currentMessage,
  TextDeepSeek,
} from "@/function/home/deepseekText.js";
import { newTitle } from "@/function/home/window.js";

export const intoDeepSeek = async () => {
  console.log('Input text:', TextDeepSeek.value);
  newTitle.value = true;

  const apiKey = 'your_api_key';
  const url = 'https://api.deepseek.com/v1/chat/completions';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: `${TextDeepSeek.value}` }],
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
            // 将当前对话添加到历史记录中
            chatHistory.value.push({ ...currentMessage.value });

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
    console.log('对话历史', chatHistory.value);
  } catch (error) {
    console.error('请求失败:', error);
    currentMessage.value.assistant = '请求失败，请检查控制台。';
  }
};
