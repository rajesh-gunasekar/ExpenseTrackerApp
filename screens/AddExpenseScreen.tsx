import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Platform, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Input from '../components/Input';
import Category from '../components/Category';
import DateTimeInput from '../components/DateTimeInput';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { postExpense, putExpense } from '../redux/thunks/expenseThunk';
import { Expense } from '../models/Expense';
import { setError, setSelectedExpense } from '../redux/reducers/expenseReducer';
import { useIsFocused } from '@react-navigation/native';

const AddExpenseScreen = ({ navigation }: { navigation: any }) => {
    const [desc, setDesc] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Bike');
    const [date, setDate] = useState(new Date());
    const isFocused = useIsFocused();

    const { user } = useSelector((state: RootState) => state.userReducer);
    const { error, loading, selectedExpense } = useSelector((state: RootState) => state.expenseReducer);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (isFocused && selectedExpense) {
            setDesc(selectedExpense.desc);
            setAmount('' + selectedExpense.amount);
            setCategory(selectedExpense.category);
            setDate(new Date(selectedExpense.date));
        } else if (!isFocused && selectedExpense) {
            dispatch(setSelectedExpense(null));
        }

        if (!isFocused) {
            clearInputs();
        }
    }, [isFocused]);

    const handleDateChange = (selectedDate: Date) => {
        setDate(selectedDate);
    }

    const clearInputs = () => {
        setDesc('');
        setAmount('');
        setCategory('Bike');
        setDate((new Date()));
    }

    const handleSubmit = () => {
        if (desc.length < 3) {
            Alert.alert('Warning', 'Expense Title must be atleast 3 characters long!', [
                { text: 'OK', onPress: () => { } },
            ]);
            return;
        }
        const amountNumber = parseFloat(amount);
        if (isNaN(amountNumber) || amountNumber === 0) {
            Alert.alert('Warning', 'Invalid amount is entered!', [
                { text: 'OK', onPress: () => { } },
            ]);
            return;
        }
        if (category.length === 0) {
            Alert.alert('Warning', 'Category is not selected!', [
                { text: 'OK', onPress: () => { } },
            ]);
            return;
        }

        const dateString = date.toISOString();
        if (user !== null) {
            if (selectedExpense) {
                let updatedExpense: Expense = { ...selectedExpense, desc, amount: amountNumber, category, date: dateString };
                dispatch(putExpense(updatedExpense))
                    .then(() => {
                        clearInputs();
                        navigation.navigate('Home')
                    })
            } else {
                let newExpense: Expense = {
                    id: new Date().valueOf().toString(),
                    desc,
                    amount: amountNumber,
                    category,
                    date: dateString,
                    userId: user.id
                }
                dispatch(postExpense(newExpense))
                    .then(() => {
                        clearInputs();
                        navigation.navigate('Home');
                    });
            }
        }
    }

    if (error) {
        Alert.alert('Warning', error, [
            {
                text: 'OK', onPress: () => {
                    dispatch(setError(null));
                }
            },
        ]);
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView>
                    <View style={styles.innerContainer}>
                        <Input
                            name='Title'
                            placeholder='Add Expense Name'
                            showSymbol={false}
                            value={desc}
                            onChangeText={setDesc}
                            keyboardType='ascii-capable'
                        />
                        <Input
                            name='Amount'
                            placeholder='Add Expense Amount'
                            showSymbol={true}
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType='numeric'
                        />
                        <Category category={category} setCategory={setCategory} />
                        <DateTimeInput date={date} handleDateChange={handleDateChange} />

                        <TouchableOpacity disabled={loading} style={styles.btnContainer} onPress={handleSubmit}>
                            {
                                loading ? (
                                    <ActivityIndicator size="small" color="white" />
                                ) : (
                                    <Text style={styles.btn}>
                                        {selectedExpense ? 'Edit Expense' : 'Add Expense'}
                                    </Text>
                                )
                            }
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        padding: 20
    },
    btnContainer: {
        backgroundColor: "#274c77",
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: "center"
    },
    btn: {
        color: "#fff",
        fontSize: 14,
        textTransform: "uppercase"
    }
})

export default AddExpenseScreen
