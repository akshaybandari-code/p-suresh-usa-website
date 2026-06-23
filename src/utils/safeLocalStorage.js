class SafeStorage {
  constructor() {
    this.memoryStore = {};
    this.isSupported = this._checkSupport();
  }

  _checkSupport() {
    try {
      if (typeof window === 'undefined' || !('localStorage' in window)) {
        return false;
      }
      const testKey = '__storage_test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  getItem(key) {
    if (this.isSupported) {
      try {
        return window.localStorage.getItem(key);
      } catch (e) {
        console.warn('SafeStorage.getItem error:', e);
      }
    }
    return Object.prototype.hasOwnProperty.call(this.memoryStore, key) ? this.memoryStore[key] : null;
  }

  setItem(key, value) {
    if (this.isSupported) {
      try {
        window.localStorage.setItem(key, value);
        return;
      } catch (e) {
        console.warn('SafeStorage.setItem error:', e);
      }
    }
    this.memoryStore[key] = String(value);
  }

  removeItem(key) {
    if (this.isSupported) {
      try {
        window.localStorage.removeItem(key);
        return;
      } catch (e) {
        console.warn('SafeStorage.removeItem error:', e);
      }
    }
    delete this.memoryStore[key];
  }

  clear() {
    if (this.isSupported) {
      try {
        window.localStorage.clear();
        return;
      } catch (e) {
        console.warn('SafeStorage.clear error:', e);
      }
    }
    this.memoryStore = {};
  }
}

export const safeLocalStorage = new SafeStorage();
