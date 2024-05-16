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

export const filterExpenses = (expenses: Expense[], filter: string, dateString: string) => {
    const date = moment(dateString);
    const startOfTheWeek = moment(date).clone().startOf('week').format('YYYY-MM-DD');
    const endOfTheWeek = moment(date).clone().endOf('week').format('YYYY-MM-DD');
    const startOfMonth = moment(date).clone().startOf('month');
    const endOfMonth = moment(date).clone().endOf('month');

    let filteredExpenses: Expense[] = [];
    switch (filter) {
        case "All":
            filteredExpenses = expenses;
            break;
        case "Daily":
            filteredExpenses = expenses.filter(expense => moment(expense.date).isSame(dateString, 'day'));
            break;
        case "Weekly":
            filteredExpenses = expenses.filter(expense => moment(expense.date).isBetween(startOfTheWeek, endOfTheWeek, null, "[]"))
            break;
        case "Monthly":
            filteredExpenses = expenses.filter(expense => moment(expense.date).isBetween(startOfMonth, endOfMonth, null, "[]"))
            break;
    }

    return filteredExpenses;
}

export const getCategories = () => {
    const categories = [
        { category: 'Bike', color: '#cdb4db' },
        { category: 'Bills', color: '#023047' },
        { category: 'Clothing', color: '#f4a261' },
        { category: 'Education', color: '#003566' },
        { category: 'Electronics', color: '#2ec4b6' },
        { category: 'Entertainment', color: '#6a4c93' },
        { category: 'Food', color: '#fe6d73' },
        { category: 'Health', color: '#ff7b00' },
        { category: 'Home', color: '#ff477e' },
        { category: 'Insurance', color: '#ff9100' },
        { category: 'Shopping', color: '#00a8e8' },
        { category: 'Social', color: '#52b788' },
        { category: 'Sport', color: '#80ed99' },
        { category: 'Tax', color: '#e85d04' },
        { category: 'Telephone', color: '#90be6d' },
        { category: 'Transportation', color: '#023e8a' },
        { category: 'Other', color: '#ddb892' }
    ];

    return categories
}

export const getBackgroundColor = (category: string) => {
    let backgroundColor = '';

    let cat = getCategories().find(cat => cat.category === category)
    if (cat) {
        backgroundColor = cat.color
    }

    // switch (category) {
    //     case 'Bike':
    //         backgroundColor = '#cdb4db';
    //         break;
    //     case 'Bills':
    //         backgroundColor = '#023047';
    //         break;
    //     case 'Clothing':
    //         backgroundColor = '#f4a261';
    //         break;
    //     case 'Education':
    //         backgroundColor = '#003566';
    //         break;
    //     case 'Electronics':
    //         backgroundColor = '#2ec4b6';
    //         break;
    //     case 'Entertainment':
    //         backgroundColor = '#6a4c93';
    //         break;
    //     case 'Food':
    //         backgroundColor = '#fe6d73';
    //         break;
    //     case 'Health':
    //         backgroundColor = '#ff7b00';
    //         break;
    //     case 'Home':
    //         backgroundColor = '#ff477e';
    //         break;
    //     case 'Insurance':
    //         backgroundColor = '#ff9100';
    //         break;
    //     case 'Shopping':
    //         backgroundColor = '#00a8e8';
    //         break;
    //     case 'Social':
    //         backgroundColor = '#52b788';
    //         break;
    //     case 'Sport':
    //         backgroundColor = '#80ed99';
    //         break;
    //     case 'Tax':
    //         backgroundColor = '#e85d04';
    //         break;
    //     case 'Telephone':
    //         backgroundColor = '#90be6d';
    //         break;
    //     case 'Transportation':
    //         backgroundColor = '#023e8a';
    //         break;
    //     case 'Other':
    //         backgroundColor = '#ddb892';
    //         break;
    //     default:
    //         backgroundColor = '';
    //         break;
    // }

    return backgroundColor;
}



