import instance from "./axios";

export const register = async (formData) => {
    try {
        const response = await instance.post("/user/register", formData);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const login = async (data) => {
    try {
        const response = await instance.post("/user/login", data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}