import instance from "./axios";
const token = localStorage.getItem('token');


export const register = async (data) => {
    try {
        const response = await instance.post("/user/register", data);
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

// create api endpoint for user detail /user/detail/:id
export const getUserWithDetails = async (slug) => {
    try {
        const response = await instance.get(`/user/detail/${slug}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// create api endpoint for user detail progress //user/progress/:id'
export const getUserWithProgress = async (id) => {
    try {
        const response = await instance.get(`/user/progress/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}