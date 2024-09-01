import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

const Wave = ({ percentage }) => {
  const waveHeight = 220; 
  const waveWidth = 250; 

  const waveTop = (1 - percentage / 100) * waveHeight;

  // Create the wave path
  const getWavePath = () => {
    return `
      M0,${waveTop}
      Q${waveWidth / 4},${waveTop - 10} ${waveWidth / 2},${waveTop}
      T${waveWidth},${waveTop}
      V${waveHeight}
      H0
      Z
    `;
  };

  return (
    <View style={{ width: waveWidth, height: waveHeight, overflow: "hidden",
      borderLeftWidth : 10,
      borderRightWidth : 10,
      borderBottomWidth : 10,
      borderLeftColor : "rgba(229,229,232,0.6)",
      borderRightColor : "rgba(229,229,232,0.8)",
      borderBottomColor : "rgba(229,229,232,1)",
      borderTopRightRadius : 10,
      borderTopLeftRadius : 10,
     }}>
      <Svg
        height={waveHeight}
        width={waveWidth}
        viewBox={`0 0 ${waveWidth} ${waveHeight}`}
      >
        <Path d={getWavePath()} fill="#BCE6FF" />
      </Svg>
    </View>
  );
};
export default Wave;