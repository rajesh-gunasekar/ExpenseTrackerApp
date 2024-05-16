import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

interface Props {
    name: string;
    placeholder: string;
    showSymbol: boolean;
    value: string;
    onChangeText: (text: string) => void;
    keyboardType?: KeyboardTypeOptions
}

const Input: React.FC<Props> = ({ name, placeholder, showSymbol, value, onChangeText, keyboardType }) => {
    return (
        <View style={styles.input_container}>
            <Text style={styles.header}>{name}</Text>
            <View style={styles.input_group}>
                {
                    showSymbol && <Text style={styles.symbol}>₹</Text>
                }
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input_container: {
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
    symbol: {
        marginRight: 5,
        color: '#A9A9A9'
    },
    input: {
    }
})

export default Input
