import { useContext, createContext } from "react";
import useJwtToken from "../hooks/useJwtToken";
import useSetTheme from "../hooks/useSetTheme";
import useFetchUser from "../hooks/useFetchUser";

export const UserContext = createContext(null);
export const useUserContext = () => {
  const userContext = useContext(UserContext);

  if (!useContext) throw new Error("No context found");

  return userContext;
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useFetchUser();
  const [jwtToken, setJwtToken] = useJwtToken();
  const setTheme = useSetTheme("light");

  return (
    <UserContext.Provider
      value={{ user, setUser, jwtToken, setJwtToken, setTheme }}
    >
      {children}
    </UserContext.Provider>
  );
};
