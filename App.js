import "react-native-gesture-handler";
import { AuthContextProvider } from "./store/auth-context";
import Main from "./Main";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <AuthContextProvider>
      <Main />
      <Toast />
    </AuthContextProvider>
  );
}
