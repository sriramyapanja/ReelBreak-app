import { View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { SessionProvider } from '@/context/SessionContext';
import { colors } from '@/theme/colors';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <SessionProvider>
      <View style={{ flex: 1 }}>
        <StatusBar style="dark" />
        <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="session/reel" />
        <Stack.Screen name="session/mood" />
        <Stack.Screen name="session/intervention" />
        <Stack.Screen name="session/challenges" />
        <Stack.Screen name="session/squats" />
        <Stack.Screen name="session/countdown" />
        <Stack.Screen name="session/finish" />
        <Stack.Screen name="session/celebration" />
        <Stack.Screen name="session/reward" />
      </Stack>
      </View>
    </SessionProvider>
  );
}
