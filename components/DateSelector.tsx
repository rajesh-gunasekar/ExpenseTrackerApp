import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { setDate } from '../redux/reducers/expenseReducer';

const DateSelector = () => {
    const { selectedFilter, date } = useSelector((state: RootState) => state.expenseReducer);
    const dispatch: AppDispatch = useDispatch();
    const startOfTheWeek = moment(date).clone().startOf('week');
    const endOfTheWeek = moment(date).clone().endOf('week');

    const getDateLabel = () => {
        switch (selectedFilter) {
            case "Daily":
                return moment(date).format("MMMM D, YYYY");
            case "Weekly":
                return `${startOfTheWeek.format("MMM D")} - ${endOfTheWeek.format("MMM D")}`;
            case "Monthly":
                return moment(date).format("MMMM, YYYY");
            default:
                return "";
        }
    }

    const handlePrev = () => {
        let newDate: moment.Moment;
        switch (selectedFilter) {
            case "Daily":
                newDate = moment(date).clone().subtract(1, 'day');
                break;
            case "Weekly":
                newDate = moment(date).clone().subtract(1, 'week');
                break;
            case "Monthly":
                newDate = moment(date).clone().subtract(1, 'month');
                break;
            default:
                newDate = moment();
                break;
        }
        dispatch(setDate(newDate.format()));
    }

    const handleNext = () => {
        let newDate: moment.Moment;
        switch (selectedFilter) {
            case "Daily":
                newDate = moment(date).clone().add(1, 'day');
                break;
            case "Weekly":
                newDate = moment(date).clone().add(1, 'week');
                break;
            case "Monthly":
                newDate = moment(date).clone().add(1, 'month');
                break;
            default:
                newDate = moment();
                break;
        }
        dispatch(setDate(newDate.format()));
    }

    return (
        <View style={styles.selectorContainer}>
            <Ionicons
                name="chevron-back-sharp"
                size={16}
                color="#A9A9A9"
                onPress={handlePrev} />
            <Text style={styles.date}>
                {getDateLabel()}
            </Text>
            <Ionicons
                name="chevron-forward-sharp"
                size={16}
                color="#A9A9A9"
                onPress={handleNext} />
        </View>
    )
}

const styles = StyleSheet.create({
    selectorContainer: {
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    date: {
        color: "#274c77",
        fontWeight: "500"
    }
})

export default DateSelector
