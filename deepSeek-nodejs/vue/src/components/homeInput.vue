<script setup>

import {currentMessage, TextDeepSeek} from "@/function/home/deepseekText.js";
import {intoDeepSeek} from "@/axios/deepseekAPI.js";
import {computed, onMounted, ref} from "vue";
const textArea = ref(null);
const textAreaHeight = ref(0);

const handleInput = () => {
  if (textArea.value) {
    textAreaHeight.value = textArea.value.scrollHeight;
  }
};

// 初始化时获取初始高度
onMounted(() => {
  if (textArea.value) {
    textAreaHeight.value = textArea.value.scrollHeight;
  }
});

// 计算容器总高度（包含底部按钮区域）
const inputContainerHeight = computed(() => {
  const BOTTOM_HEIGHT = 39;  // 底部按钮区域固定高度
  const MIN_HEIGHT = 128;    // 容器最小高度
  const MAX_HEIGHT = 330;    // 容器最大高度

  let totalHeight = textAreaHeight.value + BOTTOM_HEIGHT;
  totalHeight = Math.max(totalHeight, MIN_HEIGHT);
  totalHeight = Math.min(totalHeight, MAX_HEIGHT);

  return `${totalHeight}px`;
});
const sendMessage = () => {
  currentMessage.value.user = TextDeepSeek.value; // 存储用户提问
  intoDeepSeek(); // 调用AI接口
  TextDeepSeek.value = ''; // 清空输入框
};

//为文本域输入添加回车发送
const handleEnter = (e) => {
  if (e.keyCode === 13 && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
};
</script>

<template>
  <!--对话-->
  <div class="body-home-read-bottom">
    <div
      :style="{ height: inputContainerHeight }"
      class="body-home-read-bottom-input">
          <textarea
            @keydown="handleEnter"
            rows="2"
            ref="textArea"
            @input="handleInput"
            placeholder="发送信息给牢大"
            v-model="TextDeepSeek"
          ></textarea>
      <div class="body-home-read-bottom-input-bottom">
        <button @click="sendMessage" title="请输入你的问题" class="body-home-read-bottom-input-button">
          <svg width="18" height="20" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 16c-.595 0-1.077-.462-1.077-1.032V1.032C5.923.462 6.405 0 7 0s1.077.462 1.077 1.032v13.936C8.077 15.538 7.595 16 7 16z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M.315 7.44a1.002 1.002 0 0 1 0-1.46L6.238.302a1.11 1.11 0 0 1 1.523 0c.421.403.421 1.057 0 1.46L1.838 7.44a1.11 1.11 0 0 1-1.523 0z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M13.685 7.44a1.11 1.11 0 0 1-1.523 0L6.238 1.762a1.002 1.002 0 0 1 0-1.46 1.11 1.11 0 0 1 1.523 0l5.924 5.678c.42.403.42 1.056 0 1.46z" fill="currentColor"></path></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body-home-read-bottom {
  height: 100%;
}
.body-home-read-bottom-input {
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  background-color: #e1f5fe;
  border-radius: 20px;
  cursor: text;
  display: grid;
  grid-template-rows: auto 39px;
}
textarea {
  all: unset;
  resize: none;
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  min-height: 69px;
  height: auto;
}
.body-home-read-bottom-input-bottom {
  margin-top: 4px;
  display: grid;
  align-items: center;
  justify-content: end;
}
.body-home-read-bottom-input-button {
  all: unset;
  width: 35px;
  height: 35px;
  cursor: pointer;
  display: grid;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #b3e5fc;
}
.body-home-read-bottom-input-button:hover {
  background-color: #81d4fa;
}
</style>
