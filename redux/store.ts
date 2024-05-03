import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import expenseReducer from "./reducers/expenseReducer";

const store = configureStore({
    reducer: {
        userReducer,
        expenseReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;