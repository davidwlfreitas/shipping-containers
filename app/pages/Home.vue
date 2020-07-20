<template>
  <Page class="page" :actionBarHidden="true">
    <grid-layout>
      <StackLayout orientation="center" width="310" height="210" class="beginning">
        <Label textWrap="true">
          <FormattedString>
            <Span text="Shipping " />
            <Span text="Containers" fontWeight="bold" />
          </FormattedString>
        </Label>
      </StackLayout>
      <fab
        @tap="goToDiscovery"
        swipeAnimation="slideDown"
        row="1"
        class="fab-button fas c-white btn-dicover"
        text.decode="&#xf002;"
      ></fab>
    </grid-layout>
  </Page>
</template>

<script lang="ts">
export default {
  data() {
    return {};
  },
  methods: {
    goToDiscovery() {
      this.$navigator.navigate('discovery', {
        frame: 'main',
        animated: true,
        transition: {
          name: 'slideLeft',
          duration: 400,
          curve: 'easeOut',
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.btn-dicover {
  animation-name: scale;
  animation-duration: 3;
}
@keyframes scale {
  from {
    transform: scale(0.5, 0.5);
  }
  to {
    transform: scale(1, 1);
  }
}
.card {
  margin: 15 15 0;
}
.card-layout {
  padding: 20;
}
.card-layout .h1 {
  margin-bottom: 15;
}

.fab-button {
  height: 70;
  width: 70; /// this is required on iOS - Android does not require width so you might need to adjust styles
  margin: 15;
  background-color: #049c88;
  horizontal-align: right;
  vertical-align: bottom;
}
.loading {
  // vertical-align: bottom;
}
.beginning {
  text-align: center;
}
</style>
