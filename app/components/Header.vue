<template>
  <ActionBar>
    <RGridLayout columns="40, auto, *" rows="45, auto, *" id="header" isRtl="false">
      <Label
        v-if="backButton"
        col="0"
        text.decode="&#xf060;"
        class="nt-icon fas"
        @tap="$navigator.back({ frame: 'main' })"
      />
      <Label v-else col="0" text.decode="&#xf0c9;" class="nt-icon fas" @tap="openDrawer" />
      <Label col="1" :text="routeTitle" />
      <FlexboxLayout class="btn pp" col="2*" @tap="showModal">
        <Image v-if="!backButton && accountInfo" :src="accountInfo.image" class="icon" />
      </FlexboxLayout>
    </RGridLayout>
  </ActionBar>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import { TYPES } from '../store/types';
import Profile from '../pages/Profile.vue';

export default {
  props: {
    openDrawer: {
      type: Function,
    },
  },
  mounted() {
    this.openDrawer();
  },
  computed: {
    ...mapGetters({
      accountInfo: `${TYPES.modules.CORE}/${TYPES.getters.GET_ACCOUNT}`,
    }),
    routeMeta: function () {
      return (this.$navigator.routes('main') || this.$navigator.route).meta || { title: '', backButton: false };
    },
    backButton: function () {
      return this.routeMeta.backButton;
    },
    routeTitle: function () {
      return this.routeMeta.title;
    },
  },
  methods: {
    showModal() {
      this.$showModal(Profile);
    },
  },
};
</script>

<style scoped>
ActionBar {
  background-color: #049c88;
  color: #ffffff;
}

#header .btn.pp .icon {
  border: 2px solid #ffffff;
  border-radius: 100%;
}
</style>
