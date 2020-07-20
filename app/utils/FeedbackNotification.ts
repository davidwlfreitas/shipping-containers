import Vue from 'vue';
import { Feedback, FeedbackType, FeedbackPosition } from 'nativescript-feedback';
import { TNSFancyAlert } from 'nativescript-fancyalert';

const FeedbackNotification = new Vue({
  data: () => ({
    feedback: new Feedback(),
  }),
  methods: {
    showNoConnection() {
      FeedbackNotification.feedback.show({
        message: 'No network connection available!',
        position: FeedbackPosition.Bottom, // iOS only
        type: FeedbackType.Error,
        duration: 3000,
      });
    },
    showErrorMessage(content) {
      FeedbackNotification.feedback.warning({
        message: content,
        position: FeedbackPosition.Bottom, // iOS only
        type: FeedbackType.Error,
        duration: 3000,
      });
    },
    showPopupWarning(content: string, title = 'Warning!', buttonText = 'Ok') {
      return TNSFancyAlert.showWarning(title, content, buttonText);
    },
  },
});

export default FeedbackNotification;
