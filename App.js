import "react-native-gesture-handler";
import { AuthContextProvider } from "./store/auth-context";
import Main from "./Main";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, ThemeProvider } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <Main />
        <Toast />
        <StatusBar style="light" backgroundColor="#000" translucent={true} />
      </AuthContextProvider>
    </NavigationContainer>
  );
}
