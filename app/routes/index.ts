import App from '../components/App.vue';
import Account from '../pages/Account.vue';
import Feature from '../pages/Featured.vue';
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Settings from '../pages/Settings.vue';
import WebView from '../pages/Webview.vue';
import Discovery from '../pages/Discovery.vue';
import Container from '../pages/Container.vue';

const routes = {
  app: {
    component: App,
  },
  home: {
    component: Home,
    meta: { title: 'Home' },
  },
  login: {
    component: Login,
  },
  account: {
    component: Account,
    meta: { title: 'Account', backButton: true },
  },
  settings: {
    component: Settings,
    meta: { title: 'Settings' },
  },
  webview: {
    component: WebView,
    meta: { title: 'WebView', backButton: true },
  },
  feature: {
    component: Feature,
    meta: { title: 'Feature', backButton: true },
  },
  discovery: {
    component: Discovery,
    meta: { title: 'Discovery', backButton: true },
  },
  container: {
    component: Container,
    meta: { title: 'Container', backButton: true },
  },
};

export default routes;
