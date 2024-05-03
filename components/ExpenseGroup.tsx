import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Expense } from '../models/Expense';
import moment from 'moment';
import { getBackgroundColor } from '../utils/Helper';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { deleteExpense } from '../redux/thunks/expenseThunk';
import { setSelectedExpense } from '../redux/reducers/expenseReducer';

interface Props {
    header: string;
    expenses: Expense[],
    navigation: any;
}

const ExpenseGroup: React.FC<Props> = ({ header, expenses, navigation }) => {
    const dispatch: AppDispatch = useDispatch()

    const editHandler = (expense: Expense) => {
        dispatch(setSelectedExpense(expense))
        navigation.navigate('AddExpense');
    }

    const deleteHandler = (expense: Expense) => {
        Alert.alert('Alert', `Are you sure want to delete the expense`, [
            { text: 'Cancel', onPress: () => { } },
            {
                text: 'Yes', onPress: () => {
                    dispatch(deleteExpense(expense.id));
                }
            },
        ]);
    }

    return (
        <View style={styles.group_container}>
            <Text style={styles.header}>{moment(header).format('MMM DD, YYYY')}</Text>

            <FlatList
                data={expenses}
                renderItem={({ item }) => (
                    <View style={styles.expense}>
                        <View style={styles.left}>
                            <Text style={styles.desc}>{item.desc}</Text>
                            <Text style={[styles.category, {
                                color: getBackgroundColor(item.category),
                            }]}>{item.category}</Text>
                            <View style={styles.action}>
                                <Text
                                    onPress={() => editHandler(item)}
                                    style={styles.edit}
                                >Edit</Text>
                                <Text
                                    onPress={() => deleteHandler(item)}
                                    style={styles.delete}
                                >Delete</Text>
                            </View>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.amount}>₹ {item.amount}</Text>
                            <Text style={styles.time}>{moment(item.date).format('h:mm A')}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    group_container: {
        marginBottom: 15
    },
    header: {
        color: '#A9A9A9',
        fontWeight: '600',
        fontSize: 14,
        marginBottom: 15
    },
    expense: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    left: {

    },
    right: {

    },
    desc: {
        fontSize: 12,
        marginBottom: 5,
        fontWeight: '500'
    },
    category: {
        fontSize: 10,
        marginBottom: 5,
        color: "#fff",
        fontWeight: "bold"
    },
    action: {
        flexDirection: 'row'
    },
    edit: {
        fontSize: 9,
        color: '#ff9f1c',
        marginRight: 10
    },
    delete: {
        fontSize: 9,
        color: '#dd2d4a'
    },
    amount: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'right',
        marginBottom: 5
    },
    time: {
        color: '#A9A9A9',
        fontSize: 11
    }
})

export default ExpenseGroup
