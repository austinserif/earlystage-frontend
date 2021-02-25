import cookieCutter from 'cookie-cutter';

const parseCookies = (...args) => {
  // instantiates a new object
  const cookiesObject = new Object();

  // for each valid string input that has a valid cookie value, add a key value pair to the object and return it
  args.forEach((v) => {
    if (typeof v === 'string' || v instanceof String) {
      const cookieValue = cookieCutter.get(v);
      if (typeof cookieValue === 'string' || cookieValue instanceof String) {
        cookiesObject[v] = cookieValue;
      }
    }
  });

  return cookiesObject;
};

export default parseCookies;
