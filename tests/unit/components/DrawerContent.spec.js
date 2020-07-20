import { shallowMount } from '@vue/test-utils';
import DrawerContent from '../../../app/components/DrawerContent.vue';
import { store } from '../../shared/store';

jest.mock('@nativescript/theme', () => {
  return {
    getMode: jest.fn(),
    toggleMode: jest.fn(),
  };
});

jest.mock('nativescript-secure-storage');

const wrapper = shallowMount(DrawerContent, {
  store,
  mocks: {
    $navigator: {
      paths: jest.fn(() => {
        return {
          main: 'home',
        };
      }),
    },
  },
});

wrapper.setMethods({
  onNavigationItemTap: jest.fn(),
  logout: jest.fn(),
});

describe('DrawerContent.vue', () => {
  it('mounts and renders', () => {
    expect(wrapper.html()).toBeTruthy();
  });

  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('checks onNavigationItemTap() exsits', () => {
    expect(wrapper.vm.onNavigationItemTap).toBeDefined();
  });

  it('should call onNavigationItemTap() when the navigation is clicked', () => {
    wrapper.find('.nt-drawer__list-item').vm.$emit('tap');

    expect(wrapper.vm.onNavigationItemTap).toHaveBeenCalled();
  });

  it('checks logout() exsits', () => {
    expect(wrapper.vm.logout).toBeDefined();
  });

  it('should call logout() when the last navigation(Logout) is clicked', () => {
    wrapper.findAll('.nt-drawer__list-item').at(-1).vm.$emit('tap');

    expect(wrapper.vm.logout).toHaveBeenCalled();
  });
});
