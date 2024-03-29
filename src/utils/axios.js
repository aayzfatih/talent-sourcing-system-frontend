import axios from "axios";
import { apiUrl } from "@/constant/config";

const UnsecureAxios = axios.create({
  baseURL: apiUrl,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export { UnsecureAxios };
