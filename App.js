import "react-native-gesture-handler";
import { AuthContextProvider } from "./src/store/auth-context";
import MainStack from "./src/navigation/MainStack";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <MainStack />
        <Toast />
        <StatusBar style="inverted" backgroundColor="rgba(255, 70, 0 , .6)" />
      </AuthContextProvider>
    </NavigationContainer>
  );
}
