import "react-native-gesture-handler";
import { AuthContextProvider } from "./store/auth-context";
import Main from "./Main";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <AuthContextProvider>
      <Main />
      <Toast />
      <StatusBar style="light" translucent={true} backgroundColor: '#000', />
    </AuthContextProvider>
  );
}
