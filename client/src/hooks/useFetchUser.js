import { useState, useEffect } from "react";
import config from "../assets/config.json";
import axios from "axios";

export default function useFetchUser(storedJwt, setStoredJwt) {
  const [user, setUser] = useState(null);

  // Get user data if JWT token exists but we haven't requested user data.
  useEffect(() => {
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

    if (storedJwt && user === null) {
      fetchUser();
    }
  }, [user, storedJwt, setStoredJwt]);

  return [user, setUser];
}
