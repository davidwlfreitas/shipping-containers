import { shallowMount, config } from '@vue/test-utils';
import Header from '../../../app/components/Header.vue';
import { store } from '../../shared/store';

config.showDeprecationWarnings = false;

jest.mock('nativescript-secure-storage');

jest.mock('@/utils/FirebaseAnalytics', () => {
  return {
    sendLogEvent: jest.fn(),
    sendCrashLog: jest.fn(),
  };
});

const wrapper = shallowMount(Header, {
  store,
  propsData: {
    openDrawer: jest.fn(),
  },
  mocks: {
    $navigator: {
      routes: jest.fn(() => {
        return {
          meta: {
            title: 'home',
            backButton: false,
          },
        };
      }),
    },
  },
});

wrapper.setMethods({
  showModal: jest.fn(),
});

describe('Header.vue', () => {
  it('mounts and renders', () => {
    expect(wrapper.html()).toBeTruthy();
  });

  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('checks the props openDrawer() exsits', () => {
    expect(wrapper.vm.openDrawer).toBeDefined();
  });

  it('should call openDrawer() when the menu icon is clicked if backButton is false', () => {
    wrapper.find('#header label').trigger('tap');

    expect(wrapper.vm.openDrawer).toHaveBeenCalled();
  });

  it('should call showModal() when the image is clicked if backButton is false', () => {
    wrapper.find('flexboxlayout-stub').vm.$emit('tap');

    expect(wrapper.vm.showModal).toHaveBeenCalled();
  });

  it('checks the route title on the actionbar', () => {
    expect(wrapper.findAll('#header label').at(-1).attributes('text')).toBe('home');
  });
});
