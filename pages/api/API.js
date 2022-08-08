import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-mazzillio-doarcomputadores.herokuapp.com",
});
