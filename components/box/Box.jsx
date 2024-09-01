import React, { useRef } from "react";
import { StyleSheet, Text, View, PanResponder, Image } from "react-native";
import Wave from "../Wave";
import AntDesign from "@expo/vector-icons/AntDesign";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
const Box = ({ percentage, setPercentage }) => {
  const pan = useRef(null);
  const sliderHeight = 200; 

  // PanResponder to handle touch events
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.current && pan.current.setOffset(pan.current.getLayout());
      },
      onPanResponderMove: (_, gestureState) => {
        const newPercentage = Math.max(
          0,
          Math.min(100, percentage - (gestureState.dy / sliderHeight) * 100)
        );
        setPercentage(newPercentage);
      },
      onPanResponderRelease: () => {
        pan.current && pan.current.flattenOffset();
      },
    })
  ).current;

  return (
    <View>
      {/* Tank Display */}
      <View style={[styles.tankWrapper]}>
        {/* dotted line */}
        <View
          style={{
            borderWidth: 1,
            width: wp(11),
            borderColor: "#d3d3d3",
            position: "absolute",
            right: 14,
            top: 52,
            borderStyle: "dashed",
          }}
        />
        {/* ...... */}
        <View style={[styles.tank]}>
          {/* to create a curve on top of the box */}
          <View style={styles.floatContainer}>
            <Image
              source={require("../../assets/images/tophead.png")}
              style={{
                width: "100%",
                height: "40%",
                objectFit: "fill",
                // tintColor: "rgba(229,229,232,1)",
                tintColor: "#EAEAED",
              }}
            />
          </View>
          {/* ........... */}
          {/* Percentage text within the container */}
          <Text style={styles.percentText}>{Math.round(percentage)} %</Text>
          {/* water wave  */}
          <Wave percentage={percentage} />
        </View>

        {/* to create slider */}
        <View style={styles.sliderWrapper}>
          <View style={styles.sliderLine}>
            <View style={styles.sliderArea} {...panResponder.panHandlers}>
              <View style={[styles.sliderHandle, { bottom: `${percentage}%` }]}>
                <AntDesign name="up" size={15} color="white" />
                <AntDesign name="down" size={15} color="white" />
              </View>
              {/* Horizontal Line that moves with the slider */}
              <View
                style={[
                  styles.horizontalLine,
                  { bottom: `${percentage + 8}%` },
                ]}
              />
            </View>
          </View>
        </View>
        {/* dotted line */}
        <View
          style={{
            borderWidth: 1,
            width: wp(11),
            borderColor: "#d3d3d3",
            position: "absolute",
            right: 14,
            bottom: 12,
            borderStyle: "dashed",
          }}
        />
        {/* .... */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tankWrapper: {
    paddingVertical: 10,
    marginBottom: 30,
    paddingTop: 50,
    flexDirection: "row",
    gap: 20,
  },
  tank: {
    width: 250,
    height: 215,
    justifyContent: "flex-end",
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderTopWidth: 2,
    marginRight: 20,
    // backgroundColor : "red"
  },
  floatContainer: {
    position: "absolute",
    // left: 0,
    width: "100%",
    height: "120%",
  },
  percentText: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    top: "10%",
    left: "40%",
    zIndex: 1,
  },
  sliderWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  sliderArea: {
    height: 200,
    width: 10,
    backgroundColor: "#EAEAED",
    alignItems: "center",
    position: "relative",
  },
  sliderLine: {
    backgroundColor: "#EAEAED",
    padding: 2,
    borderRadius: 5,
    paddingTop: 15,
  },
  sliderHandle: {
    backgroundColor: "black",
    position: "absolute",
    borderRadius: 50,
    alignItems: "center",
    width: 40,
    height: 40,
    padding: 10,
    justifyContent: "center",
  },
  horizontalLine: {
    position: "absolute",
    right: 10,
    height: 3,
    width: wp(81),
    backgroundColor: "black",
  },
});

export default Box;