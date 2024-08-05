import { createSlice } from "@reduxjs/toolkit";

const loadState = (key, defaultValue) => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
    }
    return defaultValue;
};

const saveState = (key, state) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(state));
    }
};

const removeState = (key) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

const initialState = {
    showRegister: true,
    isAuthenticated: loadState('isAuthenticated', false),
    isSubscribed: '',
    user: [],
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleAuthForm(state) {
            state.showRegister = !state.showRegister;
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
            saveState('isAuthenticated', state.isAuthenticated);
        },
        setIsSubscribed: (state, action) => {
            state.isSubscribed = action.payload;
            // saveState('isSubscribed', state.isSubscribed);
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    }
});

export const { toggleAuthForm, setIsAuthenticated, setIsSubscribed, setUser } = uiSlice.actions;
export default uiSlice.reducer;
