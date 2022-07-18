import { useContext, createContext, useState } from "react";
import { useJwtToken, useSetTheme, useFetchUser } from "../hooks/";

// Define context, and hook that will give components access to context values.
export const UserContext = createContext(null);
export const useUserContext = () => {
  const userContext = useContext(UserContext);

  if (!userContext) throw new Error("No context has been found!");

  return userContext;
};

// Define our provider to be used top level of all components that need these values.
export const UserContextProvider = ({ children }) => {
  // User authentication management.
  const [jwtToken, setJwtToken] = useJwtToken();
  const [user, setUser] = useFetchUser(jwtToken, setJwtToken);

  // Manages socket connection with server that enables instant communication.
  const [roomSocket, setRoomSocket] = useState(null);
  const [activeFriendChat, setActiveFriendChat] = useState({
    friendId: "",
    fullName: "",
    messages: [],
  });

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
        activeFriendChat,
        setActiveFriendChat,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
