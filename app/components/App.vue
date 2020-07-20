<template>
  <Page :actionBarHidden="!isLoggedIn">
    <Header :openDrawer="openDrawer" />
    <RadSideDrawer
      ref="drawer"
      gesturesEnabled="true"
      :drawerTransition="transition"
    >
      <StackLayout ~drawerContent>
        <DrawerContent @close-drawer="closeDrawer"></DrawerContent>
      </StackLayout>
      <Navigator ~mainContent id="main" :defaultRoute="isLoggedIn ? 'home' : 'login'" />
    </RadSideDrawer>
  </Page>
</template>

<script lang="ts">
import { SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
import DrawerContent from './DrawerContent.vue';
import Header from './Header.vue';

export default {
  data() {
    return {
      transition: new SlideInOnTopTransition(),
    };
  },
  mounted() {
    this.transition = new SlideInOnTopTransition();
  },
  components: {
    DrawerContent,
    Header,
  },
  computed: {
    isLoggedIn: function () {
      return this.$auth.isLoggedIn() ? true : false;
    },
  },
  methods: {
    openDrawer() {
      this.$refs.drawer.nativeView.showDrawer();
    },
    closeDrawer() {
      this.$refs.drawer.nativeView.closeDrawer();
    },
  },
};
</script>

<style scoped>
.title {
  text-align: left;
  padding-left: 16;
}

.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}

.drawer-header {
  padding: 50 16 16 16;
  margin-bottom: 16;
  background-color: #53ba82;
  color: #ffffff;
  font-size: 24;
}

.drawer-item {
  padding: 8 16;
  color: #333333;
  font-size: 16;
}
</style>
