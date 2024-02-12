export const saveToLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };
  
  export const getFromLocalStorage = (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return null;
    }
  };
  
  export const removeFromLocalStorage = (key: string) => {
    localStorage.removeItem(key);
  };
  
  export const clearLocalStorage = () => {
    localStorage.clear();
  };
  
  export const Keys = {
    AUTH_TOKEN: "AUTH_TOKEN",
  };
  