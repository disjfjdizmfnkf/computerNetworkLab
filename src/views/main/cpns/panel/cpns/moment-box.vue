<script setup>
import { ref } from 'vue'
import hyRequest from '@/service/index.ts'
import { like, postComment, unLike } from '@/service/modules/moment.ts'

const baseURL = hyRequest.baseURL
const props = defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  }
})

const commentContent = ref('')
const isLikeClicked = ref(false)

const likesCount = ref(props.itemData.user.likesCount || 0)
const commentCount = ref(props.itemData.commentCount || 0)
const commentList = ref(props.itemData.comments || [])

const findWitchToReply = (commentId) => {
  for (const item of commentList.value) {
    if (item.id === commentId) {
      return item.user.name
    }
  }
  return '' // 如果找不到对应的回复者，返回空字符串
}

const likeToggle = async (momentId) => {
  if (isLikeClicked.value) {
    const response = await unLike(momentId)
    likesCount.value = response.data.data.likes
    console.log(response)
  } else {
    const response = await like(momentId)
    likesCount.value = response.data.data.likes
  }
  isLikeClicked.value = !isLikeClicked.value
}

const postCommentHandler = async (momentId, content) => {
  const response = await postComment(momentId, content)
  const newComment = response.data

  // 更新本地数据
  commentCount.value++
  commentList.value.push(newComment)

  commentContent.value = ''
}
</script>

<template>
  <div class="moment-box">
    <div class="header">
      <div class="avatar-wrap">
        <img
          class="avatar"
          :src="itemData.user.avatar_url || `${baseURL}users/avatar/10`"
          alt="用户头像"
        />
      </div>
      <div class="user-info">
        <span class="username">{{ itemData.user.name }}</span>
        <span class="post-time">{{ itemData.updateTime }}</span>
      </div>
    </div>

    <div class="content">
      <div class="text-content">
        <span>{{ itemData.content }}</span>
      </div>
      <div class="image-content">
        <!--        <template v-for="(item, index) of photoList">-->
        <img class="post-image" :src="`${baseURL}moment/photos/${itemData.id}`" alt="" />
        <!--        </template>-->
      </div>
    </div>

    <div class="action-bar">
      <div class="tags">
        <span
          v-show="itemData.labels && itemData.labels.length"
          v-for="(item, index) in itemData.labels"
          :key="item.id"
          class="tag"
          >{{ item.name }}</span
        >
      </div>
      <div class="stats">
        <div class="icons">
          <van-icon name="chat-o" size="25" />
          <span class="comments-count">{{ commentCount }}</span>
          <van-icon
            name="good-job-o"
            size="25"
            @click="likeToggle(itemData.id)"
            :class="isLikeClicked ? 'liked' : 'not-liked'"
          />
          <span class="likes-count">{{ likesCount }}</span>
        </div>
      </div>
    </div>

    <div class="momentComments">
      <div class="default" v-if="commentList.length < 1">
        <span>还没有人评论哦，快发表第一条评论吧！</span>
      </div>
      <div class="momentComment" v-for="(item, index) in commentList" :key="item.id">
        <div v-if="item.comment">
          <span>{{ item.user.name }} 回复 {{ findWitchToReply(item.comment) }}: </span>
          <span>{{ item.content }}</span>
        </div>
        <div v-else>
          <span>{{ item.user.name }}: </span>
          <span>{{ item.content }}</span>
        </div>
      </div>
    </div>

    <div class="myComment">
      <div>
        <img class="userAvatar" :src="`${baseURL}users/avatar/10`" alt="" />
      </div>
      <input
        v-model="commentContent"
        class="commentInput"
        placeholder="写下你的评论..."
        @keyup.enter="postCommentHandler(itemData.id, commentContent)"
      />
      <button class="sendComment" @click="postCommentHandler(itemData.id, commentContent)">
        <van-icon name="guide-o" />
      </button>
    </div>
  </div>
</template>

<style lang="less" scoped>
@primary-color: #0056b3;
@border-color: #d0d7de;

.moment-box {
  border: 1px solid @border-color;
  border-radius: 5px;
  margin: 15px;
  padding: 10px;

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .avatar-wrap {
      width: 44px;
      height: 44px;
      margin-right: 10px;

      .avatar {
        border-radius: 50%;
        width: 2.7rem;
        height: 2.7rem;
      }
    }

    .user-info {
      .username {
        display: flex;
        flex-direction: column;
        font-weight: bold;
        margin-bottom: 5px;
        cursor: pointer;

        &:hover {
          color: @primary-color;
        }
      }

      .post-time {
        font-size: 12px;
        color: gray;
      }
    }
  }

  .content {
    margin-bottom: 20px;

    .text-content {
      text-align: left;
      white-space: normal;
      margin-top: 20px;
    }

    .image-content {
      margin-top: 5px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      .post-image {
        //height: 12rem;
        max-width: 40%;
        margin: 5px;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
      }
    }
  }

  .action-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .stats {
      .icons {
        display: flex;
        align-items: center;

        .van-icon {
          margin-right: 5px;
          cursor: pointer;

          &:hover {
            color: @primary-color;
          }
        }

        .comments-count,
        .likes-count {
          margin-right: 10px;
          color: gray;
        }

        @keyframes scaleAndBack {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
          }
        }

        .liked {
          color: @primary-color;
          animation: scaleAndBack 0.6s ease-in-out forwards;
        }

        .not-liked {
          transform: scale(1);
          transition: transform 0.3s ease-in-out;
        }
      }
    }

    .tags {
      display: flex;
      flex-wrap: wrap;

      .tag {
        display: inline-block;
        padding: 2px 5px;
        background-color: #d8d8d8;
        border-radius: 3px;
        margin-right: 5px;
        font-size: 14px;
      }
    }
  }

  .momentComments {
    text-align: left;
    background-color: #f2f2f2;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;

    .default {
      color: gray;
    }

    .momentComment {
      margin-bottom: 5px;
    }
  }
}

.myComment {
  display: flex;
  align-items: center;
  border: 1px solid @border-color;
  border-radius: 20px;
  padding: 5px 10px;

  .userAvatar {
    margin-right: 10px;
    border-radius: 50%;
    width: 1.7rem;
    height: 1.7rem;
  }

  .commentInput {
    margin: 0;
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    padding: 5px;
    font-size: 14px;

    &::placeholder {
      color: #999;
    }
  }

  .sendComment {
    background-color: @primary-color;
    color: #fff;
    border: none;
    border-radius: 20px;
    padding: 5px 10px;
    margin-left: 10px;
    cursor: pointer;

    &:hover {
      background-color: darken(@primary-color, 10%);
    }
  }
}
</style>
