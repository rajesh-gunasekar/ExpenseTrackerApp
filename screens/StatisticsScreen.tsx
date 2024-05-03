import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getBackgroundColor } from '../utils/Helper';
import { useIsFocused } from '@react-navigation/native';
import CatergoryItem from '../components/CatergoryItem';

const StatisticsScreen = () => {
    const { expenses } = useSelector((state: RootState) => state.expenseReducer);
    const [categoryStats, setCategoryStats] = useState<{ category: string; totalExpense: number; percentage: number }[]>([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            calculateCategoryStats();
        }
    }, [isFocused]);

    const calculateCategoryStats = () => {
        const categoryTotal: { [key: string]: number } = {};

        expenses.forEach((expense) => {
            if (categoryTotal[expense.category]) {
                categoryTotal[expense.category] += expense.amount;
            } else {
                categoryTotal[expense.category] = expense.amount;
            }
        });

        const totalExpense = Object.values(categoryTotal).reduce((acc, curr) => acc + curr, 0);

        const stats = Object.entries(categoryTotal).map(([category, amount]) => ({
            category,
            totalExpense: amount,
            percentage: (amount / totalExpense) * 100
        }));

        setCategoryStats(stats);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <FlatList
                    data={categoryStats}
                    renderItem={CatergoryItem}
                    keyExtractor={(item) => item.category}
                    contentContainerStyle={{ padding: 20 }}
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
        padding: 10,

    },
})

export default StatisticsScreen
