import { shallowMount } from '@vue/test-utils';
import Account from '../../../app/pages/Account.vue';
import { store } from '../../shared/store';

const wrapper = shallowMount(Account, {
  store,
});

describe('Account.vue', () => {
  it('mounts and renders', () => {
    expect(wrapper.html()).toBeTruthy();
  });

  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('sets the correct default data', () => {
    expect(typeof Account.data).toBe('function');
  });

  it('sets the default data - accountInfo', () => {
    expect(wrapper.vm.accountInfo).toBeDefined();
  });

  it('sets the default data - account', () => {
    expect(wrapper.vm.account).toBeDefined();
  });

  it('checks default data - the first name of the account', () => {
    expect(wrapper.vm.account.firstName).toBe(wrapper.vm.accountInfo.firstName);
  });

  it('checks default data - the last name of the account', () => {
    expect(wrapper.vm.account.lastName).toBe(wrapper.vm.accountInfo.lastName);
  });

  it('checks default data - the email of the account', () => {
    expect(wrapper.vm.account.email).toBe(wrapper.vm.accountInfo.email);
  });

  it('has a raddataform-stub', () => {
    expect(wrapper.contains('raddataform-stub')).toBe(true);
  });
});
