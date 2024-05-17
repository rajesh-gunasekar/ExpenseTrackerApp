import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ChartData } from '../models/ChartData'

const StatisticsRow = ({ item, totalExpense }: { item: ChartData, totalExpense: number }) => {
    const percentage = ((item.amount / totalExpense) * 100).toFixed(1);

    return (
        <View style={styles.row}>
            <View style={styles.left}>
                <Text style={[styles.categoryColor, { backgroundColor: item.color }]}></Text>
                <Text style={styles.category}>{item.name}</Text>
            </View>
            <View style={styles.right}>
                <Text style={styles.amount}>₹{item.amount} - {percentage}%</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10
    },
    left: {
        flexDirection: "row",
        alignItems: "center"
    },
    categoryColor: {
        width: 10,
        height: 10,
        marginRight: 10
    },
    category: {
        fontSize: 14,
        fontWeight: '500'
    },
    right: {

    },
    amount: {
        fontSize: 14,
        fontWeight: 'bold'
    }
})

export default StatisticsRow
