export const getLocalStorage = () => {
  if (localStorage.hasOwnProperty("user_data")) {
    return JSON.parse(localStorage.getItem("user_data"));
  }
  return false;
};

export const removeLocalStorage = () => {
  if (localStorage.hasOwnProperty("user_data")) {
    localStorage.removeItem("user_data");
  }
};

export const setLocalStorage = (data) => {
  localStorage.setItem("user_data", JSON.stringify(data));
};
