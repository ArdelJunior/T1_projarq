import axios from "axios";
import authHeader from "../../services/AuthHeader";

export default class ApiReq {
  static instance = null;

  static getInstance() {
    if (!this.instance) {
      const header = authHeader();
      this.instance = axios.create({ headers: { ...header } });
    }
    return this.instance;
  }
}
