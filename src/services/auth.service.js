import api from "./api";
import TokenService from "./token.service";

const register = (username, email, password) => {
  return api.post("/auth/signup", {
    username,
    email,
    password
  });
};

const login = async (username, password) => {
  return api.post("/auth/signin", {
    username,
    password
  }).then((res) => {
    if (res.data.token) {
      TokenService.setUser(res.data);
    }

    return res.data;
  });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser
};

export default AuthService;
