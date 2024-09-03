import React, { useRef } from "react";
import { StyleSheet, Text, View, PanResponder, Image } from "react-native";
import Wave from "../Wave";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
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
    <View style={[styles.tankWrapper]}>
      {/* Tank Display */}
      {/* to show the dotted lines */}
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

      <View style={styles.sliderArea} {...panResponder.panHandlers}>
        {/* slides icon that handle up and down */}
        <View style={[styles.sliderHandle, { bottom: `${percentage}%` }]}>
          <AntDesign name="up" size={15} color="white" />
          <AntDesign name="down" size={15} color="white" />
        </View>
      <View style={[styles.horizontalLine, { bottom: `${percentage + 8}%` }]} />
      </View>

      {/* dotted line  at the bottom */}
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
      {/* Horizontal Line that moves with the slider */}
      {/* .... */}
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
    height: 218,
    justifyContent: "flex-end",
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderTopWidth: 2,
    marginRight: 20,
  },
  floatContainer: {
    position: "absolute",
    width: "100%",
    height: "119%",
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
  sliderArea: {
    height: 220,
    width: wp(4),
    alignItems: "center",
    position: "relative",
    backgroundColor: "#fafafa",
    padding: 2,
    borderRadius: 15,
    paddingTop: 12,
    borderWidth: 2,
    borderColor: "#EAEAED",
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
    right: wp(4),
    height: 3,
    width: 280,
    backgroundColor: "black",
  },
});

export default Box;
