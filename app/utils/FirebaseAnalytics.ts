import Vue from 'vue';
import { crashlytics, analytics } from 'nativescript-plugin-firebase';

const FirebaseAnalytics = new Vue({
  created() {
    crashlytics.setCrashlyticsCollectionEnabled(true);
  },
  methods: {
    async sendLogEvent(page: string) {
      await analytics.logEvent({
        key: 'page_view',
        parameters: [
          {
            key: 'page_id',
            value: page,
          },
        ],
      });
    },
    sendCrashLog(error: any) {
      crashlytics.sendCrashLog(error);
    },
  },
});

export default FirebaseAnalytics;
