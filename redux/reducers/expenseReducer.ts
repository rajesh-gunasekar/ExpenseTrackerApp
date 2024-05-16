import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expense } from '../../models/Expense';
import { deleteExpense, getExpenses, postExpense, putExpense } from '../thunks/expenseThunk';
import { filterExpenses, getSortedExpenses } from '../../utils/Helper';
import moment from 'moment';

interface ExpenseState {
    expenses: Expense[];
    sortedExpenses: { [key: string]: Expense[] };
    selectedExpense: Expense | null;
    selectedFilter: string;
    date: string;
    query: string;
    loading: boolean;
    error: string | null;
}

const initialState: ExpenseState = {
    expenses: [],
    sortedExpenses: {},
    selectedExpense: null,
    selectedFilter: "All",
    date: moment().format(),
    query: "",
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
        },
        setSelectedFilter(state, action: PayloadAction<string>) {
            state.selectedFilter = action.payload;
            updateSortedExpenses(state);
        },
        setDate(state, action: PayloadAction<string>) {
            state.date = action.payload;
            updateSortedExpenses(state);
        },
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
            updateSortedExpenses(state);
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
                updateSortedExpenses(state);
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
                updateSortedExpenses(state);
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
                updateSortedExpenses(state);
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
                state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
                updateSortedExpenses(state);
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

const updateSortedExpenses = (state: ExpenseState) => {
    let queryExpenses = state.expenses;
    if (state.query) {
        let search = state.query.toLowerCase();
        queryExpenses = state.expenses.filter(expense => {
            return expense.desc.toLowerCase().includes(search) || expense.category.toLowerCase().includes(search);
        })
    }
    let filteredExpenses = filterExpenses(queryExpenses, state.selectedFilter, state.date);
    state.sortedExpenses = getSortedExpenses(filteredExpenses)
}

export const {
    setError,
    setSelectedExpense,
    setSelectedFilter,
    setDate,
    setQuery
} = expenseSlice.actions;
export default expenseSlice.reducer;