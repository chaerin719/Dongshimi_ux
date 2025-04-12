import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack
    screenOptions={{
      headerShown: false, // 모든 스크린에서 헤더 숨김
    }}
  />
}
