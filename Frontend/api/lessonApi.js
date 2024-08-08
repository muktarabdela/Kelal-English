// utils/api.js
import { jwtDecode } from 'jwt-decode';
import instance from './axios';
export const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};


// create function to get user daily lesson
export const getDailyLesson = async (id) => {
    const token = getToken();
    try {
        const data = await instance.get(`/user/lesson/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return data;
    } catch (error) {
        console.log(error);
    }
};

// create function to get user interactive exercise
export const getInteractiveExercise = async (lessonId) => {
    const token = getToken();
    try {
        const data = await instance.get(`/user/interactive-exercise/${lessonId}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return data;
    } catch (error) {
        console.log(error);
    }
}