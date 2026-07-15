import api from "@/lib/axios";

export const login = async (

    username: string,

    password: string

) => {

    const res = await api.post(
        "/auth/login",
        {
            username,
            password
        }
    );

    return res.data;

};


export const getProfile = async () => {

    const res = await api.get("/auth/profile");

    return res.data;

};

export const register = async (
    full_name: string,
    username: string,
    email: string,
    password: string
) => {

    const res = await api.post("/auth/register", {
        full_name,
        username,
        email,
        password,
    });

    return res.data;

};