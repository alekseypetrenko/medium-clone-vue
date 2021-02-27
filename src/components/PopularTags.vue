<template>
  <div>
    <mcv-loading v-if="isLoading" />
    <mcv-error-message :error="error" v-if="error" />
    <div v-if="popularTags" class="sidebar">
      <p>Popular tags</p>
      <div class="tag-list">
        <router-link
          v-for="(popularTag, i) in popularTags"
          :key="i"
          :to="{name: 'tag', params: {slug: popularTag}}"
          class="tag-default tag-pill"
        >
          {{ popularTag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {actionTypes} from '@/store/modules/popularTags';
import {mapState} from 'vuex';
import McvLoading from '@/components/Loading';
import McvErrorMessage from '@/components/ErrorMessage';

export default {
  name: 'McvPopularTags',
  components: {
    McvLoading,
    McvErrorMessage
  },
  computed: {
    ...mapState({
      isLoading: state => state.popularTags.isLoading,
      popularTags: state => state.popularTags.data,
      error: state => state.popularTags.error
    })
  },
  mounted() {
    this.$store.dispatch(actionTypes.getPopularTags);
  }
};
</script>

<style></style>
