import axios from "axios";
import { API_URL } from "../../constants/constants";

const authenticate = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v0/authenticate`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 && response.data["token"]) {
      return response.data["token"];
    }
  } catch (error) {
    // In case of an error the caller handles a null response
  }
  return null;
};

// It would be best to manage the token using a state management system
// but to keep things simple, I'm gonna just pass it here
const getProfile = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/v0/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    // In case of an error the caller handles a null response
  }
  return null;
};

export { authenticate, getProfile };
