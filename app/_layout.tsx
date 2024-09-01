import { Stack } from "expo-router";
import { useFonts } from "expo-font";


export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    Montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
  });
  if (!fontsLoaded && !fontsError) {
    return;
  }
  return (
    <Stack screenOptions={{
      headerShown : false,
    }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
