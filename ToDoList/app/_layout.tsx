import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "To Do List", 
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#b84840" },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "#fff",
          },
        }}
      />
    </Stack>
  );
}
