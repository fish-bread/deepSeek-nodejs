<script setup>
import HomeInput from "@/components/homeInput.vue";
</script>

<template>
  <div class="body-home">
    <div class="body-home-read">
      <!--top-->
      <div class="body-home-read-header">
        <div class="body-home-read-header-logo">
          what can i say?
        </div>
        <div class="body-home-read-header-title">
          扣1复活牢大,111111111111111111
        </div>
      </div>
      <!--对话-->
      <home-input></home-input>
    </div>
  </div>
</template>

<style scoped>
.body-home {
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
  grid-template-rows: 400px auto;
}
.body-home-read-header {
  display: grid;
  grid-template-rows: auto 54px;
  align-items: center;
  justify-items: center;
}
.body-home-read-header-logo {
  margin-top: 300px;
  font-size: 24px ;
}
</style>
