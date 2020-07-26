<template>
  <GridLayout rows="auto, *" class="nt-drawer__content">
    <StackLayout row="0" class="nt-drawer__header" backgroundColor="#049c88" v-if="accountInfo">
      <Label
        class="nt-drawer__header-brand"
        :text="`${accountInfo.username__c}`"
      ></Label>
      <Label class="nt-drawer__header-footnote" v-if="accountInfo.email" :text="accountInfo.email"></Label>
    </StackLayout>

    <ScrollView row="1" class="nt-drawer__body">
      <StackLayout>
        <GridLayout
          columns="auto, *"
          :class="'nt-drawer__list-item' + (currentPage === 'home' ? ' -selected' : '')"
          @tap="onNavigationItemTap('home')"
        >
          <Label col="0" text.decode="&#xf015;" class="nt-icon fas"></Label>
          <Label col="1" text="Home" class="p-r-10"></Label>
        </GridLayout>

        <GridLayout
          columns="auto, *"
          :class="'nt-drawer__list-item' + (currentPage === 'feature' ? ' -selected' : '')"
          @tap="onNavigationItemTap('feature')"
        >
          <Label col="0" text.decode="&#xf005;" class="nt-icon fas"></Label>
          <Label col="1" text="Feature" class="p-r-10"></Label>
        </GridLayout>

        <StackLayout class="hr"></StackLayout>

        <GridLayout
          columns="auto, *"
          :class="'nt-drawer__list-item' + (currentPage === 'settings' ? ' -selected' : '')"
          @tap="onNavigationItemTap('settings')"
        >
          <Label col="0" text.decode="&#xf013;" class="nt-icon fas"></Label>
          <Label col="1" text="Settings" class="p-r-10"></Label>
        </GridLayout>

        <GridLayout columns="auto, *" class="nt-drawer__list-item" @tap="logout()">
          <Label col="0" text.decode="&#xf2f5;" class="nt-icon fas"></Label>
          <Label col="1" text="Logout" class="p-r-10"></Label>
        </GridLayout>
      </StackLayout>
    </ScrollView>
  </GridLayout>
</template>

<script>
import Home from '../pages/Home';
import Featured from '../pages/Featured';
import Settings from '../pages/Settings';
import { mapGetters } from 'vuex';
import { TYPES } from '../store/types';
import FirebaseAnalytics from '@/utils/FirebaseAnalytics';

export default {
  computed: {
    ...mapGetters({
      accountInfo: `${TYPES.modules.CORE}/${TYPES.getters.GET_ACCOUNT}`,
    }),
    currentPage: function () {
      return this.$navigator.paths.main;
    },
  },
  data() {
    return {
      Home: Home,
      Featured: Featured,
      Settings: Settings,
    };
  },
  components: {
    Home,
    Featured,
    Settings,
  },
  methods: {
    async onNavigationItemTap(route) {
      await FirebaseAnalytics.sendLogEvent(route);
      await this.$navigator.navigate(route, {
        frame: 'main',
        animated: true,
        transition: {
          name: 'flipRight',
          duration: 800,
          curve: 'easeInOut',
        },
      });
      this.$emit('close-drawer');
    },
    async logout() {
      await this.$auth.logout();
      this.$emit('close-drawer');
      this.$navigator.navigate('login', {
        frame: 'main',
        clearHistory: true,
        animated: true,
        transition: {
          name: 'slideLeft',
          duration: 800,
          curve: 'easeOut',
        },
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
