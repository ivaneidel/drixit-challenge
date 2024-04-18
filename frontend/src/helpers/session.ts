import { NavigateFunction } from "react-router-dom";
import { getToken } from "../services/tokenRepository";
import { getProfile } from "../services/api/user";

// Will automatically redirect to the login page if the user is not authenticated
const verifyLoggedIn = async (navigate: NavigateFunction) => {
  const token = getToken();

  // If there's no token stored locally, redirect to login
  if (!token) return navigate("/login", { replace: true });

  const profile = await getProfile(token);

  // If no profile was returned (due to invalid token), redirect to login
  if (!profile) return navigate("/login", { replace: true });

  navigate("/profile", { replace: true });
};

export { verifyLoggedIn };
