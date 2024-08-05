// utils/api.js
import { jwtDecode } from 'jwt-decode';
import instance from './axios';

export const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

export const register = async (data) => {
    try {
        const response = await instance.post('/user/register', data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const login = async (data) => {
    try {
        const response = await instance.post('/user/login', data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getUserWithDetails = async (slug) => {
    const token = getToken();
    try {
        const response = await instance.get(`/user/detail/${slug}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getUserWithProgress = async (id) => {
    const token = getToken();
    try {
        const response = await instance.get(`/user/progress/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
