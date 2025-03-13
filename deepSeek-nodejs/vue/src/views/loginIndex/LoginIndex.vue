<!--suppress ALL -->
<script setup>
import { useUserStore } from "@/stores/user.js";
import { validateEmail } from "@/function/login/noSpecialEmail.js";
import { ClickEmailCaptcha, isEmail, prompt, isCaptcha, ClickPhoneCaptcha, SwitchLoginEmail, SwitchLoginPhone, captchaText, captchaButtonText, captchaButtonDisabled, startCountdown, number, routerGoTo } from "@/function/login/loginToHome.js";
</script>

<template>
  <!--登录页面-->
  <!--背景-->
  <div class="login-page">
    <!--主体-->
    <div class="login-box">
      <!--提示框-->
      <!--验证码发送--><!--验证登录-->
      <transition name="prompt">
        <div v-show="isCaptcha" ref="captchaText" class="captcha-text">
          {{ prompt[number].name }}
        </div>
      </transition>
      <!--顶部logo-->
      <div class="login-top">
        <div>科比牢大</div>
      </div>
      <!--中间登录件-->
      <div class="login-center">
        <!--账号-->
        <div v-show="isEmail" class="login-input-all-phone">
          <div class="user-input">
            <input
              v-model="useUserStore().loginEmailUser.user_email"
              v-no-special-email="validateEmail"
              type="email"
              minlength="1"
              maxlength="24"
              placeholder="邮箱"
            />
          </div>
          <!--验证码-->
          <div class="user-captcha">
            <input
              v-model="useUserStore().loginEmailUser.user_captcha"
              v-no-special-captcha
              type="tel"
              minlength="1"
              maxlength="6"
              placeholder="邮箱验证码"
            />
            <!--发送验证码-->
            <button
              class="user-captcha-button"
              :disabled="captchaButtonDisabled"
              @click="ClickEmailCaptcha"
            >
              {{ captchaButtonText }}
            </button>
          </div>
        </div>
        <!--手机号登录间隔15px-->
        <!--账号-->
        <div v-show="!isEmail" class="login-input-all-phone">
          <div class="user-input">
            <input
              v-model="useUserStore().loginPhoneUser.user_phone"
              v-no-special-email="validateEmail"
              type="tel"
              minlength="1"
              maxlength="11"
              placeholder="手机号"
            />
          </div>
          <!--验证码-->
          <div class="user-captcha">
            <input
              v-model="useUserStore().loginPhoneUser.user_captcha"
              v-no-special-captcha
              type="tel"
              minlength="1"
              maxlength="6"
              placeholder="手机验证码"
            />
            <!--发送验证码-->
            <div class="user-captcha-button" @click="ClickPhoneCaptcha">发送验证码</div>
          </div>
        </div>
        <!--底部登录按钮-->
        <div class="login-button-all">
          <div class="login-button" @click="routerGoTo">what can i say</div>
          <!--下方切换按钮-->
          <div class="login-button-change">
            <!--离线登录
            <div class="change-login-manner" style="width: 100px; cursor: pointer" @click="offline">
              使用离线登录
            </div>-->
            <!--在线登录方式-->
            <div
              v-if="isEmail"
              class="change-login-manner"
              style="cursor: pointer"
              @click="SwitchLoginPhone"
            >
              切换手机号登录
            </div>
            <div
              v-else
              class="change-login-manner"
              style="cursor: pointer"
              @click="SwitchLoginEmail"
            >
              切换邮箱登录
            </div>
          </div>
        </div>
        <!--其他-->
        <div class="login-underside">
          <div style="display: grid; align-items: center">
            <div class="other-top">第三方快捷登录</div>
          </div>
          <div class="login-underside-otherLogin">
            <div class="other-link">
              <svg
                t="1740649043348"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4361"
                width="200"
                height="200"
              >
                <path
                  d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"
                  p-id="4362"
                ></path>
              </svg>
            </div>
            <div class="other-link">
              <svg
                t="1740649408925"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5385"
                width="200"
                height="200"
              >
                <path
                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m210.5 612.4c-11.5 1.4-44.9-52.7-44.9-52.7 0 31.3-16.2 72.2-51.1 101.8 16.9 5.2 54.9 19.2 45.9 34.4-7.3 12.3-125.6 7.9-159.8 4-34.2 3.8-152.5 8.3-159.8-4-9.1-15.2 28.9-29.2 45.8-34.4-35-29.5-51.1-70.4-51.1-101.8 0 0-33.4 54.1-44.9 52.7-5.4-0.7-12.4-29.6 9.4-99.7 10.3-33 22-60.5 40.2-105.8-3.1-116.9 45.3-215 160.4-215 113.9 0 163.3 96.1 160.4 215 18.1 45.2 29.9 72.8 40.2 105.8 21.7 70.1 14.6 99.1 9.3 99.7z"
                  p-id="5386"
                ></path>
              </svg>
            </div>
          </div>
          <div class="login-underside-article">
            <div>注册/登录表示同意<router-link to="#">条款</router-link></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  color: currentColor;
  transition: color 0.3s ease;
}
a {
  color: currentColor;
  transition: color 0.3s ease;
}
.router-link-active:hover {
  color: lightpink;
}
a:hover {
  color: lightpink;
}
.icon {
  width: 100%;
  height: 100%;
}
.other-link:hover {
  background-color: #ababac;
}
path {
  fill: currentColor;
}
.login-button-change {
  display: grid;
  grid-template-columns: auto;
  grid-column-gap: 60px;
  justify-items: end;
  width: 100%;
}
.prompt-enter-active,
.prompt-leave-active {
  transition: opacity 0.5s ease;
}

