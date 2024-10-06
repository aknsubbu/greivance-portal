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
import ErrorScreen from "./ErrorPage";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function prepare() {
      try {
        if (fontsLoaded) {
          const profileData = await getProfileById("66273cab79adffeceebab991");
          await saveProfile(profileData);
        }
      } catch (e) {
        console.warn(e);
        setError(
          e instanceof Error ? e : new Error("An unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    }

    prepare();
  }, [fontsLoaded]);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return null; // This will keep the splash screen visible
  }

  if (error) {
    // You should create an ErrorScreen component to handle errors gracefully
    return <ErrorScreen error={error.message} />;
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
