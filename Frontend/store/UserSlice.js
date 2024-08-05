import { getUserWithDetails, getUserWithProgress } from "@/api/userApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// function to get user detail data
export const fetchUserData = createAsyncThunk('user/fetchData', async (slug) => {
    const response = await getUserWithDetails(slug);
    // console.log("fetched user data", response);
    return response;
});

// function to get user detail progress
export const fetchUserProgress = createAsyncThunk('user/fetchProgress', async (slug) => {
    // console.log("fetched user progress", slug);
    const response = await getUserWithProgress(slug);
    // console.log("fetched user progress", response);
    return response;
});

const initialState = {
    userData: null,
    userProgressData: null,
    userDataLoading: false,
    userProgressDataLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setUserProgressData: (state, action) => {
            state.userProgressData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchUserData
            .addCase(fetchUserData.pending, (state) => {
                state.userDataLoading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.userData = action.payload;
                state.userDataLoading = false;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.userDataLoading = false;
                state.error = action.error.message;
            })
            // Handle fetchUserProgress
            .addCase(fetchUserProgress.pending, (state) => {
                state.userProgressDataLoading = true;
                state.error = null;
            })
            .addCase(fetchUserProgress.fulfilled, (state, action) => {
                state.userProgressData = action.payload;
                state.userProgressDataLoading = false;
            })
            .addCase(fetchUserProgress.rejected, (state, action) => {
                state.userProgressDataLoading = false;
                state.error = action.error.message;
            });
    }
});

export const { setUserData, setUserProgressData } = userSlice.actions;
export default userSlice.reducer;
