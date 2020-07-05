import axios from "axios";

import { login, signUp } from "../utils/api";

class AuthService {
  async login({ email, password, role }) {
    const response = await axios.post(login, {
      email,
      password,
      role,
    });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register({ matricula, nome, curso, email, password }) {
    return await axios.post(signUp, {
      matricula,
      nome,
      curso,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
