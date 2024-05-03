import moment from "moment";
import { Expense } from "../models/Expense";

export const getSortedExpenses = (expenses: Expense[]) => {
    const sortedExpenses = expenses.sort((a, b) => {
        return moment(b.date).diff(moment(a.date));
    });

    // Group expenses by date
    const groupedExpenses: { [key: string]: Expense[] } = {};
    sortedExpenses.forEach(expense => {
        const date = moment(expense.date).format("YYYY-MM-DD");
        if (!groupedExpenses[date]) {
            groupedExpenses[date] = [];
        }
        groupedExpenses[date].push(expense);
    });

    return groupedExpenses;
}

export const getCategories = () => {
    return [
        'Bike', 'Bills', 'Clothing', 'Education', 'Electronics', 'Entertainment', 'Food', 'Health', 'Home', 'Insurance',
        'Shopping', 'Social', 'Sport', 'Tax', 'Telephone', 'Transportation', 'Other'
    ]
}

export const getBackgroundColor = (category: string) => {
    let backgroundColor = '';

    switch (category) {
        case 'Bike':
            backgroundColor = '#cdb4db';
            break;
        case 'Bills':
            backgroundColor = '#023047';
            break;
        case 'Clothing':
            backgroundColor = '#f4a261';
            break;
        case 'Education':
            backgroundColor = '#003566';
            break;
        case 'Electronics':
            backgroundColor = '#2ec4b6';
            break;
        case 'Entertainment':
            backgroundColor = '#6a4c93';
            break;
        case 'Food':
            backgroundColor = '#fe6d73';
            break;
        case 'Health':
            backgroundColor = '#ff7b00';
            break;
        case 'Home':
            backgroundColor = '#ff477e';
            break;
        case 'Insurance':
            backgroundColor = '#ff9100';
            break;
        case 'Shopping':
            backgroundColor = '#00a8e8';
            break;
        case 'Social':
            backgroundColor = '#52b788';
            break;
        case 'Sport':
            backgroundColor = '#80ed99';
            break;
        case 'Tax':
            backgroundColor = '#e85d04';
            break;
        case 'Telephone':
            backgroundColor = '#90be6d';
            break;
        case 'Transportation':
            backgroundColor = '#023e8a';
            break;
        case 'Other':
            backgroundColor = '#ddb892';
            break;
        default:
            backgroundColor = '';
            break;
    }

    return backgroundColor;
}



