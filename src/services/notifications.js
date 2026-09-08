import { isRunningInExpoGo } from "expo";
import { Platform } from "react-native";
import * as Device from "expo-device";

// expo-notifications cannot be imported at module scope while running in Expo
// Go on Android. Its entry point re-exports DevicePushTokenAutoRegistration.fx,
// which registers a push token listener as an import side effect, and that path
// throws from SDK 53 on (remote notifications were removed from Expo Go). A
// static import therefore kills the app at startup with "[runtime not ready]"
// before any of our code runs.
//
// So the module is required lazily, and only where remote notifications
// actually work. Push still needs a development build; this just keeps Expo Go
// able to boot the app for UI work.
export const pushSupported = !(isRunningInExpoGo() && Platform.OS === "android");

let notificationsModule;

const getNotifications = () => {
  if (!pushSupported) {
    return null;
  }
  if (!notificationsModule) {
    notificationsModule = require("expo-notifications");
  }
  return notificationsModule;
};

export const setUpNotificationHandler = () => {
  const Notifications = getNotifications();
  if (!Notifications) {
    return;
  }
  Notifications.setNotificationHandler({
    // shouldShowAlert is deprecated and shouldShowBanner/shouldShowList are
    // now required in its place.
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
};

export const registerForPushNotificationsAsync = async () => {
  const Notifications = getNotifications();
  if (!Notifications) {
    return undefined;
  }

  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return undefined;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  return token;
};

// Returns an unsubscribe function, so callers can use it directly as a
// useEffect cleanup. removeNotificationSubscription was removed from the SDK;
// each subscription is now released through its own remove().
export const addNotificationListeners = ({ onReceive, onRespond }) => {
  const Notifications = getNotifications();
  if (!Notifications) {
    return () => {};
  }

  const receivedSubscription =
    Notifications.addNotificationReceivedListener(onReceive);
  const responseSubscription =
    Notifications.addNotificationResponseReceivedListener(onRespond);

  return () => {
    receivedSubscription.remove();
    responseSubscription.remove();
  };
};
