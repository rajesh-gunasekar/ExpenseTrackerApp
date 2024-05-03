import { StyleSheet, Text, TextInput, View } from 'react-native'
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

            <View style={styles.input_group}>
                <TextInput
                    value={moment(date).format('MMM DD, YYYY, hh:mm A')}
                    placeholder='Select the Date'
                    editable={false}
                    style={styles.input}
                />

                <Ionicons onPress={() => setShowPicker(!showPicker)} name="chevron-down-outline" size={16} color="#A9A9A9" />
            </View>

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
        flexDirection: "row"
    },
    input: {
        flex: 1
    }
})

export default DateTimeInput
