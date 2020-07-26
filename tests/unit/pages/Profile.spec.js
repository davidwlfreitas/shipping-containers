import {
  shallowMount, config
} from '@vue/test-utils';
import Profile from '../../../app/pages/Profile.vue';
import {
  TYPES
} from '../../../app/store/types';
import {
  store
} from '../../shared/store';
import {
  actions
} from '../../shared/actions';

config.showDeprecationWarnings = false;

jest.mock('nativescript-secure-storage');

const wrapper = shallowMount(Profile, {
  store,
});

describe('Profile.vue', () => {
  it('mounts and renders', () => {
    expect(wrapper.html()).toBeTruthy();
  });

  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('sets the default data - accountInfo', () => {
    expect(wrapper.vm.accountInfo).toBeDefined();
  });

  it('checks default data - the first name of the accountInfo', () => {
    expect(wrapper.vm.accountInfo.firstName).toBe('John');
  });

  it('checks default data - the last name of the accountInfo', () => {
    expect(wrapper.vm.accountInfo.lastName).toBe('Doe');
  });

  it('checks default data - the email of the accountInfo', () => {
    expect(wrapper.vm.accountInfo.email).toBe('test@gmail.com');
  });

  it('checks editProfile() exsits', () => {
    expect(wrapper.vm.editProfile).toBeDefined();
  });

  it('should go account page when the button "Edit Profile" is clicked', () => {
    wrapper.setMethods({
      $navigator: {
        navigate: jest.fn(),
      },
      $modal: {
        close: jest.fn(),
      },
    });
    wrapper.find('button').trigger('tap');

    expect(wrapper.vm.$navigator.navigate).toHaveBeenCalled();
  });
});