<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <ActivityIndicator v-if="loading" :busy="loading" />
      <WebView v-if="source" :src="source" @loadStarted="onWebViewLoading" @loadFinished="onWebViewLoaded" />
    </StackLayout>
  </Page>
</template>

<script lang="ts">
export default {
  props: {
    source: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    onWebViewLoading() {
      this.loading = true;
      return;
    },
    onWebViewLoaded() {
      this.loading = false;
      return;
    },
  },
};
</script>
