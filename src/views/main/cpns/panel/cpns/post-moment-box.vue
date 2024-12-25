<template>
  <div class="post-moment">
    <van-nav-bar title="发表动态" />

    <div class="content">
      <van-field
        v-model="momentContent"
        rows="4"
        autosize
        label="内容"
        type="textarea"
        placeholder="分享你的想法..."
      />
      <van-field v-model="labels" label="标签" placeholder="(可选)输入标签,用空格隔开" />
      <van-uploader
        v-model="file"
        :max-count="1"
        :before-read="beforeRead"
        :upload-progress="uploadProgress"
      />
      <div v-if="imagePreviewUrl" class="image-preview">
        <img :src="imagePreviewUrl" alt="上传的图片预览" />
      </div>
    </div>

    <div class="action-bar">
      <van-button type="primary" @click="postMomentHandler">
        <van-icon name="plus" />
        发表
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { choseLabel, postMoment, queryMomentById, postMomentPhoto } from '@/service/modules/moment'
import { showNotify } from 'vant'
import useMomentStore from '@/stores/moment/moment'
import { storeToRefs } from 'pinia'

const momentStore = useMomentStore()
const { momentList } = storeToRefs(momentStore)
const toggleShowPostBox = momentStore.isShowPostBox

const momentContent = ref('')
const labels = ref('')
const file = ref([])
const imagePreviewUrl = ref('')
const uploadProgress = ref(0)

const beforeRead = (file) => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      showNotify({ message: '请上传图片文件', duration: 1000, background: '#f5c502' })
      reject()
    } else if (file.size > 5000000) {
      showNotify({ message: '文件大小不能超过5MB', duration: 1000, background: '#f5c502' })
      reject()
    } else {
      // 如果文件对象不是 Blob 对象,则将其转换为 Blob 对象
      if (!(file instanceof Blob)) {
        file = new Blob([file], { type: file.type })
      }
      resolve(file)
    }
  })
}

const postMomentHandler = async () => {
  if (momentContent.value.trim() === '') {
    showNotify({ message: '动态内容不能为空', duration: 1000, background: '#f5c502' })
    return
  }

  const response = await postMoment(momentContent.value)
  if (!response.code) {
    showNotify({ message: '动态发表成功！', duration: 1000, background: '#07c160' })

    const labelList = labels.value.split(' ').map((label) => label.trim())
    await choseLabel(labelList, response.data.insertId)

    // 上传图片并关联动态
    if (file.value.length > 0) {
      const formData = new FormData()
      formData.append('photo', file.value[0].file) // 修改这里
      console.log(file.value[0].file) // 修改这里
      const uploadResponse = await postMomentPhoto(formData, response.data.insertId)
      if (uploadResponse.code) {
        showNotify({ message: '图片上传失败', duration: 1000, background: '#bc0919' })
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
    showNotify({ message: '动态发表失败！', duration: 1000, background: '#bc0919' })
  }
  toggleShowPostBox()
}
</script>
