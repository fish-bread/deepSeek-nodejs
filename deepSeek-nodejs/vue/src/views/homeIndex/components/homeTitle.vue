<script setup>
import HomeInput from "@/components/homeInput.vue";
import { chatHistory, currentMessage } from "@/function/home/deepseekText.js";
</script>

<template>
  <!--聊天界面-->
  <div class="body-title">
    <div class="body-home-read">
      <div class="chat-history">
        <!-- 显示历史对话 -->
        <div v-for="(message, index) in chatHistory" :key="index" class="message-container">
          <div v-if="message.user" class="user-message">{{ message.user }}</div>
          <div v-if="message.assistant" class="assistant-message">{{ message.assistant }}</div>
        </div>
        <!-- 显示当前对话 -->
        <div class="message-container">
          <div v-if="currentMessage.user" class="user-message">{{ currentMessage.user }}</div>
          <div v-if="currentMessage.assistant" class="assistant-message">{{ currentMessage.assistant }}</div>
        </div>
      </div>
      <home-input></home-input>
    </div>
  </div>
</template>

<style scoped>
.body-title {
  width: 100%;
  background-color: #ffffff;
  display: grid;
}

.body-home-read {
  display: grid;
  height: 100vh;
  box-sizing: border-box;
  padding: 0 64px 0 64px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  grid-template-rows: 700px auto;
}

.chat-history {
  height: calc(100vh - 180px);
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.message-container {
  display: flex;
  flex-direction: column;
  gap: 10px; /* 用户消息和AI消息之间的间距 */
}

.user-message {
  align-self: flex-end; /* 用户消息靠右 */
  background-color: #e3f2fd; /* 用户消息背景色 */
  padding: 12px 16px;
  border-radius: 15px;
  max-width: 70%;
  word-break: break-word;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

.assistant-message {
  align-self: flex-start; /* AI消息靠左 */
  background-color: #f5f5f5; /* AI消息背景色 */
  padding: 12px 16px;
  border-radius: 15px;
  max-width: 70%;
  word-break: break-word;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}
</style>
