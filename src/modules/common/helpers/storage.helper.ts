const STORAGE_KEY_PREFIX = 'manga-app-';

type StorageValue<T = any> = T | string | number | boolean | null;

function setItem<T extends StorageValue>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to local storage', error);
  }
}

function getItem<T extends StorageValue>(key: string): T | null {
  try {
    const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error('Error getting from local storage', error);
    return null;
  }
}

function removeItem(key: string): void {
  try {
    localStorage.removeItem(STORAGE_KEY_PREFIX + key);
  } catch (error) {
    console.error('Error deleting from local storage', error);
  }
}

function clearAll(): void {
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(STORAGE_KEY_PREFIX))
      .forEach((key) => localStorage.removeItem(key));
  } catch (error) {
    console.error('Error cleaning local storage', error);
  }
}

export const local = {
  setItem,
  getItem,
  removeItem,
  clearAll,
};
