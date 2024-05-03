import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { loginUser, registerUser } from '../redux/thunks/userThunk';
import { setError } from '../redux/reducers/userReducer';

interface Props {
    navigation: any
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const nav = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { error, loading } = useSelector((state: RootState) => state.userReducer);
    const dispatch: AppDispatch = useDispatch();

    useLayoutEffect(() => {
        nav.setOptions({
            headerShown: false
        })
    }, []);

    const handleNavigation = () => {
        navigation.navigate("Register");
    }

    const handleLogin = () => {
        const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z\-]+\.)+[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Warning', 'Invalid Email Address!', [
                { text: 'OK', onPress: () => { } },
            ]);
            return;
        }
        if (password.length < 6) {
            Alert.alert('Warning', 'Password should be atleast 6 characters long!', [
                { text: 'OK', onPress: () => { } },
            ]);
            return;
        }
        dispatch(loginUser({ email, password }))
    }

    if (error) {
        Alert.alert('Warning', error, [
            {
                text: 'OK', onPress: () => {
                    dispatch(setError(null));
                }
            },
        ]);
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Image
                        source={require('../assets/auth_logo.jpg')}
                        style={styles.logo}
                    />

                    <View style={styles.content}>
                        <Text style={styles.header}>Welcome Back</Text>
                        <Text style={styles.title}>Login to Continue</Text>

                        <View style={styles.input_group}>
                            <Ionicons style={styles.icon} name="mail" size={24} color="gray" />
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder='Email'
                            />
                        </View>

                        <View style={styles.input_group}>
                            <Ionicons
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.icon}
                                name={showPassword ? "eye" : "eye-off"}
                                size={24}
                                color="gray"
                            />
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                placeholder='Password'
                                secureTextEntry={!showPassword}
                            />
                        </View>

                        <TouchableOpacity style={styles.btnContainer} onPress={handleLogin}>
                            <Text style={styles.btn}>Login</Text>
                        </TouchableOpacity>

                        <Text>New to Wallet? <Text onPress={handleNavigation} style={styles.link}>Register</Text></Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    scrollView: {
        flexGrow: 1,
    },
    logo: {
        width: "100%",
        height: 250
    },
    content: {
        marginTop: 50,
        paddingHorizontal: 20
    },
    header: {
        fontSize: 28,
        textAlign: "center",
        fontWeight: "600",
        marginBottom: 20,
        color: "#00509d"
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500',
        marginBottom: 20
    },
    input_group: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        width: "100%"
    },
    icon: {
        marginRight: 10
    },
    input: {
        width: "100%"
    },
    btnContainer: {
        backgroundColor: "#00509d",
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: "center",
        marginBottom: 20
    },
    btn: {
        color: "#fff",
        textTransform: "uppercase",
        letterSpacing: 2,
        fontSize: 16
    },
    link: {
        fontStyle: "italic",
        color: "#00509d",
        textDecorationLine: "underline"
    }
})

export default LoginScreen
