import { configureStore } from "@reduxjs/toolkit";

import UiSlice from "./UiSlice";
import UserSlice from "./UserSlice";

const store = configureStore({
    reducer: {
        ui: UiSlice,
        user: UserSlice
    }
})

export default store