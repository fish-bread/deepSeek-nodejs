<script setup>
import { onMounted } from "vue";
import {userToken} from "@/axios/iframe.js";
import { userHistory } from "@/axios/deepseekAPI.js";
import HomeLeft from "@/views/homeIndex/components/homeLeft.vue";
import HomeBody from "@/views/homeIndex/components/homeBody.vue";
import {homeAll} from '@/function/home/window.js'
import { newTitle } from "@/function/home/window.js";
import HomeTitle from "@/views/homeIndex/components/homeTitle.vue";
onMounted(async () => {
  await userToken()
  await userHistory().then()
})
</script>

<template>
  <div ref="homeAll" class="home_all">
    <home-left></home-left>
    <home-body v-show="!newTitle"></home-body>
    <home-title v-show="newTitle"></home-title>
  </div>
</template>

<style scoped>
.home_all {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 260px auto;
  transition: grid-template-columns 0.3s ease;
}
</style>
