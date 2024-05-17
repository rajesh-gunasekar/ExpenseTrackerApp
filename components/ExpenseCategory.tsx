import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Expense } from '../models/Expense'
import { getBackgroundColor } from '../utils/Helper'
import moment from 'moment'

const ExpenseCategory = ({ expenses, toggleShowModal }: { expenses: Expense[], toggleShowModal: Function }) => {
    const category = expenses[0].category
    const totalExpenses = expenses.reduce((a, b) => a + b.amount, 0)

    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => toggleShowModal(false)}>
                    <Text style={styles.closeBtn}>Close</Text>
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.catTitle}>Category Details</Text>
                    <Text style={[styles.catSubTitle, { color: getBackgroundColor(category) }]}>{category}</Text>
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.catHeader}>
                    <Text style={styles.catTitle}>Records</Text>
                    <Text style={styles.catTitle}>₹ {totalExpenses}</Text>
                </View>
                <FlatList
                    data={expenses}
                    renderItem={({ item }) => (
                        <View style={styles.record}>
                            <Text>{moment(item.date).format('MMM DD, YYYY h:mm A')}</Text>
                            <Text>₹ {item.amount}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 70,
        backgroundColor: "#f2f2f2",
        borderBottomColor: "#dee2e6",
        borderBottomWidth: 1,
        flexDirection: "row",
        borderStyle: "solid",
        alignItems: "center",
        padding: 20,
    },
    closeBtn: {
        color: "#274c77",
        marginRight: 20
    },
    headerContent: {
    },
    catTitle: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 5
    },
    catSubTitle: {
        fontSize: 16,
        fontWeight: "500"
    },
    content: {
        padding: 20
    },
    catHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomColor: "#dee2e6",
        borderBottomWidth: 1,
        borderStyle: "solid",
    },
    record: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
    }
})

export default ExpenseCategory
