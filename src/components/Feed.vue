<template>
  <div>
    <mcv-loading v-if="isLoading" />
    <mcv-error-message :error="error" v-if="error" />

    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username}
              }"
              class="author"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date"> {{ article.createdAt }} </span>
          </div>
          <div class="pull-xs-right">like</div>
        </div>
        <router-link
          class="preview-link"
          :to="{name: 'article', params: {slug: article.slug}}"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
        </router-link>

        <mcv-tag-list :tags="article.tagList" />
      </div>
      <mcv-pagination
        :total="feed.articlesCount"
        :limit="limit"
        :currentPage="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>
import {actionTypes} from '@/store/modules/feed';
import {mapState} from 'vuex';
import McvPagination from '@/components/Pagination';
import McvLoading from '@/components/Loading';
import McvErrorMessage from '@/components/ErrorMessage';
import McvTagList from '@/components/TagList';

import {limit} from '@/helpers/variables.js';
import {stringify, parseUrl} from 'query-string';

export default {
  name: 'McvFeed',
  props: {
    apiUrl: {
      type: String,
      requiered: true
    }
  },
  components: {
    McvPagination,
    McvLoading,
    McvErrorMessage,
    McvTagList
  },
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error
    }),
    limit() {
      return limit;
    },
    currentPage() {
      return Number(this.$route.query.page || '1');
    },
    baseUrl() {
      return this.$route.path;
    },
    offset() {
      return this.currentPage * this.limit - this.limit;
    }
  },
  watch: {
    currentPage() {
      this.fetchFeed();
    }
  },
  mounted() {
    this.fetchFeed();
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query
      });

      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;

      this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams});
    }
  }
};
</script>

<style></style>
