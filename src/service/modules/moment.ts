import hyRequest from '@/service'
import { storeToRefs } from 'pinia'
import axios from 'axios'
import useLoginStore from '@/stores/login/login'

const loginStore = useLoginStore()
const { token } = storeToRefs(loginStore)

export function getMomentList(offset, num) {
  return hyRequest.get({
    url: '/moment',
    data: { offset: offset, size: num }
  })
}

// 评论
export function postComment(momentId, content) {
  return hyRequest.post({
    url: '/comment',
    method: 'post',
    headers: {
      Authorization: `Bearer ${token.value}`
    },
    data: {
      momentId: momentId,
      content: content
    }
  })
}

// 通过momentId找到moment
export function queryMomentById(momentId) {
  return hyRequest.get({
    url: `/moment/${momentId}`
  })
}

// 回复
export function postCommentReply(content, momentId, commentId) {
  return hyRequest.post({
    url: '/comment/reply',
    method: 'post',
    headers: {
      Authorization: `Bearer ${token.value}`
    },
    data: {
      momentId: momentId,
      content: content,
      commentId: commentId
    }
  })
}

// 发表评论
export function postMoment(content) {
  return hyRequest.post({
    url: '/moment',
    method: 'post',
    headers: {
      Authorization: `Bearer ${token.value}`
    },
    data: {
      content: content
    }
  })
}

// 选择标签 传入标签列表
export function choseLabel(labelList, momentId) {
  return hyRequest.post({
    url: `/moment/label/${momentId}`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token.value}`
    },
    data: {
      labels: labelList
    }
  })
}

// 上传动态图片
export function postMomentPhoto(formData, momentId) {
  return hyRequest.post({
    url: `/file/momentPhoto/${momentId}`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token.value}`,
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}

// 未封装的请求，直接用axios库了
const instance = axios.create({
  baseURL: 'http://localhost:3000', // 你的基础URL
  timeout: 1000
})

export function like(momentId) {
  return instance({
    url: `/moment/like/${momentId}`,
    method: 'patch',
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })
}

export function unLike(momentId) {
  return instance({
    url: `/moment/unLike/${momentId}`,
    method: 'patch',
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })
}

export function modifyMoment(content, momentId) {
  return instance({
    url: `/moment/${momentId}`,
    method: 'patch',
    headers: {
      Authorization: `Bearer ${token.value}`
    },
    data: {
      content: content
    }
  })
}

// 删除动态
export function delMoment(content, momentId) {
  return instance({
    url: `/moment/${momentId}`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })
}
