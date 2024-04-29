import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ExpensesScreen from './screens/ExpensesScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    let user = true;

    return (
        <NavigationContainer>
            {
                user ? <MainScreens /> : <AuthScreens />
            }
        </NavigationContainer>
    );
}

const AuthScreens = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    )
}

const MainScreens = () => {
    return (
        <Tab.Navigator
        >
            <Tab.Screen
                name="Home"
                component={ExpensesScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name="wallet"
                            size={size}
                            color={focused ? "#274c77" : "#e7ecef"}
                        />
                    ),
                    tabBarLabelStyle: { color: "#274c77" }
                }}
            />
            <Tab.Screen
                name="AddExpense"
                component={ExpensesScreen}
                options={{
                    tabBarLabel: 'Add Expense',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name="add-circle"
                            size={size}
                            color={focused ? "#274c77" : "#e7ecef"}
                        />
                    ),
                    tabBarLabelStyle: { color: "#274c77" }
                }}
            />
            <Tab.Screen
                name="AddCategory"
                component={ExpensesScreen}
                options={{
                    tabBarLabel: 'Add Category',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name="pricetag"
                            size={size}
                            color={focused ? "#274c77" : "#e7ecef"}
                        />
                    ),
                    tabBarLabelStyle: { color: "#274c77" }
                }}
            />
            <Tab.Screen
                name="Statistics"
                component={StatisticsScreen}
                options={{
                    tabBarLabel: 'Statistics',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name="pie-chart"
                            size={size}
                            color={focused ? "#274c77" : "#e7ecef"}
                        />
                    ),
                    tabBarLabelStyle: { color: "#274c77" }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name="person"
                            size={size}
                            color={focused ? "#274c77" : "#e7ecef"}
                        />
                    ),
                    tabBarLabelStyle: { color: "#274c77" }
                }}
            />
        </Tab.Navigator>
    )
}
