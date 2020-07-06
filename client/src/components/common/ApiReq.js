import axios from "axios";
import authHeader from "../../services/AuthHeader";

export default class ApiReq {
  static instance = null;

  static getInstance() {
    const header = authHeader();
    if (!this.instance) {
      this.instance = axios.create();
    }
    Object.entries(header).forEach((entry) => {
      this.instance.defaults.headers[entry[0]] = entry[1];
    });
    return this.instance;
  }
}
