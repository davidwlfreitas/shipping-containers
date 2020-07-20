<template>
  <ScrollView height="400">
    <StackLayout class="modal-grid">
      <!-- <Button class="btn btn-outline" text="Close Modal" @tap="$modal.close()" /> -->
      <StackLayout class="card-layout" v-if="accountInfo">
        <GridLayout columns="auto, *" rows="*, *">
          <Image :src="accountInfo.image" class="icon" col="0" rowSpan="2" verticalAlignment="center" />
          <Label class="font-weight-bold" :text="`${accountInfo.username__c}`" col="1" row="0" />
          <Label textWrap="true" v-if="accountInfo.email" :text="accountInfo.email" col="1" row="1" />
        </GridLayout>
        <Button class="-outline -rounded-lg m-b-0 btn-edit" text="Edit Profile" @tap="editProfile"></Button>
      </StackLayout>
      <StackLayout class="hr"></StackLayout>
    </StackLayout>
  </ScrollView>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { TYPES } from '../store/types';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      accountInfo: `${TYPES.modules.CORE}/${TYPES.getters.GET_ACCOUNT}`,
    }),
  },
  methods: {
    async editProfile() {
      await this.$navigator.navigate('account', {
        frame: 'main',
        transition: {
          name: 'slideTop',
          duration: 800,
          curve: 'spring',
        },
      });
      this.$modal.close();
    },
  },
};
</script>

<style scoped>
.modal-grid {
  border: 2x solid;
  border-radius: 10%;
}
.card-layout {
  padding: 16;
}
.card-layout .icon {
  border: 2px solid #ffffff;
  border-radius: 100%;
  margin-right: 16;
  width: 40;
  height: 40;
}
.-selected {
  background-color: lightgray;
}
.btn-edit {
  font-size: 12;
  border-color: lightgray;
  color: black;
}
</style>
