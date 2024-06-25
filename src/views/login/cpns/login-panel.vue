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

        <!-- 账号注册 -->
        <el-tab-pane name="phone">
          <template #label>
            <div class="lable">
              <el-icon>
                <Guide />
              </el-icon>
              <span class="text">账号注册</span>
            </div>
          </template>
          <!--创建一个指向panel-register组件实例的引用，并且将引用命名为registerRef-->
          <panel-register ref="registerRef" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--  底部  -->
    <div class="controls" v-if="activeName === 'account'">
      <el-checkbox v-model="isRemPsw" label="记住密码" size="large" />
      <el-link type="primary"> 忘记密码</el-link>
    </div>
    <el-button
      class="login-button"
      type="primary"
      size="large"
      @click="handleClick"
    >
      {{ buttonText }}
    </el-button>
  </div>
</template>


<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import PanelAccount from '@/views/login/cpns/panel-account.vue'
import { localCache } from '@/utils/cache'
import PanelRegister from '@/views/login/cpns/panel-register.vue'


const buttonText = computed(() => {
  return activeName.value === 'account' ? '立即登录' : '立即注册';
});
// 需要记得在这里使用组件是使用组件的一个实例，这个实例就是由构造器创建出来的
// 这里拿到子组件的实例引用    typeof拿到构造器 InstanceType拿到构造器返回值的类型
const accountRef = ref<InstanceType<typeof PanelAccount>>()
const registerRef = ref<InstanceType<typeof PanelRegister>>()

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
    // 调用注册组件的方法
    registerRef.value?.registerAction()
  }
}

</script>


<style scoped lang="less">
.login-panel {
  width: 390px;
  margin-bottom: 150px;
  border: rgba(0, 0, 0, 0.37) solid;
  background-color: rgba(240,240,240,.9);
  padding: 10px;
  border-radius: 5px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .tabs {

    .lable {
      display: flex;
      align-items: center;

      .text {
        margin-left: 5px;
      }
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