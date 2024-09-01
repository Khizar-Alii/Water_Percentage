import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput} from "react-native";
import Box from "../box/Box";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";


const HomeScreen = () => {
  const [percentage, setPercentage] = useState(65);

  const handleInputChange = (val) => {
    const numVal = Number(val);

    if (numVal >= 1 && numVal <= 100) {
      setPercentage(numVal);
    } else if (val === "") {
      setPercentage(0);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Source Minimum</Text>

      {/* Button for percentage and volume on top */}
      <View style={styles.btnContainer}>
        <Text style={[styles.btnz, styles.activeBtn]}>PERCENTAGE</Text>
        <Text style={styles.btnz}>VOLUME</Text>
      </View>

      <Text style={styles.infoText}>
        We'll stop the pump when your tank drops below:
      </Text>

      <Box percentage={percentage} setPercentage={setPercentage} />

      {/* Bottom Section for Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Source Minimum</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            value={
              percentage === "" || null ? "" : String(Math.round(percentage))
            }
            style={styles.inputValue}
            keyboardType="numeric"
            onChangeText={handleInputChange}
            placeholder="0"
          />
          <Text style={{ paddingLeft: 15, fontSize: 18 }}>%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 60,
    lineHeight: 22,
    fontFamily: "MontserratMedium",
    paddingBottom: 15,
  },
  btnContainer: {
    flexDirection: "row",
    borderColor: "#BCE5FF",
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 30,
    padding: 3,
  },
  btnz: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    color: "#4B9CD3",
    fontFamily: "Montserrat",
  },
  activeBtn: {
    backgroundColor: "#4B9CD3",
    color: "white",
    borderRadius: 20,
  },
  infoText: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 19.5,
    width: '70%',
    paddingVertical: 10,
    fontFamily: "MontserratBold",
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("100%"),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#EAEAED",
    paddingVertical: 25,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  inputLabel: {
    fontSize: 16,
    paddingLeft: 20,
    fontFamily: "MontserratMedium",
  },
  inputValue: {
    fontSize: 16,
    fontWeight: "bold",
    width: 35,
    height: 35,
    borderColor: "#EAEAED",
    borderWidth: 1,
    textAlign: "center",
    backgroundColor: "#EAEAED",
    borderRadius: 5,
    color: "grey",
  },
});

export default HomeScreen;
