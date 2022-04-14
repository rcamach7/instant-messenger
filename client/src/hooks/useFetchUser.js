import { useState, useEffect } from "react";
import axios from "axios";

// Retrieve, if any, token existing in local storage.
// const storedJwt = localStorage.getItem("token");

export default function useFetchUser(storedJwt, setStoredJwt) {
  const [user, setUser] = useState(null);

  // Retrieve user data and update state.
  const fetchUser = async () => {
    try {
      // De-construct nested object field in our API response.
      const { data } = await axios.get(
        "https://mighty-depths-39289.herokuapp.com/users/"
      );
      setUser(data.user);
    } catch (error) {
      console.log(error.response);
      // Token exists - but is not valid, or API is down, so we remove it to log user out.
      localStorage.removeItem("token");
      setUser(null);
      setStoredJwt(null);
    }
  };

  // Sign users in on page refresh if JWT token exists.
  useEffect(() => {
    if (storedJwt) {
      fetchUser();
    }
  }, []);

  // Get user data is JWT token exists but we haven't requested user data (possibly re-opened tab)
  useEffect(() => {
    if (storedJwt && user === null) {
      fetchUser();
    }
  }, [user, storedJwt]);

  return [user, setUser];
}
