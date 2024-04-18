import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { verifyLoggedIn } from "../../helpers/session";
import styles from "./Styles.module.css";

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    verifyLoggedIn(navigate);
  });

  return (
    <div className={styles.container}>
      <CircularProgress size={75} />
    </div>
  );
}

export default SplashScreen;
