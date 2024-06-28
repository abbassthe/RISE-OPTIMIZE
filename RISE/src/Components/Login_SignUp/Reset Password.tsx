import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { StackActions, NavigationProp } from '@react-navigation/native';

import eyeOffLogo from '../assets/eye-icon.png';
import eyeLogo from '../assets/blind-eye-sign.png';

interface ResetProps {
  navigation: NavigationProp<any>; // Adjust as per your navigation requirements
}

const Reset: React.FC<ResetProps> = ({ navigation }) => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState<boolean>(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };

  const setPasswordAndCheckMatch = (newPassword: string) => {
    setPassword(newPassword);
    if (confirmPassword && newPassword === confirmPassword) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
  };

  const setConfirmPasswordAndCheckMatch = (newConfirmPassword: string) => {
    setConfirmPassword(newConfirmPassword);
    if (password && newConfirmPassword === password) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
  };

  const Successful = () => {
    if (password === confirmPassword) {
      navigation.dispatch(StackActions.push('Successfulreset'));
    } else {
      setIsPasswordMatch(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'< Back'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.Header}>Enter new password</Text>
        <View style={styles.passwordContainer}>
          <Text style={styles.header1}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your new password"
            value={password}
            onChangeText={setPasswordAndCheckMatch}
            secureTextEntry={passwordVisibility}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeButton}>
            <Image source={passwordVisibility ? eyeOffLogo : eyeLogo} style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <Text style={styles.header1}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChangeText={setConfirmPasswordAndCheckMatch}
            secureTextEntry={confirmPasswordVisibility}
          />
          <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.eyeButton}>
            <Image source={confirmPasswordVisibility ? eyeOffLogo : eyeLogo} style={styles.eyeIcon} />
          </TouchableOpacity>
          {!isPasswordMatch && (
            <Text style={{ color: 'red', alignSelf: 'stretch', paddingLeft: 10 }}>
              Passwords do not match!
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity onPress={Successful} style={styles.ResetButton}>
        <Text style={styles.ResetButtonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 0,
  },
  backButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  Header: {
    alignSelf: 'stretch',
    marginTop: 140,
    fontWeight: 'bold',
    fontFamily: 'Sora-Regular',
    fontSize: 25,
    marginBottom: 40,
  },
  header1: {
    marginTop: 30,
    marginBottom: 10,
  },
  content: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 80,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  ResetButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    width: '80%',
    position: 'absolute',
    bottom: 20,
    marginLeft: 40,
    marginRight: 500,
  },
  ResetButtonText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
    top: '70%',
    transform: [{ translateY: -12.5 }],
  },
  eyeIcon: {
    width: 25,
    height: 25,
  },
});

export default Reset;
