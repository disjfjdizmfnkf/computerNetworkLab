<template>
  <div class="post-moment">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>发表动态</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <div class="content">
      <el-input
        v-model="momentContent"
        type="textarea"
        rows="4"
        placeholder="分享你的想法..."
        label="内容"
      />
      <el-input v-model="labels" placeholder="(可选)输入标签,用空格隔开" label="标签" />
      <el-upload
        v-model:files="file"
        :limit="1"
        :before-upload="beforeRead"
        :on-progress="uploadProgress"
        :show-file-list="false"
        action="/upload"
      >
        <template v-slot:trigger>
          <el-button icon="el-icon-upload"></el-button>
        </template>
      </el-upload>
      <div v-if="imagePreviewUrl" class="image-preview">
        <img :src="imagePreviewUrl" alt="上传的图片预览" />
      </div>
    </div>

    <div class="action-bar">
      <el-button type="primary" @click="postMomentHandler"> 发表 </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { choseLabel, postMoment, queryMomentById, postMomentPhoto } from '@/service/index.js'
import { ElNotification } from 'element-plus'
import { storeToRefs } from 'pinia'
import useMomentStore from '@/stores/moment/moment'

const momentStore = useMomentStore
const { momentList } = storeToRefs(momentStore)
const toggleShowPostBox = momentStore.toggleShowPostBox

const momentContent = ref('')
const labels = ref('')
const file = ref([])
const imagePreviewUrl = ref('')
const uploadProgress = ref(0)

const beforeRead = (file) => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      ElNotification({
        message: '请上传图片文件',
        type: 'warning',
        duration: 1000,
        offset: 100
      })
      reject()
    } else if (file.size > 5000000) {
      ElNotification({
        message: '文件大小不能超过5MB',
        type: 'warning',
        duration: 1000,
        offset: 100
      })
      reject()
    } else {
      if (!(file instanceof Blob)) {
        file = new Blob([file], { type: file.type })
      }
      resolve(file)
    }
  })
}

const postMomentHandler = async () => {
  if (momentContent.value.trim() === '') {
    ElNotification({
      message: '动态内容不能为空',
      type: 'warning',
      duration: 1000,
      offset: 100
    })
    return
  }

  const response = await postMoment(momentContent.value)
  if (!response.code) {
    ElNotification({
      message: '动态发表成功！',
      type: 'success',
      duration: 1000,
      offset: 100
    })

    const labelList = labels.value.split(' ').map((label) => label.trim())
    await choseLabel(labelList, response.data.insertId)

    // 上传图片并关联动态
    if (file.value.length > 0) {
      const formData = new FormData()
      formData.append('photo', file.value[0].raw) // 修改这里
      console.log(file.value[0].raw) // 修改这里
      const uploadResponse = await postMomentPhoto(formData, response.data.insertId)
      if (uploadResponse.code) {
        ElNotification({
          message: '图片上传失败',
          type: 'error',
          duration: 1000,
          offset: 100
        })
      }
    }

    // 发送完后清除
    momentContent.value = ''
    labels.value = ''
    file.value = []
    imagePreviewUrl.value = '' // 清除图片预览
    const InsertId = response.data.insertId
    const resp = await queryMomentById(InsertId)
    momentList.value.unshift(resp.data)
  } else {
    ElNotification({
      message: '动态发表失败！',
      type: 'error',
      duration: 1000,
      offset: 100
    })
  }
  toggleShowPostBox()
}
</script>

<style scoped>
.post-moment {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  background-color: white;
  z-index: 9999999;
}

.content {
  margin-bottom: 20px;
}

.action-bar {
  text-align: right;
}

.image-preview {
  margin-top: 20px;
  text-align: center;
}

.image-preview img {
  max-width: 100%;
  max-height: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 10px;
}
</style>
