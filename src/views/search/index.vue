<template>
  <div class="search-container">
    <form action="/">
      <van-search v-model="searchText"
                  show-action
                  placeholder="请输入搜索关键词"
                  @search="onSearch"
                  @cancel="onCancel"
                  @focus="isResultShow = false"></van-search>
    </form>
    <search-result v-if="isResultShow"
                   :q="searchText">
    </search-result>
    <search-suggestion v-else-if="searchText"
                       :q="searchText"
                       @search="onSearch">
    </search-suggestion>
    <search-history v-else
                    :search-histories="searchHistories"
                    @clear-search-histories="searchHistories = []"
                    @search="onSearch"></search-history>
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'SearchPage1111',
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [] // 搜索的历史记录数据
    }
  },
  watch: {
    searchHistories (value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  methods: {
    onSearch (val) {
      this.searchText = val
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      this.isResultShow = true
    },

    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style>
</style>
