<template>
  <div class="panel-register">
    <el-form
      label-width="80px"
      size="large" :model="register"
      :rules="registerRules"
      status-icon
      ref="formRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="register.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="register.password" show-password />
      </el-form-item>
      <el-form-item label="确认密码" prop="password">
        <el-input v-model="register.confirmPassword" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>


<script setup lang="ts">
import { type ElForm, ElMessage, type FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import type { IRegister } from '@/types'
import useLoginStore from '@/stores/login/login'
import { localCache, sessionCache } from '@/utils/cache'


const SESSION_NAME = 'session_name'
const SESSION_PASSWORD = 'session_password'
const SESSION_CONFIRM = 'session_confirm'


const register = reactive<IRegister>({
  name: sessionCache.getCache(SESSION_NAME) ?? '',
  password: sessionCache.getCache(SESSION_PASSWORD) ?? '',
  confirmPassword: sessionCache.getCache(SESSION_CONFIRM) ?? ''
})


const loginStore = useLoginStore()

// 账号注册规则
const registerRules: FormRules = {
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
  ],
  confirmPassword: [
    { required: true, message: '必须确认密码~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}

const formRef = ref<InstanceType<typeof ElForm>>()


function registerAction(){
  formRef.value?.validate(async (valid) => {
    if (valid) {
      // 检查密码和确认密码是否相同
      if (register.password !== register.confirmPassword) {
        ElMessage.error('两次输入的密码不一致!');
        return;
      }

      const [message, isSuccess] = await loginStore.RegisterAction(register)
      sessionCache.setCache(SESSION_NAME, register.name)
      sessionCache.setCache(SESSION_PASSWORD, register.password)
      sessionCache.setCache(SESSION_CONFIRM, register.confirmPassword)

      if (isSuccess) {
        // 注册格式正确
        ElMessage.success(message)
      } else {
        ElMessage.error(message)
      }
    } else {
      ElMessage.error('😀请再次检查格式！')
    }
  })
}


defineExpose({
  registerAction,
})
</script>


<style lang="less" scoped>

</style>