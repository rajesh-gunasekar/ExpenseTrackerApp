import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { AppDispatch, RootState } from '../redux/store'
import { getExpenses } from '../redux/thunks/expenseThunk'
import ExpenseGroup from '../components/ExpenseGroup'
import { setQuery } from '../redux/reducers/expenseReducer';
import { useIsFocused } from '@react-navigation/native';
import FilterExpenses from '../components/Filter';
import DateSelector from '../components/DateSelector';

const ExpensesScreen = ({ navigation }: { navigation: any }) => {
    const { user } = useSelector((state: RootState) => state.userReducer);
    const { loading, sortedExpenses, selectedFilter, query } = useSelector((state: RootState) => state.expenseReducer);
    const isFocused = useIsFocused();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(getExpenses(user.id));
        }
    }, []);

    useEffect(() => {
        if (isFocused) {
            clearSearchText();
        }
    }, [isFocused]);

    const handleTextChange = (e: any) => {
        dispatch(setQuery(e));
    }

    const clearSearchText = () => {
        handleTextChange('');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {
                    selectedFilter !== "All" && <DateSelector />
                }
                <FilterExpenses />
                <View style={styles.search}>
                    <TextInput
                        value={query}
                        onChangeText={(e) => { handleTextChange(e) }}
                        placeholder='Search by Expense or Category'

                        autoCapitalize='none'
                    />
                    {
                        query.length !== 0 && <Ionicons onPress={clearSearchText} name="close-sharp" size={14} color="lightgray" />
                    }
                </View>
                {
                    Object.keys(sortedExpenses).length ? (
                        <FlatList
                            data={Object.keys(sortedExpenses)}
                            renderItem={({ item }) => (
                                <ExpenseGroup
                                    navigation={navigation}
                                    header={item}
                                    expenses={sortedExpenses[item]}
                                />
                            )}
                            keyExtractor={item => item}
                        />
                    ) : (
                        <View style={styles.empty}>
                            <Ionicons name="file-tray" size={52} color="gray" />
                            <Text style={styles.emptyText}>
                                {
                                    query ? "No Expense or Category is found" : "You didn't have any expenses"
                                }
                            </Text>
                        </View>
                    )
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        padding: 20
    },
    search: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    empty: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        marginTop: 10,
        fontSize: 18,
        color: "gray"
    }
})

export default ExpensesScreen
