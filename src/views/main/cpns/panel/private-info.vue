<template>
  <div class="user-info">
    <div class="avatar-container">
      <el-avatar :size="100" :src="avatarUrl" @click="triggerAvatarUpload"></el-avatar>
      <span class="label">头像</span>
      <input type="file" ref="avatarInput" style="display: none" @change="handleAvatarChange" accept="image/*">
    </div>
    <div class="info">
      <div class="input-container">
        <span class="label">用户名</span>
        <el-input v-model="name" placeholder="用户名" :disabled="!isEditing"></el-input>
      </div>
      <div class="input-container">
        <span class="label">个性签名</span>
        <el-input v-model="sign" type="textarea" :rows="2" placeholder="个性签名" :disabled="!isEditing"></el-input>
      </div>
      <el-button type="primary" @click="toggleEdit">{{ isEditing ? '保存' : '修改资料' }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { sessionCache } from '@/utils/cache'
import { USER_AVATAR, USER_ID, USER_NAME, USER_SIGN } from '@/global/constants'
import { changeUserAvatar, changeUserInfo } from '@/service/modules/user'

const avatarUrl = ref(sessionCache.getCache(USER_AVATAR) ?? '')
const name = ref(sessionCache.getCache(USER_NAME) ?? '')
const sign = ref(sessionCache.getCache(USER_SIGN) ?? '这个人很懒，什么也没有留下')
const isEditing = ref(false)
const avatarInput = ref(null)

const toggleEdit = async () => {
  if (isEditing.value) {
    try {
      const res = await changeUserInfo(name.value, sign.value, sessionCache.getCache(USER_ID))
      if (!res.code) {
        ElMessage.success(res.message)
        sessionCache.setCache(USER_NAME, name.value)
        sessionCache.setCache(USER_SIGN, sign.value)
      } else {
        ElMessage.error(res.message)
      }
    } catch (error) {
      ElMessage.error('保存失败，请稍后重试')
    }
  }
  isEditing.value = !isEditing.value
}

const triggerAvatarUpload = () => {
  if (isEditing.value) {
    avatarInput.value.click()
  }
}

const handleAvatarChange = async (event) => {
  const file = event.target.files[0]
  if (file) {
    const formData = new FormData()
    formData.append('avatar', file)

    try {
      const res = await changeUserAvatar(formData)
      if (!res.code) {
        ElMessage.success('头像上传成功')
        avatarUrl.value = URL.createObjectURL(file)
        sessionCache.setCache(USER_AVATAR, avatarUrl.value)
      } else {
        ElMessage.error(res.message)
      }
    } catch (error) {
      ElMessage.error('头像上传失败，请稍后重试')
    }
  }
}
</script>

<style scoped>
.user-info {
  display: flex;
  height: 550px;
  margin-bottom: 20px;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: #f5f5f5;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
}

.info {
  width: 100%;
  max-width: 300px;
}

.input-container {
  margin-bottom: 15px;
}

.label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.el-input {
  width: 100%;
}

.el-button {
  width: 100%;
  margin-top: 15px;
}
</style>