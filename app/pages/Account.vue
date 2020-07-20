<template>
  <Page class="page" :actionBarHidden="true">
    <StackLayout class="form">
      <Image :src="accountInfo.image" class="icon" />
      <RadDataForm :source="account" :metadata="accountMetadata" ref="dataform" :isReadOnly="processing"></RadDataForm>
      <Button class="primary -rounded-lg" text="Save" @tap="save" :isEnabled="!processing"></Button>
    </StackLayout>
  </Page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { TYPES } from '../store/types';

export default {
  data() {
    return {
      processing: false,
      accountMetadata: {
        commitMode: 'Immediate',
        validationMode: 'OnLostFocus',
        propertyAnnotations: [
          {
            name: 'firstName',
            displayName: '',
            hintText: 'First Name',
            index: 0,
            editor: 'Text',
            validators: [
              {
                name: 'NonEmpty',
                params: { errorMessage: 'Please provide your first name.' },
              },
            ],
          },
          {
            name: 'lastName',
            displayName: '',
            hintText: 'Last Name',
            index: 1,
            editor: 'Text',
            validators: [
              {
                name: 'NonEmpty',
                params: { errorMessage: 'Please provide your last name.' },
              },
            ],
          },
          {
            name: 'email',
            displayName: '',
            hintText: 'Email',
            index: 2,
            editor: 'Email',
            validators: [
              {
                name: 'NonEmpty',
                params: { errorMessage: 'Please provide your email address.' },
              },
              {
                name: 'Email',
                params: {
                  errorMessage: 'Please provide a valid email address.',
                },
              },
            ],
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      accountInfo: `${TYPES.modules.CORE}/${TYPES.getters.GET_ACCOUNT}`,
    }),
    account() {
      return {
        firstName: this.accountInfo.firstName,
        lastName: this.accountInfo.lastName,
        email: this.accountInfo.email,
      };
    },
  },
  methods: {
    save() {
        this.$refs.dataform.validateAll()
        .then(result => {
            if (result) {
                this.processing = true;
                //to do
            }
        });
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  padding: 20;
}
.form .icon {
  border: 2px solid #ffffff;
  border-radius: 100%;
  width: 80;
  height: 80;
}
.primary {
  background-color: #049c88;
  color: #ffffff;
}
</style>
