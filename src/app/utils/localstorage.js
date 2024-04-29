class LocalStorage {
  static get = (key) => {
    if (typeof window === "undefined") return;

    return JSON.parse(localStorage.getItem(key));
  };

  static set = (key, value) => {
    if (typeof window === "undefined") return;

    localStorage.setItem(key, JSON.stringify(value));
  };

  static remove = (key) => {
    if (typeof window === "undefined") return;

    window.localStorage.removeItem(key);
  };
}

export default LocalStorage;
