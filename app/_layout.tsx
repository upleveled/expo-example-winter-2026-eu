import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { colors } from '@/constants/theme';

SplashScreen.preventAutoHideAsync().catch((splashScreenError) => {
  console.error(splashScreenError);
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync().catch((splashScreenError) => {
        console.error(splashScreenError);
      });
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} redirect />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="animals/new"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
          title: 'New Animal',
          headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.background },
        }}
      />
      <Stack.Screen
        name="animals/[animalId]"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
          title: 'Animal',
          headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.background },
        }}
      />
    </Stack>
  );
}
