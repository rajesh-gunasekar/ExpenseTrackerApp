import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/User";
import { getUser, loginUser, logoutUser, registerUser } from "../thunks/userThunk";

interface UserState {
    user: User | null,
    loading: boolean,
    error: string | null
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setError(state, action: PayloadAction<null>) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.error = "Login Failed. Please try again later!";
                }
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.error = "Register Failed. Please try again later!";
                }
            })
            .addCase(getUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.user = action.payload;
                } else {
                    state.user = null;
                }
                state.error = null;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = null;
            })

            .addCase(logoutUser.fulfilled, (state, action) => {
                state.user = null;
            })
    }
})

export const {
    setError
} = userSlice.actions;
export default userSlice.reducer;