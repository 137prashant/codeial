export * from './constants';

export const setItemInLocalStorage = (key, value) => {
  if (!key || !value) {
    return console.log('can not store in LS');
  }
  const valueToStore =
    typeof value !== 'string' ? JSON.stringify(value) : value;
  localStorage.setItem(key, valueToStore);
};

export const getItemFromLocalStorage = (key) => {
  if (!key) {
    return console.log('can not store in LS');
  }
  return localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
  if (!key) {
    return console.log('can not store in LS');
  }
  localStorage.removeItem(key);
};

export const getFormBody = (params) => {
  let formBody = [];
  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
    let encodeValue = encodeURIComponent(params[property]); // vishal 123 => vishal%2020123

    formBody.push(encodedKey + '=' + encodeValue);
  }
  return formBody.join('&'); // 'username = vishal&password=123213
};
