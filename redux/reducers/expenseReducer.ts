import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expense } from '../../models/Expense';
import { deleteExpense, getExpenses, postExpense, putExpense } from '../thunks/expenseThunk';
import { getSortedExpenses } from '../../utils/Helper';

interface ExpenseState {
    expenses: Expense[];
    sortedExpenses: { [key: string]: Expense[] };
    selectedExpense: Expense | null;
    loading: boolean;
    error: string | null;
}

const initialState: ExpenseState = {
    expenses: [],
    sortedExpenses: {},
    selectedExpense: null,
    loading: false,
    error: null
}

const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        setError(state, action: PayloadAction<null>) {
            state.error = null;
        },
        setSelectedExpense(state, action: PayloadAction<Expense | null>) {
            state.selectedExpense = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getExpenses.pending, (state) => {
                state.loading = true;
            })
            .addCase(getExpenses.fulfilled, (state, action) => {
                state.loading = false;
                state.expenses = action.payload;
                state.sortedExpenses = getSortedExpenses(action.payload);
                state.error = null;
            })
            .addCase(getExpenses.rejected, (state, action) => {
                state.loading = false;
                state.expenses = [];
                state.sortedExpenses = {};
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.error = "An Error Occured.";
                }
            })
            .addCase(postExpense.pending, (state) => {
                state.loading = true;
            })
            .addCase(postExpense.fulfilled, (state, action) => {
                state.loading = false;
                state.expenses.push(action.payload);
                state.sortedExpenses = getSortedExpenses(state.expenses);
                state.error = null;
            })
            .addCase(postExpense.rejected, (state, action) => {
                state.loading = false;
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.error = "An Error Occured.";
                }
            })
            .addCase(putExpense.pending, (state) => {
                state.loading = true;
            })
            .addCase(putExpense.fulfilled, (state, action) => {
                state.loading = false;
                state.expenses = state.expenses.map(expense => {
                    if (expense.id == action.payload.id) {
                        return action.payload;
                    }
                    return expense;
                })
                state.sortedExpenses = getSortedExpenses(state.expenses);
                state.error = null;
            })
            .addCase(putExpense.rejected, (state, action) => {
                state.loading = false;
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.error = "An Error Occured.";
                }
            })
            .addCase(deleteExpense.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteExpense.fulfilled, (state, action) => {
                state.loading = false;
                // console.log(action.payload);

                state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
                // console.log(state.expenses);

                state.sortedExpenses = getSortedExpenses(state.expenses);
                // console.log(state.sortedExpenses);

                state.error = null;
            })
            .addCase(deleteExpense.rejected, (state, action) => {
                state.loading = false;
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.error = "An Error Occured.";
                }
            })
    },
})

export const {
    setError,
    setSelectedExpense
} = expenseSlice.actions;
export default expenseSlice.reducer;