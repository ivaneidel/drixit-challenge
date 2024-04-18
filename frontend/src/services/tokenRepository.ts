import { TOKEN_KEY_STORAGE } from "../constants/constants";
import { getStorageItem, setStorageItem } from "./storage";

const getToken = () => {
  const token = getStorageItem(TOKEN_KEY_STORAGE);
  return token;
};

const setToken = (value: string) => {
  setStorageItem(TOKEN_KEY_STORAGE, value);
};

const clearToken = () => {
  setStorageItem(TOKEN_KEY_STORAGE, null);
};

export { getToken, setToken, clearToken };
