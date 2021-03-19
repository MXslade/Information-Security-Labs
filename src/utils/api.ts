import axios from "axios";
import { Message } from "./interfaces";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const diffieHellmanAPI = {
  getLastMessage() {
    return instance.get("get-last-message");
  },
  sendMessage(message: Message) {
    return instance.post("message", message);
  },
};

export const passwordProtectionAPI = {
  authenticate(password: string) {
    return instance.post("password-protection", {
      password: password,
    });
  },
};
