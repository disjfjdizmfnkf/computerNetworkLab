<template>
  <div class="login">
    <login-panel />
  </div>
</template>


<script setup lang="ts">
import LoginPanel from '@/views/login/cpns/login-panel.vue'
</script>


<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: url("@/assets/img/login-bg.svg") no-repeat;
  background-size: cover;
}

</style>