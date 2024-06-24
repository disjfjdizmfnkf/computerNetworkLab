<template>
  <div class="panel-account">
    <el-form
      label-width="55px"
      size="large" :model="account"
      :rules="accountRules"
      status-icon
      ref="formRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>
S

<script setup lang="ts">

import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
import useLoginStore from '@/stores/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'



const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

// 定义account数据
const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? '',
})


// el组件定义校验规则
// 2.定义校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}


//3.执行登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()  // 获取login store的实例
// 获取组件中的验证格式是否正确的方法
function loginAction(isRemPsw: boolean){
  formRef.value?.validate((valid) => {
    if(valid) {
      // 1.获取用户输入的帐号和密码
      const name = account.name
      const password = account.password

      // 2.在每次登录时执行用户的是否要记住密码的需求
      loginStore.LoginAccountAction({ name, password }).then((res) => {
        if(isRemPsw){
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('Oops!格式非法')
    }
  })
}


defineExpose({
  loginAction
})

</script>


<style scoped>

</style>