import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Ionicons } from '@expo/vector-icons';
import DateSelector from '../components/DateSelector';
import FilterExpenses from '../components/Filter';
import DonutChart from '../components/DonutChart';
import { getBackgroundColor } from '../utils/Helper';

interface ChartData {
    amount: number;
    color: string;
    name: string;
}

const StatisticsScreen = () => {
    const { selectedFilter } = useSelector((state: RootState) => state.expenseReducer);
    const { sortedExpenses } = useSelector((state: RootState) => state.expenseReducer);
    const [chartExpenses, setChartExpenses] = useState<ChartData[]>([]);

    useEffect(() => {
        const updatedExpenses = Object.keys(sortedExpenses).map(day => sortedExpenses[day]);
        const flatExpenses = updatedExpenses.flat();
        const categories: { [key: string]: { total: number, count: number } } = {};
        let totalExpenses = 0;
        flatExpenses.forEach((expense) => {
            if (categories[expense.category]) {
                let amount = categories[expense.category].total
                let count = categories[expense.category].count
                categories[expense.category] = { total: amount + expense.amount, count: count + 1 };
            } else {
                categories[expense.category] = { total: expense.amount, count: 1 };
            }
            totalExpenses += expense.amount;
        });
        let chartData = Object.keys(categories).map(category => {
            return {
                name: category,
                amount: categories[category].total,
                color: getBackgroundColor(category)
            }
        });

        setChartExpenses(chartData);
    }, [sortedExpenses]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {
                    selectedFilter !== "All" && <DateSelector />
                }
                <FilterExpenses />
                {
                    chartExpenses.length ? (
                        <DonutChart chartExpenses={chartExpenses} />
                    ) : (
                        <View style={styles.empty}>
                            <Ionicons name="file-tray" size={52} color="gray" />
                            <Text style={styles.emptyText}>You didn't have any expenses</Text>
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
        padding: 20,
    },
    empty: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    emptyText: {
        marginTop: 10,
        fontSize: 18,
        color: "gray"
    }
})

export default StatisticsScreen
