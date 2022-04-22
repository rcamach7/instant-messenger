import { useState, useEffect } from "react";
import config from "../assets/config.json";
import axios from "axios";

export default function useFetchUser(storedJwt, setStoredJwt) {
  const [user, setUser] = useState(null);

  // Retrieve user data and update state.
  const fetchUser = async () => {
    try {
      // De-construct nested object field in our API response.
      const {
        data: { user },
      } = await axios.get(`${config.apiUrl}/users/`);
      setUser(user);
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
