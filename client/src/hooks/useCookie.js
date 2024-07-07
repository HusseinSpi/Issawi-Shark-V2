import { useState, useEffect } from "react";

const useCookie = (name) => {
  const [cookie, setCookie] = useState(null);

  useEffect(() => {
    const getCookie = (cookieName) => {
      const nameEQ = cookieName + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookieArray = decodedCookie.split(";");

      for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
          return cookie.substring(nameEQ.length, cookie.length);
        }
      }
      return null;
    };

    setCookie(getCookie(name));
  }, [name]);

  return cookie;
};

export default useCookie;
