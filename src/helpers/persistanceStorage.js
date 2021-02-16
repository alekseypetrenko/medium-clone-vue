export const getItem = key => {
  try {
    console.log(localStorage.getItem(key));
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.log('Error getting data from local storage', error);
    return null;
  }
};

export const setItem = (keyName, data) => {
  try {
    localStorage.setItem(keyName, JSON.stringify(data));
  } catch (error) {
    console.log('Error saving data in local storage', error);
  }
};
