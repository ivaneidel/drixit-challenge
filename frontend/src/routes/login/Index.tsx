import {
  Alert,
  Button,
  CircularProgress,
  Paper,
  TextField,
} from "@mui/material";
import styles from "./Styles.module.css";
import { useState } from "react";
import { emailRegex } from "../../helpers/regex";
import { authenticate } from "../../services/api/user";
import { setToken } from "../../services/tokenRepository";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidEmailError, setInvalidEmailError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  const buttonDisabled = !showPassword
    ? !email.trim()
    : !email.trim() || !password.trim() || loading;

  const onButtonPressed = async () => {
    if (!email) return;

    const isEmailValid = emailRegex.test(email);

    if (!isEmailValid) return setInvalidEmailError(true);

    setInvalidEmailError(false);

    if (!showPassword) return setShowPassword(!showPassword);

    setLoading(true);

    const token = await authenticate(email, password);

    if (!token) {
      setLoginError(true);
      setLoading(false);
      return;
    }

    setToken(token);

    navigate("/profile", { replace: true });
  };

  return (
    <div className={styles.container}>
      <Paper className={styles.paper}>
        <h2>Drixit Challenge</h2>
        <span>Welcome to Drixit Challenge, please login to proceed.</span>
        <TextField
          label="Email"
          placeholder="example@example.com"
          type="email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
          error={invalidEmailError}
          helperText={
            invalidEmailError ? "The value provided is not a valid email" : null
          }
        />
        {showPassword && (
          <TextField
            label="Password"
            type="password"
            autoFocus={true}
            placeholder="********"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
          />
        )}
        {loginError && (
          <Alert variant="filled" severity="error">
            There was an error logging in, please verify your credentials and
            try again.
          </Alert>
        )}
        <Button
          className={styles.paper.button}
          variant="contained"
          disabled={buttonDisabled}
          onClick={onButtonPressed}
        >
          {loading ? (
            <CircularProgress size={25} />
          ) : showPassword ? (
            "Login"
          ) : (
            "Next"
          )}
        </Button>
      </Paper>
    </div>
  );
}

export default LoginPage;
