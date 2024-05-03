import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../models/User";
import { BASE_URL, USER_ENDPOINT, USERS_ENDPOINT } from "../../models/Constants";

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
}

export const loginUser = createAsyncThunk(
    'user/login', async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const GET_USERS_URL = `${BASE_URL}${USERS_ENDPOINT}?email=${credentials.email}`;
            const response = await axios.get(GET_USERS_URL);

            if (!response || !Array.isArray(response.data) || response.data.length === 0) {
                return rejectWithValue('Invalid email or password');
            }

            const users: User[] = response.data;
            const user = users[0];
            if (user.password !== credentials.password) {
                return rejectWithValue('Invalid email or password');
            }

            const POST_USER_URL = BASE_URL + USER_ENDPOINT;
            await axios.post(POST_USER_URL, user);
            return user;
        } catch (error) {
            console.error('Login failed:', error);
            return rejectWithValue('Login failed. Please try again later.');
        }
    }
)

export const registerUser = createAsyncThunk(
    'user/register', async (credentials: RegisterCredentials, { rejectWithValue }) => {
        try {
            let userExist = await isUserExist(credentials.email);
            if (userExist) {
                return rejectWithValue('User already exist');
            }

            const POST_USERS_URL = `${BASE_URL}${USERS_ENDPOINT}`;
            const response = await axios.post(POST_USERS_URL, credentials);
            const user: User = response?.data;
            const POST_USER_URL = BASE_URL + USER_ENDPOINT;
            await axios.post(POST_USER_URL, user);
            return user;
        } catch (error) {
            console.error('Register failed:', error);
            return rejectWithValue('Register failed. Please try again later.');
        }
    }
)

export const getUser = createAsyncThunk(
    'user/get', async (data: null, { rejectWithValue }) => {
        try {
            let GET_USER_URL = `${BASE_URL}${USER_ENDPOINT}`;
            let response = await axios.get(GET_USER_URL);

            let users: User[] = response?.data;

            return users?.at(0);
        } catch (error) {
            return rejectWithValue('Get user details failed. Please try again later.')
        }
    }
)

export const logoutUser = createAsyncThunk(
    'user/logout', async (id: string, { rejectWithValue }) => {
        try {
            let DELETE_USER_URL = `${BASE_URL}${USER_ENDPOINT}/${id}`;
            let response = await axios.delete(DELETE_USER_URL);
            let user: User = response?.data;

            return user;
        } catch (error) {
            return rejectWithValue('Logout failed. Please try again later.');
        }
    }
)

const isUserExist = async (email: string) => {
    try {
        const URL = `${BASE_URL}${USERS_ENDPOINT}?email=${email}`;
        const response: any = await axios.get(URL);
        const users: User[] = response?.data;

        if (users?.length === 0) {
            return false;
        }
        return true;
    } catch (error: any) {
        return true;
    }
}
