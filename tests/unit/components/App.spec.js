import { shallowMount } from '@vue/test-utils';
import App from '../../../app/components/App.vue';
import { store } from '../../shared/store';

jest.mock('@nativescript/theme', () => {
  return {
    getMode: jest.fn(),
    toggleMode: jest.fn(),
  };
});

jest.mock('nativescript-secure-storage');

const DrawerComponentStub = {
  name: 'stacklayout',
  template: '<stacklayout />',
  props: ['~drawerContent'],
};

const MainComponentStub = {
  name: 'navigator-stub',
  template: '<navigator-stub />',
  props: ['~mainContent'],
};

const wrapper = shallowMount(App, {
  store,
  mocks: {
    $auth: {
      isLoggedIn: jest.fn(),
    },
  },
  stubs: {
    StackLayout: DrawerComponentStub,
    Navigator: MainComponentStub,
  },
});

describe('App.vue', () => {
  it('mounts and renders', () => {
    expect(wrapper.html()).toBeTruthy();
  });

  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
