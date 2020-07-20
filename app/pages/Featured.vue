<template>
  <Page class="page" :actionBarHidden="true">
    <ActionBar class="action-bar">
      <!-- 
            Use the NavigationButton as a side-drawer button in Android
            because ActionItems are shown on the right side of the ActionBar
            -->
      <!-- <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton> -->
      <!-- 
            Use the ActionItem for IOS with position set to left. Using the
            NavigationButton as a side-drawer button in iOS is not possible,
            because its function is to always navigate back in the application.
            -->
      <ActionItem icon="res://menu" android:visibility="collapsed" ios.position="left"> </ActionItem>
      <Label class="action-bar-title" text="Featured"></Label>
    </ActionBar>

    <GridLayout class="page__content">
      <Label class="page__content-icon fas" text.decode="&#xf005;"></Label>
      <Label class="page__content-placeholder" :text="message"></Label>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import { TYPES } from '../store/types';

export default {
  computed: {
    message() {
      return '<!-- Page content goes here -->';
    },
  },
  methods: {},
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import '~@nativescript/theme/scss/variables/blue';
// End custom common variables

// Custom styles
</style>
