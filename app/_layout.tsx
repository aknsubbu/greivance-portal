import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { Provider } from "react-native-paper";
import { getProfileById } from "@/functions/profileFunctions";
import { saveProfile } from "@/functions/profileAsyncStorage";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [loaded, setLoaded] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      const profileData = await getProfileById("66273cab79adffeceebab991");
      saveProfile(profileData);
      setProfileData(profileData);
    }

    if (fontsLoaded) {
      loadProfile();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded && profileData) {
      setLoaded(true);
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, profileData]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Provider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </Provider>
    </ThemeProvider>
  );
}
