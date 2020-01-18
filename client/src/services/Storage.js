export default {
  setData(key, value, session = false) {
    const store = session ? 'localStorage' : 'sessionStorage';
    value = JSON.stringify(value);
    window[store][key] = value;
  },
  getData(key, session = false) {
    const store = session ? 'localStorage' : 'sessionStorage';
    if (this.hasData(key, session)) {
      try {
        return JSON.parse(window[store][key]);
      } catch (error) {
        return window[store][key];
      }
    }
    return null;
  },
  hasData(key, session = false) {
    const store = session ? 'localStorage' : 'sessionStorage';
    try {
      if (window[store] && window[store][key]) {
        return true;
      }
    } catch (error) {
      throw new Error(error);
    }
    return false;
  },
  removeData(key, session = false) {
    const store = session ? 'localStorage' : 'sessionStorage';
    if (window[store] && window[store][key]) {
      window[store].removeItem(key);
    }
  },
  clearData(session = false) {
    const store = session ? 'localStorage' : 'sessionStorage';
    if (window[store]) {
      window[store].clear();
    }
  },
  addItem(key, value, index, session = false) {
    const store = session ? 'localStorage' : 'sessionStorage';
    if (window[store]) {
      const data = this.hasData(key, session) ? this.getData(key, session) : [];
      if (index && 'start' === index) {
        data.unshift(value);
      } else {
        data.push(value);
        this.setData(key, data, session);
      }
    }
  },
  getItem(key, index, session = false) {
    const data = this.getData(key, session);
    return data && data[index] ? data[index] : null;
  },
};
