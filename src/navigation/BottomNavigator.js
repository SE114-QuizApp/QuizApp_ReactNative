import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/app/Home/Home';
import Discover from '../screens/app/Discover/Discover';
import LeaderBoard from '../screens/app/LeaderBoard/LeaderBoard';
import Profile from '../screens/app/Profile/Profile';

import { View } from 'react-native';
import { Path } from 'react-native-svg';

import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import CreatorNavigator from './CreatorNavigator';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, size, color }) => {
                    // console.log(route.name);
                    switch (route.name) {
                        case 'Home':
                            return (
                                <View>
                                    <Entypo
                                        name="home"
                                        size={focused ? 28 : 24}
                                        color={focused ? '#865DFF' : 'gray'}
                                    />
                                    <Path
                                        fill="#604AE6"
                                        d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
                                    />
                                </View>
                            );

                        case 'Discover':
                            return (
                                <View>
                                    <Entypo
                                        name="magnifying-glass"
                                        size={focused ? 28 : 24}
                                        color={focused ? '#865DFF' : 'gray'}
                                    />
                                </View>
                            );

                        case 'CreatorNavigator':
                            return (
                                <View
                                    style={{
                                        width: 60,
                                        height: 60,

                                        backgroundColor: '#865DFF',
                                        // backgroundColor: transparent,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 50,
                                        marginBottom: 70,
                                        shadowRadius: 20,
                                        shadowColor: 'red',
                                    }}
                                >
                                    <Ionicons
                                        name="add"
                                        size={focused ? 28 : 24}
                                        color="white"
                                    />
                                </View>
                            );

                        case 'LeaderBoard':
                            return (
                                <View>
                                    <MaterialIcons
                                        name="leaderboard"
                                        size={focused ? 28 : 24}
                                        color={focused ? '#865DFF' : 'gray'}
                                    />
                                </View>
                            );

                        case 'Profile':
                            return (
                                <View>
                                    <Feather
                                        name="user"
                                        size={focused ? 28 : 24}
                                        color={focused ? '#865DFF' : 'gray'}
                                    />
                                </View>
                            );

                        default:
                            break;
                    }
                },
                tabBarStyle: {
                    position: 'absolute',
                    height: '10%',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                },
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Discover" component={Discover} />
            <Tab.Screen
                name="CreatorNavigator"
                component={CreatorNavigator}
                options={{ tabBarStyle: { display: 'none' } }}
            />
            <Tab.Screen
                name="LeaderBoard"
                component={LeaderBoard}
                options={{ tabBarStyle: { display: 'none' } }}
            />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}
