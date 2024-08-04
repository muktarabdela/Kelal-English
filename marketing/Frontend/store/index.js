import { configureStore } from "@reduxjs/toolkit";

import UiSlice from "./UiSlice";

const store = configureStore({
    reducer: {
        ui: UiSlice
    }
})

export default store