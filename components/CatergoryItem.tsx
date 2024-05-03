import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getBackgroundColor } from '../utils/Helper';

const CatergoryItem = ({ item }: { item: { category: string; totalExpense: number; percentage: number } }) => {
    return (
        <View style={styles.categoryItem}>
            <View style={styles.left}>
                <View style={styles.row}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                    <Text style={styles.totalExpenseText}>₹{item.totalExpense.toFixed(2)}</Text>
                </View>
                <View style={[styles.progressBar, { borderColor: getBackgroundColor(item.category) }]}>
                    <View style={{ width: `${item.percentage}%`, height: 10, backgroundColor: getBackgroundColor(item.category) }}></View>
                </View>
            </View>
            <View style={styles.right}>
                <Text style={styles.percentageText}>{item.percentage.toFixed(2)}%</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    categoryItem: {
        marginBottom: 30,
        flexDirection: "row",
        alignItems: "center"
    },
    left: {
        width: "80%"
    },
    right: {
        width: "20%"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    categoryText: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
    },
    totalExpenseText: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
    },
    progressBar: {
        height: 10,
        width: '100%',
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 5,
        overflow: 'hidden',
    },
    percentageText: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "right"
    },
})

export default CatergoryItem
