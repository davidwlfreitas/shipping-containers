import {
  shallowMount
} from '@vue/test-utils';
import Webview from '../../../app/pages/Webview.vue';

const wrapper = shallowMount(Webview, {
  propsData: {
    source: 'https://www.google.com/'
  }
});

describe('Webview.vue', () => {
  it('mounts and renders', () => {
    expect(wrapper.html()).toBeTruthy();
  });

  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('checks the prop source', () => {
    expect(wrapper.props().source).toBe('https://www.google.com/');
  });
});