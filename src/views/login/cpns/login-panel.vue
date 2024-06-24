<template>
  <div class="login-panel">
    <!--标题-->
    <h1 class="title">zhy_chat登录界面</h1>

    <!--中间的tab-->
    <div class="tabs">
      <el-tabs type="border-card" v-model="activeName" stretch>
        <!--   账号登录     -->
        <el-tab-pane name="account">
          <template #label>
            <div class="lable">
              <el-icon>
                <UserFilled />
              </el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <panel-account ref="accountRef" />
        </el-tab-pane>

        <!-- 手机登录 -->
<!--        <el-tab-pane name="phone">-->
<!--          <template #label>-->
<!--            <div class="lable">-->
<!--              <el-icon>-->
<!--                <Cellphone />-->
<!--              </el-icon>-->
<!--              <span class="text">手机登录</span>-->
<!--            </div>-->
<!--          </template>-->
<!--          <panel-phone />-->
<!--        </el-tab-pane>-->
      </el-tabs>
    </div>
    <!--  底部  -->
    <div class="controls">
      <el-checkbox v-model="isRemPsw" label="记住密码" size="large" />
      <el-link type="primary"> 忘记密码</el-link>
    </div>
    <el-button
      class="login-button"
      type="primary"
      size="large"
      @click="handleClick"
    >
      立即登录
    </el-button>
  </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue'
import PanelPhone from '@/views/login/cpns/panel-phone.vue'
import PanelAccount from '@/views/login/cpns/panel-account.vue'
import { localCache } from '@/utils/cache'


// 拿到子组件的实例引用    typeof拿到构造器 InstanceType拿到构造器返回值的类型
const accountRef = ref<InstanceType<typeof PanelAccount>>()
const activeName = ref('account')
const isRemPsw = ref<boolean>(localCache.getCache('isRemPsw') ?? false)
watch(isRemPsw, (newValue) => {
  localCache.setCache('isRemPsw', newValue)
})

const handleClick = () => {
  if (activeName.value === 'account') {
    //1.获取子组件实例
    //2.调用子组件中的方法  通过参数传递是否记住密码的，在子组件中实现逻辑
    accountRef.value?.loginAction(isRemPsw.value)
  } else {
    console.log('使用手机登录')
  }
}

</script>


<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .tabs {

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;

    align-items: center;
    justify-content: space-between;
  }

  .login-button {
    margin-top: 10px;
    width: 100%;
  }
}

</style>