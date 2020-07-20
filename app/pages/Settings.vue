<template>
  <Page class="page" :actionBarHidden="true">
    <ActionBar class="action-bar">
      <ActionItem icon="res://menu" android:visibility="collapsed" ios.position="left"> </ActionItem>
      <Label class="action-bar-title" text="Settings"></Label>
    </ActionBar>

    <GridLayout class="page__content">
      <Label class="page__content-icon fas" text.decode="&#xf013;"></Label>

      <GridLayout
        rows="auto"
        columns="auto, auto"
        horizontalAlignment="left"
        class="page__content-placeholder m-t-4 m-r-8"
      >
        <Label col="1" text="DarkMode"></Label>
        <Switch col="0" :checked="isDarkMode" @checkedChange="changeDarkMode"></Switch>
      </GridLayout>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import Theme from '@nativescript/theme';

export default {
  data() {
    return {
      isDarkMode: Theme && Theme.getMode() === 'ns-dark' ? true : false,
    };
  },
  methods: {
    changeDarkMode(event) {
      Theme.toggleMode(event.value);
    },
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import '~@nativescript/theme/scss/variables/blue';
// End custom common variables

// Custom styles
</style>
