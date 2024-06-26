import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';

//redux
import { useDispatch } from 'react-redux';
import { loGin, upDated } from 'src/slices/authSlice';

//Toast
import { Toast } from 'react-native-toast-message/lib/src/Toast';

//icons
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import google from 'src/assets/images/google.png';
import Divider from 'react-native-divider';

//component
import HeaderBack from 'src/components/auth/HeaderBack';
import Button from 'src/components/auth/Button';
import FormTextInput from 'src/components/auth/Input';

//RTKQuery
import { useLoginUserMutation } from 'src/services/authApi';

//Web: 782625948070-5a1sertfems0ia4cedglharqqo44kqb4.apps.googleusercontent.com
//IOS; 782625948070-dnqkej8k4movbj0j37lgjuuv435iucgb.apps.googleusercontent.com
//Android:
const InitLogin = { mail: '', password: '' };
const InitErrorExist = { mail: false, password: false };

export default function Login({ navigation }) {
    const [formData, setFormData] = useState(InitLogin);
    const [formError, setFormError] = useState(InitErrorExist);

    const [noClick, setNoClick] = useState(true);
    const dispatch = useDispatch();

    const [loginUser, { data, isError, error, isLoading }] =
        useLoginUserMutation();

    useEffect(() => {
        if (!formData.password || !formData.mail) {
            setNoClick(true);
        } else {
            setNoClick(false);
        }
    }, [formData]);

    useEffect(() => {
        if (data) {
            dispatch(loGin(data));
            dispatch(upDated(data?.data?.user));
            navigation.navigate('AppNavigator');
        }
        if (isError) {
            const errorText = error?.data?.message;
            switch (errorText) {
                case 'All fields are mandatory!':
                    break;
                case 'Account not exist':
                    setFormError((pre) => {
                        var newError = { ...pre, mail: true };
                        return newError;
                    });
                    break;
                case 'Wrong password':
                    setFormError((pre) => {
                        var newError = { ...pre, password: true };
                        return newError;
                    });
                    break;
                case 'Not Verify':
                    // const letter = {
                    //     title: 'SignIn Falure!',
                    //     text: ' Please check your mail to verify-account',
                    // };
                    // setTimeout(() => {
                    //     navigation.navigate('LetterScreen', letter);
                    // }, 1500);
                    Toast.show({
                        type: 'error',
                        text1: 'SignIn Falure',
                        text2: 'Please check mail to verify account',
                        visibilityTime: 2500,
                        topOffset: 60,
                    });
                    break;
                default:
                    break;
            }
        }
    }, [data, isError]);

    const handleChange = (e, name) => {
        const value = e.nativeEvent.text;
        setFormData({ ...formData, [name]: value });
        setFormError({ ...formError, [name]: false });
    };

    const handleLogin = () => {
        if (!noClick) {
            loginUser(formData);
        }
    };

    const showConfirmDialog = () => {
        return Alert.alert(
            'Login falure',
            'You can not login with expo local',
            [
                {
                    text: 'Cancle',
                },
            ],
        );
    };

    return (
        <View style={styles.safeAreaView}>
            <ScrollView
                style={{ width: '92%' }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.viewAll}>
                    {/* <Header
                        title="Login"
                        direct="Onboard"
                        navigation={navigation}
                    /> */}
                    <HeaderBack
                        title="Login"
                        handleBack={() => navigation.navigate('Onboard')}
                    />
                    <View style={styles.formSignUp}>
                        <FormTextInput
                            lable="Email"
                            place="Your Email"
                            icon={
                                <Feather
                                    name="user"
                                    size={24}
                                    color="#865DFF"
                                />
                            }
                            value={formData.mail}
                            handleChange={(e) => handleChange(e, 'mail')}
                        />
                        {formError.mail && (
                            <Text style={{ color: 'red' }}>
                                Email doesn't not exists
                            </Text>
                        )}
                        <FormTextInput
                            lable="Password"
                            place="Your Password"
                            icon={
                                <MaterialIcons
                                    name="lock-outline"
                                    size={24}
                                    color="#865DFF"
                                />
                            }
                            value={formData.password}
                            handleChange={(e) => handleChange(e, 'password')}
                        />
                        {formError.password && (
                            <Text style={{ color: 'red' }}>Wrong password</Text>
                        )}

                        <View style={styles.viewFormfooter}>
                            <Button
                                title="Login"
                                navigation={navigation}
                                onPress={handleLogin}
                                click={noClick}
                                // onPress={() =>
                                //     navigation.navigate('AppNavigator')
                                // }
                                loading={isLoading}
                            />

                            <View style={styles.viewForgot}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Reset')}
                                >
                                    <Text style={styles.textForgot}>
                                        Forgot password?
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.viewNote}>
                                <View style={styles.viewNoteContainer}>
                                    <Text style={styles.textNoteGray}>
                                        By continuing, you agree to the
                                    </Text>
                                    <Text style={styles.textNoteBlack}>
                                        Term of Services
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.textNoteGray}>&</Text>
                                    <Text style={styles.textNoteBlack}>
                                        Privcacy Policy
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <Divider
                        borderColor="gray"
                        color="gray"
                        orientation="center"
                    >
                        OR
                    </Divider>

                    <View style={styles.viewLoginAnother}>
                        <TouchableOpacity onPress={showConfirmDialog}>
                            <View style={styles.viewLoginwithFB}>
                                <MaterialCommunityIcons
                                    name="facebook"
                                    size={24}
                                    color="white"
                                />

                                <Text style={styles.textFB}>
                                    Login with Facebook
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={showConfirmDialog}>
                            <View style={styles.viewLoginwithGG}>
                                <Image source={google} />

                                <Text style={styles.textGG}>
                                    Login with Google
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: '#E3DFFD',
        display: 'flex',
        width: '100%',
        height: '100%',
        gap: 10,
        alignItems: 'center',
    },

    viewAll: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formSignUp: {
        flexDirection: 'column',
        marginTop: 20,
        gap: 20,
    },

    viewFormfooter: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },

    viewForgot: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textForgot: {
        color: '#865DFF',
        fontWeight: 700,
    },

    viewNote: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    viewNoteContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textNoteGray: {
        fontSize: 14,
        color: 'gray',
    },

    textNoteBlack: {
        textAlign: 'center',
        fontSize: 14,
        color: '#000',
        fontWeight: '500',
    },

    viewLoginAnother: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        gap: 20,
    },

    viewLoginwithFB: {
        backgroundColor: '#2F58CD',
        width: 310,
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },

    textFB: {
        color: 'white',
        fontWeight: 800,
    },

    viewLoginwithGG: {
        backgroundColor: 'white',
        width: 310,
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },

    textGG: {
        color: 'black',
        fontWeight: 800,
    },
});
