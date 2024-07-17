import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";

const greenCheck: ImageSourcePropType = require("../assets/greencheck.png");

interface SuccessfulSignupProps {
  navigation: any; // Adjust as per your navigation requirements
}
const SuccessfulSignup: React.FC<SuccessfulSignupProps> = ({ navigation }) => {
  const navigateToHomePage = () => {
    navigation.navigate("Unverified_HomePage");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>Account created successfully</Text>
        <Image source={greenCheck} style={styles.image} />
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={navigateToHomePage}
      >
        <Text style={styles.buttonText}>Continue to home Page</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
    marginRight: 10,
  },
  buttonContainer: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 20,
    height: 20,
  },
});

export default SuccessfulSignup;
