import LocalStorage from "./localstorage";

class ExpirySession {
  static get = (key) => {
    let stringValue = LocalStorage.get(key); // get details about token.
    if (!!stringValue) {
      let value = JSON.parse(stringValue);
      let expirationDate = new Date(value.expirationDate);
      if (expirationDate > new Date()) {
        this.set("access_token", value.value);
        return value.value;
      } else {
        LocalStorage.remove(key); // remove token if expired.
      }
    }
    return null;
  };

  static set = (key, value, expirationInSeconds = 1800) => {
    console.log(key, value, expirationInSeconds);
    let expirationDate = new Date(
      new Date().getTime() + 1000 * expirationInSeconds
    ); // create new expiring date.
    let newValue = {
      value,
      expirationDate: expirationDate.toISOString()
    };
    LocalStorage.set(key, JSON.stringify(newValue)); // add token to local storage.
  };

  static clear = () => {
    LocalStorage.remove("access_token");
  };
}

export default ExpirySession;
