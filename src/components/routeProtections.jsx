import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

// Protects routes that require authentication
export function RequireAuth({ children }) {
  const { jwtToken } = useUserContext();
  return jwtToken === null ? (
    <Navigate to="/instant-messenger" replace />
  ) : (
    children
  );
}

// Once authenticated, we don't want our users to continue in the landing page / sign in page.
export function NotAuthenticated({ children, storedJwt }) {
  const { jwtToken } = useUserContext();
  return jwtToken === null ? (
    children
  ) : (
    <Navigate to="/instant-messenger/home" replace />
  );
}
