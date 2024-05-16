import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { setSelectedFilter } from '../redux/reducers/expenseReducer';

const FilterExpenses = () => {
    const { selectedFilter } = useSelector((state: RootState) => state.expenseReducer);
    const dispatch: AppDispatch = useDispatch();

    const filters = ["All", "Daily", "Weekly", "Monthly"];

    const updateFilter = (filter: any) => {
        dispatch(setSelectedFilter(filter));
    }

    return (
        <View style={styles.filterContainer}>
            <FlatList
                horizontal={true}
                data={filters}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.filter, { backgroundColor: selectedFilter === item ? "#274c77" : "#e7ecef" }]}
                        onPress={() => updateFilter(item)}
                    >
                        <Text style={[styles.filterText, { color: selectedFilter === item ? "#fff" : "#000" }]}>{item}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    filterContainer: {
        marginBottom: 10
    },
    filter: {
        backgroundColor: "#adb5bd",
        marginRight: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10
    },
    filterText: {
        fontWeight: "500"
    }
})

export default FilterExpenses
