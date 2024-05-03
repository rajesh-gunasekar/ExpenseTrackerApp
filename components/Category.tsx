import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getBackgroundColor, getCategories } from '../utils/Helper';

interface Props {
    category: string;
    setCategory: (text: string) => void;
}

const Category: React.FC<Props> = ({ category, setCategory }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Category</Text>
            <FlatList
                horizontal={true}
                data={getCategories()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.category, {
                            borderColor: getBackgroundColor(item),
                            backgroundColor: category === item ? getBackgroundColor(item) : 'transparent',
                        }]}
                        onPress={() => setCategory(item)}
                    >
                        <Text
                            style={[styles.categoryText, { color: category === item ? '#fff' : '#adb5bd' }]}
                        >{item}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
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
    category: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    categoryText: {
        color: '#adb5bd',
        fontWeight: '500'
    }
});

export default Category;
