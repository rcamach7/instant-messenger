import { useState, useEffect } from "react";
import { getUser } from "../data/api";

export default function useFetchUser(jwtToken, setJwtToken) {
  const [user, setUser] = useState(null);

  // Get user data if JWT token exists but we haven't requested user data.
  useEffect(() => {
    // Retrieve user data and update state.
    const fetchUser = async () => {
      try {
        const user = await getUser();
        setUser(user);
      } catch (error) {
        // Token might be expired, or API is down.
        localStorage.removeItem("token");
        setUser(null);
        setJwtToken(null);
      }
    };
    // If we have a token stored and user in null, retrieve user from API.
    if (jwtToken && user === null) {
      fetchUser();
    }
  }, [user, jwtToken, setJwtToken]);

  return [user, setUser];
}
