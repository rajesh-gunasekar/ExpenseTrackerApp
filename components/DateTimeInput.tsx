import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';


interface Props {
    date: Date;
    handleDateChange: (selectedDate: Date) => void;
}

const DateTimeInput: React.FC<Props> = ({ date, handleDateChange }) => {
    const [showPicker, setShowPicker] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setShowPicker(false);
        }
    }, [isFocused]);

    const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (event?.type === 'set') {
            handleDateChange(selectedDate || date);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Date</Text>

            <TouchableWithoutFeedback onPress={() => setShowPicker(!showPicker)}>
                <View style={styles.input_group}>
                    <Text style={styles.input}>{moment(date).format('MMM DD, YYYY, hh:mm A')}</Text>

                    {
                        showPicker ? (
                            <Ionicons name="chevron-up-outline" size={16} color="#A9A9A9" />
                        ) : (
                            <Ionicons name="chevron-down-outline" size={16} color="#A9A9A9" />
                        )
                    }
                </View>
            </TouchableWithoutFeedback>

            {
                showPicker && (
                    <DateTimePicker
                        mode={'datetime'}
                        value={date}
                        onChange={handleChange}
                    />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    header: {
        color: '#A9A9A9',
        fontWeight: '500',
        fontSize: 14,
        marginBottom: 10
    },
    input_group: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        borderStyle: "solid",
        borderColor: "#ccc",
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        flex: 1,
    }
})

export default DateTimeInput
