import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Expense } from "../../models/Expense";
import { BASE_URL, CATEGORIES_ENDPOINT, EXPENSES_ENDPOINT } from "../../models/Constants";

export const getExpenses = createAsyncThunk(
    'expense/get', async (userId: string, { rejectWithValue }) => {
        try {
            const GET_EXPENSES_URL = `${BASE_URL}${EXPENSES_ENDPOINT}?userId=${userId}`;
            const response = await axios.get(GET_EXPENSES_URL);
            const expenses: Expense[] = response?.data;

            return expenses;
        } catch (error) {
            return rejectWithValue('Getting Expenses Failed. Please try again later.');
        }
    }
)

export const postExpense = createAsyncThunk(
    'expense/post', async (expense: Expense, { rejectWithValue }) => {
        try {
            const POST_EXPENSE_URL = `${BASE_URL}${EXPENSES_ENDPOINT}`;
            const response = await axios.post(POST_EXPENSE_URL, expense);
            const savedExpense: Expense = response?.data;

            return savedExpense;
        } catch (error) {
            return rejectWithValue('Saving Expense Failed. Please try again later.');
        }
    }
)

export const putExpense = createAsyncThunk(
    'expense/put', async (expense: Expense, { rejectWithValue }) => {
        try {
            const PUT_EXPENSE_URL = `${BASE_URL}${EXPENSES_ENDPOINT}/${expense.id}`;
            const response = await axios.put(PUT_EXPENSE_URL, expense);
            const updatedExpense: Expense = response?.data;

            return updatedExpense;
        } catch (error) {
            return rejectWithValue('Saving Expense Failed. Please try again later.');
        }
    }
)

export const deleteExpense = createAsyncThunk(
    'expense/delete', async (id: string, { rejectWithValue }) => {
        try {
            const DELETE_EXPENSE_URL = `${BASE_URL}${EXPENSES_ENDPOINT}/${id}`;
            // console.log("URL,", DELETE_EXPENSE_URL);

            const response = await axios.delete(DELETE_EXPENSE_URL);
            // console.log("res:", response);

            const deletedExpense: Expense = response?.data;
            // console.log("deleted: ", deleteExpense);

            return id;
        } catch (error) {
            return rejectWithValue('Deleting Expense Failed. Please try again later.');
        }
    }
)

// export const getCategories = createAsyncThunk(
//     'categories/get', async (userId: string, { rejectWithValue }) => {
//         try {
//             const GET_CATEGORIES_URL = `${BASE_URL}${CATEGORIES_ENDPOINT}?userId=${userId}`;
//             const response = await axios.get(GET_CATEGORIES_URL);
//             const categories: Category[] = response?.data;

//             return categories;
//         } catch (error) {
//             return rejectWithValue('Getting Categories Failed. Please try again later.');
//         }
//     }
// )

// export const postCategory = createAsyncThunk(
//     'categories/post', async (category: Category, { rejectWithValue }) => {
//         try {
//             const POST_CATEGORY_URL = `${BASE_URL}${CATEGORIES_ENDPOINT}`;
//             const response = await axios.post(POST_CATEGORY_URL, category);
//             const savedCategory: Category = response?.data;

//             return savedCategory;
//         } catch (error) {
//             return rejectWithValue('Saving Category Failed. Please try again later.');
//         }
//     }
// )

// export const putCategory = createAsyncThunk(
//     'categories/put', async (category: Category, { rejectWithValue }) => {
//         try {
//             const PUT_CATEGORY_URL = `${BASE_URL}${CATEGORIES_ENDPOINT}/${category.id}`;
//             const response = await axios.put(PUT_CATEGORY_URL, category);
//             const updatedCategory: Category = response?.data;

//             return updatedCategory;
//         } catch (error) {
//             return rejectWithValue('Saving Category Failed. Please try again later.');
//         }
//     }
// )

// export const deleteCategory = createAsyncThunk(
//     'categories/delete', async (id: string, { rejectWithValue }) => {
//         try {
//             const DELETE_CATEGORY_URL = `${BASE_URL}${CATEGORIES_ENDPOINT}/${id}`;
//             const response = await axios.delete(DELETE_CATEGORY_URL);
//             const deletedCategory: Category = response?.data;

//             return deletedCategory.id;
//         } catch (error) {
//             return rejectWithValue('Deleting Category Failed. Please try again later.');
//         }
//     }
// )