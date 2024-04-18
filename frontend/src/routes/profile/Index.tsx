import { Alert, Button, CircularProgress, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { clearToken, getToken } from "../../services/tokenRepository";
import { getProfile } from "../../services/api/user";
import { ClientUser } from "../../interfaces/user";
import styles from "./Styles.module.css";

function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [profile, setProfile] = useState<ClientUser>();

  const navigate = useNavigate();

  const logout = () => {
    clearToken();
    navigate("/login", { replace: true });
  };

  const redirectToLoginTimeout = () => {
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 3000);
  };

  const loadProfile = async () => {
    const token = getToken();

    // If there's no token stored locally, redirect to login
    if (!token) {
      setRedirectToLogin(true);
      setLoading(false);
      return redirectToLoginTimeout();
    }

    const profile = await getProfile(token);

    // If there's no token stored locally, redirect to login
    if (!profile) {
      setRedirectToLogin(true);
      setLoading(false);
      return redirectToLoginTimeout();
    }

    setProfile(profile);
    setLoading(false);
  };

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <Paper className={styles.paper}>
        {loading && <CircularProgress size={40} />}
        {redirectToLogin && (
          <Alert variant="filled" severity="warning">
            Credentials invalid or session expired. <br />
            Redirecting to login page in 3 seconds...
          </Alert>
        )}
        {!!profile && (
          <div className={styles.profileContainer}>
            <div className={styles.profile}>
              <img src={profile.avatar} alt="Avatar" />
              <div className={styles.info}>
                <h2>
                  Hello {profile.name} {profile.surname}!
                </h2>
                <span>
                  <strong>Role:</strong> {profile.role.toUpperCase()}
                </span>
                <span>
                  <strong>Age:</strong> {profile.age}
                </span>
                <span>
                  <strong>Email:</strong> {profile.email}
                </span>
              </div>
            </div>
            <Button
              className={styles.logoutButton}
              variant="contained"
              color="error"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        )}
      </Paper>
    </div>
  );
}

export default ProfilePage;
