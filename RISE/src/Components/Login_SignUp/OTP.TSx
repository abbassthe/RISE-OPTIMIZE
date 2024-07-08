import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ImageSourcePropType } from 'react-native';
const greenCheck: ImageSourcePropType = require('../assets/greencheck.png');

interface OTPScreenProps {
  navigation: any; // Adjust type as per your navigation requirements
}

const OTPScreen: React.FC<OTPScreenProps> = ({ navigation }) => {
  const [otp, setOtp] = useState<string>('');
  const [timer, setTimer] = useState<number>(60);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleInput = (num: string) => {
    if (otp.length < 6) {
      setOtp(otp + num);
    }
  };

  const handleDelete = () => {
    setOtp(otp.slice(0, -1));
  };

  const handleCheck = () => {
    if (otp === '123456') {
      setIsCorrect(true);
    }
    else {
      setIsCorrect(false);
    }
  };

  const renderKeypad = () => {
    const rows = [1, 2, 3].map((rowIndex) => {
      const keys = [1, 2, 3].map((keyIndex) => {
        const key = (rowIndex - 1) * 3 + keyIndex;
        return (
          <TouchableOpacity
            key={key}
            style={styles.keypadButton}
            onPress={() => handleInput(String(key))}
          >
            <Text style={styles.keypadText}>{key}</Text>
          </TouchableOpacity>
        );
      });
      return <View key={rowIndex} style={styles.keypadRow}>{keys}</View>;
    });

    return (
      <View style={styles.keypad}>
        {rows}
        <View style={styles.keypadRow}>
            <View style={styles.placeholder}></View>
            <TouchableOpacity
                style={[styles.keypadButton, { marginLeft: 10 }]}
                onPress={() => handleInput('0')}
            >
                <Text style={styles.keypadText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.keypadButton} onPress={handleDelete}>
                <Text style={styles.keypadText}>⌫</Text>
            </TouchableOpacity>
            </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleCheck}>
          <Text style={styles.loginButtonText}>Check</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const getOTPDisplay = (): string => {
    let display = otp.padEnd(6, 'X').split('');
    display.splice(3, 0, '-');
    return display.join('');
  };

  const checkMarkPosition = {
    position: 'absolute' as 'absolute',
    right: 0,
    top: '56%',
    marginTop: -15,
  };  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{'< Back'}</Text>
      </TouchableOpacity>
      <View style={styles.otpArea}>
        <Text style={styles.otpText}>
          An SMS sent to your mobile number{'\n'}
        </Text>
        <Text style={styles.mobileNumber}>+961 78 808 859</Text>
        <Text style={styles.text1}>Enter six-digit code</Text>
        <TextInput
          style={[styles.otpInput, isCorrect ? styles.correctLine : styles.incorrectLine]}
          value={getOTPDisplay()}
          editable={false}
        />
        {otp.length === 6 && isCorrect && (
            <Image source={greenCheck} style={[styles.checkMark, checkMarkPosition]} />
        )}
        <TouchableOpacity 
          style={styles.resendButton} 
          disabled={timer > 0}
          onPress={() => {
            if (timer === 0) {
              setTimer(60);
            }
          }}
        >
          <Text style={[styles.resendButtonText, { color: timer === 0 ? 'blue' : '#a1a1a1' }]}>Resend code</Text>
          {timer > 0 && <Text style={styles.timerText}>{`00:${timer < 10 ? '0' : ''}${timer}`}</Text>}
        </TouchableOpacity>
      </View>
      {renderKeypad()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  text1: {
    color: 'white',
    fontSize: 16,
    marginTop: 15,
    color: '#a1a1a1',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 10,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  otpArea: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 0,
  },
  otpInput: {
    fontSize: 30,
    letterSpacing: 10,
    color: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderColor: 'white',
    borderBottomWidth: 1,
    textAlign: 'center',
    marginVertical: 20,
    minWidth: 200,
  },
  checkMark: {
    position: 'absolute',
    marginRight: 75,
  },
  resendButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  resendButtonText: {
    color: '#a1a1a1',
    fontSize: 16,
    marginRight: 10,
  },
  timerText: {
    color: '#a1a1a1',
    fontSize: 16,
  },
  keypad: {
    marginTop: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    height: 500,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  keypadButton: {
    width: 100,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
  },
  keypadText: {
    fontSize: 25,
    color: 'black',
  },
  mobileNumber: {
    alignItems: 'center',
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 5,
    width: '80%',
    marginTop: 15,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  placeholder: {
    width: 100,
    height: 60,
  },
  correctLine: {
    borderBottomColor: 'green',
    borderBottomWidth: 2,
  },
  incorrectLine: {
    borderBottomColor: 'purple',
    borderBottomWidth: 2,
  }
});

export default OTPScreen;
