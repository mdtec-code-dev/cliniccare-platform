import api from "@/lib/api/api";
import type { AuthUser } from "../types/auth.types";



export const authApi = {

    async me(): Promise<AuthUser> {
        const {data} = await api.get("/auth/me/");
        return data;
    },

    async login(payload: { username: string; password: string}){
        const {data} = await api.post("/auth/login/", payload);
        return data;
    },

    async logout() {
    const { data } = await api.post("/auth/logout/");
    return data;
  },

}