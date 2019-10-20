import { cookies } from '@/utils';
import { apiClient } from '@/api/index';
import { env, LOGIN_CLIENT_KEY, LOGIN_CLIENT_VALUE } from '~/build/config';

const loginManager = {
  allowLogin() {
    return window.location.protocol === 'https:' || env === 'local-dev';
  },

  isLogin() {
    return cookies.get(LOGIN_CLIENT_KEY) === LOGIN_CLIENT_VALUE;
  },

  async _handleResponse(doRequest) {
    let resp = null;
    try {
      resp = await doRequest();
      if (resp.status === 200) {
        return true;
      }
    } catch (e) {
      alert(e.response.data);
      console.error(e);
    }
    return false;
  },

  async login() {
    if (this.isLogin()) {
      return true;
    }
    if (!this.allowLogin()) {
      return false;
    }
    const passcode = prompt('Passcode');
    return this._handleResponse(() => apiClient.post('/login', { pc: passcode }));
  },

  async logout() {
    if (this.isLogin()) {
      return this._handleResponse(() => apiClient.post('/logout'));
    }
    return true;
  },
};

export default loginManager;
