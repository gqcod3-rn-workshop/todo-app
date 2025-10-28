import { TodoProvider } from "@/src/features/task-management/presentation/context/todo-context";
import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
  return (
    <>
      <TodoProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name='todo/add'
            options={{
              headerShown: false
            }}
          />
        </Stack>
      </TodoProvider>
    </>
  )
}
