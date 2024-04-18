const getStorageItem = (key: string): string | undefined => {
  const value = localStorage.getItem(key);

  if (value) return value;

  return undefined;
};

const setStorageItem = (key: string, value: string | null) => {
  if (value) {
    localStorage.setItem(key, value);
  }
  else{
    localStorage.removeItem(key);
  }
};

export { getStorageItem, setStorageItem };
