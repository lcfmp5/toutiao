<template>
  <div>
    <van-nav-bar class="page-nav-bar">
      <van-button class="search-btn"
                  type="info"
                  round
                  size="small"
                  slot="title"
                  to='/search'
                  icon='search'>搜索

      </van-button>
    </van-nav-bar>
    <van-tabs v-model="active"
              swipeable>
      <van-tab :title="channel.name"
               v-for="channel in channels"
               :key="channel.id">
        <article-list :channel="channel">

        </article-list>
      </van-tab>

      <div slot="nav-right"
           class="placeholder"></div>
      <div slot="nav-right"
           class="hamburger-btn"
           @click="isChannelEditShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>

    </van-tabs>
    <van-popup class="edit-channel-popup"
               v-model="isChannelEditShow"
               position="bottom"
               closeable
               style="{ height: '100%' }"
               close-icon-position="top-left">
      <channel-edit :my-channels="channels"
                    :active.sync='active'
                    @close-popup="isChannelEditShow=false"></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        // const { data } = await getUserChannels()
        // this.channels = data.data.channels
        let channels = []

        if (this.user) {
          // 已登录，请求获取用户频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          // 未登录，判断是否有本地的频道列表数据
          const localChannels = getItem('TOUTIAO_CHANNELS')
          //    有，拿来使用
          if (localChannels) {
            channels = localChannels
          } else {
            //    没有，请求获取默认频道列表
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }

        this.channels = channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    },

    onUpdateActive (index, isChennelEditShow = true) {
      // 更新激活的频道项
      this.active = index

      // 关闭编辑频道弹层
      this.isChennelEditShow = isChennelEditShow
    }
  }
}

</script>
<style scoped lang="less">
.search-btn {
  width: 450px;
  height: 64px;
  background-color: #5babfb;
  border: none;
  font-size: 28px;
  .van-icon {
    font-size: 32px;
  }
}
.van-icon-search {
  color: #fff;
}
.placeholder {
  flex-shrink: 0;
  width: 66px;
  height: 82px;
}
.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  background-color: rgba(255, 255, 255, 0.902);
  i.toutiao {
    font-size: 33px;
  }
}
.edit-channel-popup {
  padding-top: 100px;
  box-sizing: border-box;
}
</style>
