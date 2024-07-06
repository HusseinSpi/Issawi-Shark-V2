export const createFormData = (data) => {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] instanceof Array) {
      data[key].forEach((item) => formData.append(key, item));
    } else {
      formData.append(key, data[key]);
    }
  }
  return formData;
};
