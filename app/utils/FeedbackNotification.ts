import Vue from 'vue';
import { TNSFancyAlert } from 'nativescript-fancyalert';
import { SnackBar } from '@nstudio/nativescript-snackbar';

const FeedbackNotification = new Vue({
  data: () => ({
    snackbar: new SnackBar(),
  }),
  methods: {
    showNoConnection() {
      this.snackbar.simple('No Connection', '#fff', '', 5, false);
    },
    showErrorMessage(content: string, title = 'Error!', buttonText = 'Ok') {
      return TNSFancyAlert.showError(title, content, buttonText);
    },
    showPopupWarning(content: string, title = 'Warning!', buttonText = 'Ok') {
      return TNSFancyAlert.showWarning(title, content, buttonText);
    },
  },
});

export default FeedbackNotification;
