import axios from "axios";
import authHeader from "../../services/AuthHeader";

export default class ApiReq {
  static instance = null;

  static getInstance() {
    const header = authHeader();
    if (!this.instance) {
      this.instance = axios.create();
    }
    this.instance.interceptors.request.use((config) => {
      Object.entries(header).forEach((entry) => {
        config.headers[entry[0]] = entry[1];
      });
      return config;
    })
    return this.instance;
  }
}
