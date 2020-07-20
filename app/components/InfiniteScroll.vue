<template>
  <RadListView
    for="(item,index) in items"
    :key="index"
    loadOnDemandMode="Auto"
    @loadMoreDataRequested="loadItems"
    loadOnDemandBufferSize="2"
    pullToRefresh="true"
    @pullToRefreshInitiated="refreshList"
    :pullToRefreshStyle="pullToRefreshStyle"
  >
    <v-template>
      <slot v-bind:item="item"></slot>
    </v-template>
  </RadListView>
</template>

<script lang="ts">
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { IPaginationResponseStandard, IPaginationInfiniteScroll } from '../interfaces';
import * as colorModule from 'tns-core-modules/color';
import FeedbackNotification from '@/utils/FeedbackNotification';
import { MESSAGE_REFRESH_LIST_ERROR } from '@/common/exceptions/constants';

export default {
  props: {
    watchElement: {
      required: false,
    },
    apiCallback: {
      type: Function,
      required: true,
    },
    emptyResults: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      currentPage: 1,
      shouldStopRequest: false,
      shouldRefresh: false,
      perPage: 10,
      items: [],
      pullToRefreshStyle: {
        indicatorBackgroundColor: new colorModule.Color('#049c88'),
        indicatorColor: new colorModule.Color('white'),
      },
    };
  },
  watch: {
    watchElement: {
      immediate: true,
      async handler() {
        this.items = [];
        this.currentPage = 1;
        this.shouldRefresh = true;
        this.shouldStopRequest = false;
        this.$emit('emptyResults', false);
        await this.loadItems();
      },
    },
  },
  methods: {
    async loadItems(args) {
      const listView = args ? args.object : null;
      if (this.shouldStopRequest) {
        listView.notifyLoadOnDemandFinished();
        return;
      }

      let apiResponse: IPaginationResponseStandard | null = null;
      let pagination: IPaginationInfiniteScroll = {
        currentPage: this.currentPage,
        perPage: this.perPage,
      };
      try {
        apiResponse = await this.apiCallback(pagination);
      } catch (e) {
        console.log(e);
      }

      if (apiResponse && apiResponse.items.length) {
        this.items = this.shouldRefresh ? apiResponse.items : [...this.items, ...apiResponse.items];
        this.currentPage += 1;
        this.shouldRefresh = false;
      } else {
        if (!this.items.length) this.$emit('emptyResults', true);
        this.shouldStopRequest = true;
      }
      listView.notifyLoadOnDemandFinished();
    },
    async refreshList(args) {
      const pullRefresh = args.object;
      this.currentPage = 1;
      this.shouldRefresh = true;
      this.shouldStopRequest = false;
      this.$emit('emptyResults', false);
      await this.loadItems(args).then(
        (response) => {
          pullRefresh.notifyPullToRefreshFinished();
        },
        async (err) => {
          await FeedbackNotification.showPopupWarning(MESSAGE_REFRESH_LIST_ERROR);
        },
      );
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  background-color: #fff;
  color: #4d4d4d;
  margin: 15 15 0;
  border: 2px solid;
  border-radius: 100%;
}
.card-layout {
  padding: 20;
  border: 2px solid;
  border-radius: 100%;
}
.card-layout .h1 {
  margin-bottom: 15;
}
</style>
