import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showRegister: true,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleAuthForm(state) {
            state.showRegister = !state.showRegister;
        }
    }
});

export const { toggleAuthForm } = uiSlice.actions;
export default uiSlice.reducer;
