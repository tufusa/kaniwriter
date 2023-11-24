import axios from "axios";

export const compiler = axios.create({
  baseURL: import.meta.env.VITE_COMPILER_URL,
});
