<template>
  <div class="notFound">
    <div class="notion">
      <h2>notFound</h2>
      <h3>这里什么也没有哦</h3>
    </div>
  </div>
</template>


<script setup lang="ts">

</script>


<style scoped lang="less">
.notFound {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  .notion {
    text-align: center;
  }
}

h2, h3 {
  font-weight: bolder;
  font-size: 29px;
}
</style>