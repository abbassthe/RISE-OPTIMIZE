@ -1,349 +0,0 @@
import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';

import facebookLogo from '../assets/facebook.png';
import googleLogo from '../assets/google.png';
import appleLogo from '../assets/apple.png';
import eyeOffLogo from '../assets/eye-icon.png';
import eyeLogo from '../assets/blind-eye-sign.png';
import { StackActions, NavigationProp } from '@react-navigation/native';

type CreateAccountScreenProps = {
    navigation: NavigationProp<any>;
};

const CreateAccountScreen: React.FC<CreateAccountScreenProps> = ({ navigation }) => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [checkboxError, setCheckboxError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [checkboxChecked, setCheckboxChecked] = useState<boolean>(false);
    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(true);
    const [passwordError, setPasswordError] = useState<string>('');
    const [firstNameError, setFirstNameError] = useState<string>('');
    const [lastNameError, setLastNameError] = useState<string>('');

    const handleCreateAccount = () => {
        let isValid = true;

        // Validate first name
        if (firstName.trim() === '') {
            setFirstNameError('First name is required.');
            isValid = false;
        } else {
            setFirstNameError('');
        }

        // Validate last name
        if (lastName.trim() === '') {
            setLastNameError('Last name is required.');
            isValid = false;
        } else {
            setLastNameError('');
        }

        // Validate email
        if (!validateEmail(email)) {
            setEmailError('Invalid email address! Try again.');
            isValid = false;
        } else {
            setEmailError('');
        }

        // Validate password
        if (!validatePassword(password)) {
            setPasswordError('Password must be 6 or more characters.');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (isValid && checkboxChecked) {
            // Make API call
            fetch('http://10.169.27.87:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password,
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    navigation.dispatch(StackActions.push('SuccessfulSignup'));
                } else {
                    // Handle API errors
                    const apiErrors = data.errors;
                    apiErrors.forEach((error: { param: string; msg: string }) => {
                        switch (error.param) {
                            case 'first_name':
                                setFirstNameError(error.msg);
                                break;
                            case 'last_name':
                                setLastNameError(error.msg);
                                break;
                            case 'email':
                                setEmailError(error.msg);
                                break;
                            case 'password':
                                setPasswordError(error.msg);
                                break;
                            default:
                                // Handle other errors if needed
                                break;
                        }
                    });
                }
            })
            .catch(error => {
                // Handle fetch error
                console.error('Error:', error);
            });
        } else if (!checkboxChecked) {
            setCheckboxError('Please accept the terms and conditions to continue.');
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
    };

    const toggleAcceptTerms = () => {
        navigation.dispatch(StackActions.push('Terms_Conditions'));
    };

    const handleCheckboxToggle = () => {
        setCheckboxChecked(!checkboxChecked);
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/* Input fields for first and last names */}
                <Text style={styles.header}>First Name</Text>
                <TextInput
                    style={[styles.input, firstNameError ? styles.inputError : null]}
                    placeholder="Enter your first name"
                    onChangeText={setFirstName}
                    value={firstName}
                />
                {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}

                <Text style={styles.header}>Last Name</Text>
                <TextInput
                    style={[styles.input, lastNameError ? styles.inputError : null]}
                    placeholder="Enter your last name"
                    onChangeText={setLastName}
                    value={lastName}
                />
                {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}

                {/* Input fields for email and password */}
                <Text style={styles.header}>Email</Text>
                <TextInput
                    style={[styles.input, emailError ? styles.inputError : null]}
                    placeholder="e.g. email@example.com"
                    onChangeText={setEmail}
                    value={email}
                    keyboardType="email-address"
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                <Text style={styles.header}>Password</Text>
                <TextInput
                    style={[styles.input, passwordError ? styles.inputError : null]}
                    placeholder="Enter your password"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={passwordVisibility}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                {/* Checkbox for terms and conditions */}
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                        style={[styles.checkbox, checkboxChecked ? styles.checked : null]}
                        onPress={handleCheckboxToggle}
                    />
                    <TouchableOpacity onPress={toggleAcceptTerms} style={styles.backButton}>
                        <Text style={styles.termsText1}>
                            I accept <Text style={styles.blueText}>terms and conditions</Text> and{' '}
                            <Text style={styles.blueText}>privacy policy</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
                {checkboxError ? <Text style={styles.errorText}>{checkboxError}</Text> : null}

                {/* Button to create account */}
                <TouchableOpacity onPress={handleCreateAccount} style={styles.createButton}>
                    <Text style={styles.createButtonText}>Create Account</Text>
                </TouchableOpacity>

                {/* Separator and social login options */}
                <View style={styles.separatorContainer}>
                    <View style={styles.separator} />
                    <Text style={styles.orText}>or continue using</Text>
                    <View style={styles.separator} />
                </View>
                <View style={styles.logosContainer}>
                    <View style={styles.logoContainer}>
                        <Image source={appleLogo} style={styles.logo} />
                    </View>
                    <View style={styles.logoContainer}>
                        <Image source={facebookLogo} style={styles.logo} />
                    </View>
                    <View style={styles.logoContainer}>
                        <Image source={googleLogo} style={styles.logo} />
                    </View>
                </View>

                {/* Link to login page */}
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    inputError: {
        borderColor: 'red', // Change border color to indicate error
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 3,
        borderWidth: 3,
        borderColor: '#000',
        marginRight: 10,
        borderColor: 'black',
    },
    checked: {
        backgroundColor: '#000',
    },
    termsText1: {
        fontSize: 13,
    },
    blueText: {
        fontSize: 13,
        color: 'blue',
    },
    createButton: {
        backgroundColor: 'black',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
        marginBottom: 20,
    },
    createButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: 'lightgray',
        marginHorizontal: 10,
    },
    orText: {
        fontSize: 14,
        color: 'gray',
    },
    logosContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    logoContainer: {
        width: 120,
        height: 60,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 40,
        height: 40,
    },
    loginContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    loginText: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
        marginRight: 5,
    },
    loginLink: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CreateAccountScreen;
