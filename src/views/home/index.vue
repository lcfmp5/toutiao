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
           class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>

    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
export default {
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  components: {
    ArticleList
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取用户频道失败')
      }
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
</style>
