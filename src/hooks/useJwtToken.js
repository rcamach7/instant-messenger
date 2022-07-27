import { useState, useEffect } from "react";
import axios from "axios";

export default function useJwtToken() {
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("token"));

  // Updates authorization header anytime our token changes, to keep user validated while making API calls.
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  }, [jwtToken]);

  return [jwtToken, setJwtToken];
}
