<template>
  <van-button v-if="isFollowed"
              class="follow-btn"
              round
              size="small"
              :loading="loading"
              @click="onFollow">已关注</van-button>
  <van-button v-else
              class="follow-btn"
              type="info"
              color="#3296fa"
              round
              size="small"
              icon="plus"
              :loading="loading"
              @click="onFollow">关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  //   model: {
  //     prop: 'isFollowed', // 默认是 value
  //     event: 'update-is_followed' // 默认是 input
  //   },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onFollow () {
      this.loading = true
      try {
        if (this.isFollowed) {
          await deleteFollow(this.userId)
        } else {
          await addFollow(this.userId)
        }
        this.$emit('update-is_followed', !this.isFollowed)
        console.log(this.isFollowed)
      } catch (err) {
        let message = '操作失败，请重试！'
        if (err.response && err.response.status === 400) {
          message = '不能关注自己！'
        }
        this.$toast(message)
      }
      this.loading = false
    }
  }

}
</script>

<style>
</style>
