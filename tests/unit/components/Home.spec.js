import {
  shallowMount
} from '@vue/test-utils';
import Home from '../../../app/pages/Home.vue';
import {
  store
} from '../../shared/store';

jest.mock('nativescript-secure-storage');

const wrapper = shallowMount(Home, {
  store,
});

describe('Home.vue', () => {
  it('mounts and renders', () => {
    expect(wrapper.html()).toBeTruthy();
  });

  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('has a created hook', () => {
    expect(typeof Home.created).toBe('function');
  });

  it('has a beforeDestroy hook', () => {
    expect(typeof Home.beforeDestroy).toBe('function');
  });
});