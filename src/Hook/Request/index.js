const commonHeaderOptions = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const requestAPI = async (url, options) => {
  options.headers = Object.assign(commonHeaderOptions, options.headers);
  try {
    const res = await fetch(url, options);
    const json = await res.json();
    return {
      json,
    };
  } catch (error) {
    return { error };
  }
};
