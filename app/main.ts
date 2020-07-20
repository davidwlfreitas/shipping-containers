import Vue from 'nativescript-vue';
import store from './store';
import VueDevtools from 'nativescript-vue-devtools';
import RadSideDrawer from 'nativescript-ui-sidedrawer/vue';
import RadListView from 'nativescript-ui-listview/vue';
import RadDataForm from 'nativescript-ui-dataform/vue';
import Navigator from 'nativescript-vue-navigator';
import auth from './services/auth';
import routes from './routes';
import { startMonitoring, connectionType } from 'tns-core-modules/connectivity/connectivity';
import { TYPES } from './store/types';

Vue.use(RadSideDrawer);
Vue.use(RadListView);
Vue.use(RadDataForm);

if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools);
}

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = TNS_ENV === 'production';

// Login Auth0
Vue.prototype.$auth = auth;

// Machine Learning Kit
Vue.registerElement(
  'MLKitTextRecognition',
  () => require('nativescript-plugin-firebase/mlkit/textrecognition').MLKitTextRecognition,
);

// RTL UI Elements
Vue.registerElement('RGridLayout', () => require('@nativescript-rtl/ui').GridLayout);
Vue.registerElement('RWrapLayout', () => require('@nativescript-rtl/ui').WrapLayout);
Vue.registerElement('RAbsoluteLayout', () => require('@nativescript-rtl/ui').AbsoluteLayout);
Vue.registerElement('RDockLayout', () => require('@nativescript-rtl/ui').DockLayout);
Vue.registerElement('RStackLayout', () => require('@nativescript-rtl/ui').StackLayout);
Vue.registerElement('LottieView', () => require('nativescript-lottie').LottieView);
Vue.registerElement('CardView', () => require('@nstudio/nativescript-cardview').CardView);

Vue.registerElement('Fab', () => require('@nstudio/nativescript-floatingactionbutton').Fab);

Vue.use(Navigator, { routes });

new Vue({
  store,
  mounted() {
    startMonitoring((newConnectionType) => {
      if (global.isDevEnv) console.log('Checking Has Connection: ', newConnectionType ? true : false);
      store.dispatch(
        `${TYPES.modules.CORE}/${TYPES.actions.UPDATE_HAS_CONNECTION}`,
        newConnectionType !== connectionType.none ? true : false,
      );
    });
  },
  render: (h) => h('navigator', { props: { defaultRoute: 'app' } }),
}).$start();
