import { FlatList, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Ionicons } from '@expo/vector-icons';
import DateSelector from '../components/DateSelector';
import FilterExpenses from '../components/Filter';
import DonutChart from '../components/DonutChart';
import { getBackgroundColor } from '../utils/Helper';
import { ChartData } from '../models/ChartData';
import StatisticsRow from '../components/StatisticsRow';
import { Expense } from '../models/Expense';
import ExpenseCategory from '../components/ExpenseCategory';


const StatisticsScreen = () => {
    const { selectedFilter } = useSelector((state: RootState) => state.expenseReducer);
    const { sortedExpenses } = useSelector((state: RootState) => state.expenseReducer);
    const [chartExpenses, setChartExpenses] = useState<ChartData[]>([]);
    const [catExpenses, setCatExpenses] = useState<Expense[]>([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

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
        setTotalExpense(totalExpenses);
    }, [sortedExpenses]);

    const statiscticsRowClickHandler = (category: string) => {
        const updatedExpenses = Object.keys(sortedExpenses).map(day => sortedExpenses[day]);
        const flatExpenses = updatedExpenses.flat();
        const categoryExpenses = flatExpenses.filter(expense => expense.category === category);
        setCatExpenses(categoryExpenses);
        toggleShowModal(true);
    }

    const toggleShowModal = (show: boolean) => setIsVisible(!isVisible);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {
                    selectedFilter !== "All" && <DateSelector />
                }
                <FilterExpenses />
                {
                    chartExpenses.length ? (
                        <View style={styles.chartContainer}>
                            <View style={styles.chart}>
                                <DonutChart chartExpenses={chartExpenses} />
                            </View>
                            <View style={styles.chartContent}>
                                <Text style={styles.summary}>Summary</Text>
                                {
                                    <FlatList
                                        data={chartExpenses}
                                        renderItem={({ item }) => {
                                            return (
                                                <TouchableOpacity onPress={() => statiscticsRowClickHandler(item.name)}>
                                                    <StatisticsRow item={item} totalExpense={totalExpense} />
                                                </TouchableOpacity>
                                            )
                                        }}
                                        keyExtractor={item => item.name}
                                    />
                                }
                            </View>
                        </View>
                    ) : (
                        <View style={styles.empty}>
                            <Ionicons name="file-tray" size={52} color="gray" />
                            <Text style={styles.emptyText}>You didn't have any expenses</Text>
                        </View>
                    )
                }
                <Modal animationType='slide' visible={isVisible} presentationStyle='pageSheet'>
                    <ExpenseCategory expenses={catExpenses} toggleShowModal={toggleShowModal} />
                </Modal>
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
    chartContainer: {
        position: "relative",
    },
    chart: {
        position: "absolute",
        left: "50%",
        transform: [{ translateX: -100 }]
    },
    chartContent: {
        marginTop: 200,
    },
    summary: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: '500',
        color: '#274c77'
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