.prompt-enter-from,
.prompt-leave-to {
  opacity: 0;
}
.captcha-text {
  position: absolute;
  top: 75px;
  left: 60px;
  font-size: 16px;
  font-weight: bolder;
}
.user-captcha-button {
  border: 0;
  outline: none;
  transition: background-color 0.3s ease;
  border-radius: 3px;
  box-sizing: border-box;
  width: 100px;
  height: 45px;
  background-color: #444444;
  display: grid;
  align-items: center;
  justify-items: center;
  color: white;
  cursor: pointer;
  font-size: 13px;
}
.user-captcha-button:hover {
  background-color: #6b6b6d;
}
.user-captcha {
  box-sizing: border-box;
  width: 275px;
  height: 45px;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 145px 100px;
  grid-column-gap: 30px;
}
.login-text {
  position: absolute;
  top: 310px;
  left: 60px;
  font-size: 18px;
  font-weight: bolder;
}
input {
  font-weight: bolder;
  height: 45px;
  width: 100%;
  border: 2px solid transparent;
  padding: 0 0 0 10px;
  outline: none;
  box-sizing: border-box;
  border-radius: 3px;
  background-color: rgba(128,128,128,0.4);
  font-size: 16px;
  transition: border 0.2s ease;
  color: currentColor;
}
input:focus {
  border: lightpink solid 2px;
}
input:hover {
  border: lightpink solid 2px;
}
input::placeholder {
  color: white;
}
img {
  width: 20px;
  height: 20px;
}
.login-img {
  width: 40px;
  height: 40px;
}
.login-underside {
  display: grid;
  justify-items: center;
  grid-template-rows: 30px 70px auto;
  box-sizing: border-box;
  margin: 30px 0 0 0;
  width: 100%;
  -webkit-app-region: no-drag;
}
.login-underside-otherLogin {
  margin: 20px 0 0 0;
  box-sizing: border-box;
  height: 50px;
  display: grid;
  grid-template-columns: 50px 50px;
  grid-column-gap: 60px;
}
.login-underside-article {
  display: grid;
  align-items: center;
  height: 30px;
  box-sizing: border-box;
  margin: 30px 0 0 0;
  white-space: nowrap;
}
.other-link {
  display: grid;
  align-items: center;
  justify-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  cursor: pointer;
}
.other-top {
  position: relative;
}
.other-top::after {
  content: '';
  position: absolute;
  top: 10px;
  left: 115px;
  width: 70px;
  height: 2px;
  background-color: gray;
}
.other-top::before {
  content: '';
  position: absolute;
  top: 10px;
  left: -72px;
  background-color: gray;
  width: 70px;
  height: 2px;
}
.change-login-manner {
  transition: background-color 0.3s ease;
  position: relative;
  border-radius: 3px;
}
.change-login-manner::before {
  content: '';
  position: absolute;
  top: 20px;
  width: 30px;
  height: 2px;
  border-radius: 15px;
  background: lightpink;
  transition: width 0.5s ease;
}
.change-login-manner:hover::before {
  width: 100%;
}
.user-input {
  width: 275px;
  height: 45px;
}
.login-exit {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 5px;
  left: 345px;
  border-radius: 3px;
  display: grid;
  justify-items: center;
  align-items: center;
  transition: background-color 0.3s ease;
  -webkit-app-region: no-drag;
}
.login-exit:hover {
  background: orangered;
}
.login-page {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-color: rgba(93, 93, 85, 0.8);
  background-image: url("src/assets/img/20240907_164339.jpg");
  background-repeat: no-repeat; /* 图片不重复 */
  background-size: cover; /* 图片覆盖整个元素 */
  background-position: center; /* 图片居中 */
  display: grid;
  align-items: center;
  justify-items: center;
  color: #fff;
}
.login-box {
  background-color: rgba(128,128,128,0.5);
  position: relative;
  box-sizing: border-box;
  border-radius: 10px;
  width: 375px;
  height: 550px;
  display: grid;
  justify-items: center;
  grid-template-rows: 70px 115px 90px auto;
  padding: 30px 50px 0 50px;
  -webkit-app-region: drag;
}
.login-top {
  display: grid;
  justify-items: center;
  font-size: 23px;
  -webkit-app-region: no-drag;
  font-weight: bold;
}
.login-input-all-phone {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 45px 45px;
  grid-row-gap: 15px;
  -webkit-app-region: no-drag;
}
.login-button {
  background-color: #444444;
  width: 100%;
  height: 45px;
  border-radius: 5px;
  display: grid;
  justify-items: center;
  align-items: center;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s ease;
  -webkit-app-region: no-drag;
}
.login-button:hover {
  background-color: #6b6b6d;
}
.login-button-all {
  width: 100%;
  display: grid;
  box-sizing: border-box;
  grid-template-rows: 45px 30px;
  grid-row-gap: 15px;
  align-items: center;
  justify-items: end;
  -webkit-app-region: no-drag;
}
.login-center {
  width: 100%;
  -webkit-app-region: no-drag;
}
</style>
