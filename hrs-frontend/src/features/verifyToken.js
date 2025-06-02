import { getToken, removeToken } from "../services/localStorageService";

const verifyToken = async () => {

  try {
    const url_is_valid_token = "http://127.0.0.1:8000/api/token/verify/";
    const { access_token } = getToken();
    const verify_is_valid_token = await fetch(url_is_valid_token, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: access_token }),
    });
    if (verify_is_valid_token.status === 200) {
        return true;
    } else {
        removeToken();
        return false;
    }
  } catch (error) {
    removeToken();

    return false;
  }
}

export default verifyToken;
