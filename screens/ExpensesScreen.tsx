import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { getExpenses } from '../redux/thunks/expenseThunk'
import ExpenseGroup from '../components/ExpenseGroup'

const ExpensesScreen = ({ navigation }: { navigation: any }) => {
    const { user } = useSelector((state: RootState) => state.userReducer);
    const { loading, sortedExpenses } = useSelector((state: RootState) => state.expenseReducer);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(getExpenses(user.id));
        }
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
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
})

export default ExpensesScreen
