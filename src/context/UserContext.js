import { useContext, createContext, useState } from "react";
import useJwtToken from "../hooks/useJwtToken";
import useSetTheme from "../hooks/useSetTheme";
import useFetchUser from "../hooks/useFetchUser";

export const UserContext = createContext(null);
export const useUserContext = () => {
  const userContext = useContext(UserContext);

  if (!userContext) throw new Error("No context has been found!");

  return userContext;
};

export const UserContextProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useJwtToken();
  const [user, setUser] = useFetchUser(jwtToken, setJwtToken);
  const [roomSocket, setRoomSocket] = useState(null);
  const setTheme = useSetTheme("light");

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        jwtToken,
        setJwtToken,
        setTheme,
        roomSocket,
        setRoomSocket,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
