import Cookie from 'js-cookie';

class Account {
  static setToken = (token, remember) => {
    if (remember) {
      localStorage.setItem('token', token);
    } else {
      Cookie.set('token', token);
    }
  };
  static getToken = () => {
    return localStorage.getItem('token') || Cookie.get('token') || '';
  };
  static getId = () => {
    return localStorage.getItem('id');
  };
  static getAccessId = () => {
    return localStorage.getItem('accessId');
  };
  static delete = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('account');
    // localStorage.clear()
    Cookie.remove('token');
  };

  static set = account => {
    localStorage.setItem('account', JSON.stringify(account));
  };

  static get = () => {
    const account = localStorage.getItem('account');
    try {
      return JSON.parse(account) || {};
    } catch (e) {
      return {};
    }
  };

  static updateAccount = account => {
    const token = localStorage.getItem('token') || Cookie.get('token');
    if (token) {
      localStorage.setItem('account', JSON.stringify(account));
    }
  };
}

export default Account;
