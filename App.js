import { useState, useEffect } from "react";

import "react-native-gesture-handler";
import { AuthContextProvider } from "./src/store/auth-context";
import MainStack from "./src/navigation/MainStack";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import {
  setUpNotificationHandler,
  registerForPushNotificationsAsync,
  addNotificationListeners,
} from "./src/services/notifications";

WebBrowser.maybeCompleteAuthSession();

setUpNotificationHandler();

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token))
      .catch((error) => console.warn("Push registration failed", error));

    return addNotificationListeners({
      onReceive: (receivedNotification) => setNotification(receivedNotification),
      onRespond: (response) => console.log(response),
    });
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthContextProvider>
          <MainStack expoPushToken={expoPushToken} />
          <Toast />
          <StatusBar style="inverted" />
        </AuthContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
