import { useState, useEffect } from "react";
import axios from "axios";

// Send all requests with our authentication token - if it exists.
const storedJwt = localStorage.getItem("token");

export default function useFetchUser() {
  const [user, setUser] = useState(null);

  // Retrieve user data and update state.
  const fetchUser = async () => {
    try {
      // De-construct nested object field in our API response.
      const {
        data: { user },
      } = await axios.get("/users/");
      setUser(user);
    } catch (error) {
      // Token exists - but is not valid, or API is down, so we remove it to log user out.
      localStorage.removeItem("token");
      window.location.reload();
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
  }, [user]);

  return [user, setUser];
}
