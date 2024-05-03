import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { logoutUser } from '../redux/thunks/userThunk';

const ProfileScreen = () => {
    const { user } = useSelector((state: RootState) => state.userReducer);
    const dispatch: AppDispatch = useDispatch();

    const logoutHandler = () => {
        if (user) {
            dispatch(logoutUser(user.id))
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Ionicons style={styles.profileIcon} name="person-circle-sharp" size={100} color="#274c77" />

                <View style={styles.input_group}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons style={styles.icon} name="person" size={18} color="gray" />
                        <Text style={styles.title}>{user?.username}</Text>
                    </View>
                    <Text style={{ color: "#274c77" }}>Username</Text>
                </View>

                <View style={styles.input_group}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons style={styles.icon} name="mail" size={18} color="gray" />
                        <Text style={styles.title}>{user?.email}</Text>
                    </View>
                    <Text style={{ color: "#274c77" }}>Email</Text>
                </View>

                <TouchableOpacity onPress={logoutHandler}>
                    <Text style={styles.btn}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        padding: 20,

    },
    profileIcon: {
        alignSelf: "center",
        marginBottom: 25
    },
    input_group: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 15
    },
    icon: {
        marginRight: 10
    },
    title: {
        color: "gray",
        fontSize: 18
    },
    btn: {
        marginTop: 50,
        textAlign: "center",
        color: "#ef233c",
        fontSize: 18
    }
})

export default ProfileScreen
