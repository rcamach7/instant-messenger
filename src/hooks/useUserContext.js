import React from "react";

export const UserContext = React.createContext();

export const useUserContext = () => {
  const userContext = React.useContext(UserContext);

  if (!userContext) throw new Error("No context found");

  return userContext;
};
