import { useState, useEffect } from "react";
import axios from "axios";

export default function useJwtToken() {
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("token"));

  // Updates authorization header anytime our token changes, to keep user validated while making API calls.
  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        if (jwtToken) {
          config.headers.authorization = `Bearer ${jwtToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, [jwtToken]);

  return [jwtToken, setJwtToken];
}
