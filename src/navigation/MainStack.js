import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
  Text,
  ActivityIndicator,
} from "react-native-paper";
import { View, Image } from "react-native";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import AuthStack from "./authStack/AuthStack";
import TeacherTab from "./HomeStack/TeacherTab";
import StudentTab from "./HomeStack/StudentTab";
import { useNetInfo } from "@react-native-community/netinfo";
import { REACT_APP_URL } from "@env";
import axios from "axios";
import useAxios from "../services";
import { expo } from "../../app.json";
import AppUpdate from "../components/AppUpdate";

const appVersion = expo.version;

SplashScreen.preventAutoHideAsync();

const myTheme = {
  ...DefaultTheme,
  colors: {
    primary: "#404258",
    onPrimary: "#fff",
    primaryContainer: "#FFE9A0", //"rgb(0,255,170)"
    onPrimaryContainer: "rgb(56, 0, 56)",
    secondary: "rgb(109, 88, 105)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(247, 218, 239)",
    onSecondaryContainer: "rgb(39, 22, 36)",
    tertiary: "rgb(130, 83, 69)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(255, 219, 209)",
    onTertiaryContainer: "rgb(50, 18, 8)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(30, 26, 29)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(30, 26, 29)",
    surfaceVariant: "rgb(238, 222, 231)",
    onSurfaceVariant: "rgb(78, 68, 75)",
    outline: "rgb(128, 116, 124)",
    outlineVariant: "rgb(209, 194, 203)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(52, 47, 50)",
    inverseOnSurface: "rgb(248, 238, 242)",
    inversePrimary: "rgb(255, 170, 243)",
    elevation: {
      level0: "transparent",
      level1: "rgb(250, 241, 250)",
      level2: "rgb(247, 234, 247)",
      level3: "rgb(244, 228, 244)",
      level4: "rgb(243, 226, 243)",
      level5: "rgb(241, 222, 241)",
    },
    surfaceDisabled: "rgba(30, 26, 29, 0.12)",
    onSurfaceDisabled: "rgba(30, 26, 29, 0.38)",
    backdrop: "rgba(55, 46, 52, 0.4)",
  },
};

export default function MainStack({ expoPushToken }) {
  const netinfo = useNetInfo();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [Student, setStudent] = useState(false);
  const axiosInstance = useAxios();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [notNow, setNotNow] = useState(true);

  const prepare = async () => {
    setIsLoading(true);
    try {
      await axios(REACT_APP_URL)
        .then((res) => {
          const versionFromBackend = res?.data?.version.split(".");
          const versionFromFrontend = appVersion.split(".");
          const majorVersionFromBackend = +versionFromBackend[0];
          const minorVersionFromBackend = +versionFromBackend[1];
          const patchVersionFromBackend = +versionFromBackend[2];
          const majorVersionFromFrontend = +versionFromFrontend[0];
          const minorVersionFromFrontend = +versionFromFrontend[1];
          const patchVersionFromFrontend = +versionFromFrontend[2];
          if (
            majorVersionFromBackend > majorVersionFromFrontend ||
            minorVersionFromBackend > minorVersionFromFrontend ||
            patchVersionFromBackend > patchVersionFromFrontend
          ) {
            if (majorVersionFromBackend > majorVersionFromFrontend) {
              setNotNow(false);
              setShowUpgrade(true);
            } else {
              setShowUpgrade(true);
              setNotNow(true);
            }
          }
        })
        .catch((err) => {
          console.warn(err);
        });
      if (authCtx.token) {
        await axiosInstance
          .put("/user", { token: expoPushToken })
          .then((res) => {
            console.log(res?.data?.message);
          })
          .catch((err) => console.log(err.response.data));
      }
      await AsyncStorage.getItem("token").then((data) => {
        setUser(data);
      });

      await AsyncStorage.getItem("role").then((data) => {
        setStudent(data == "student" ? true : false);
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch {
      (e) => console.warn(e);
    } finally {
      console.log("authCtx12", authCtx);
      setIsLoading(false);
      await SplashScreen.hideAsync();
    }
  };
  useEffect(() => {
    prepare();
  }, [authCtx.token]);

  if (expoPushToken) {
    axiosInstance
      .put("/user", { token: expoPushToken })
      .then((res) => {
        console.log("expo-token sent", res?.data?.message);
      })
      .catch((err) => console.log(err.response.data));
  }

  if (!netinfo.isConnected) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require("../../assets/noInternet.jpg")}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  if (showUpgrade) {
    return (
      <AppUpdate
        notNow={notNow}
        onPress={() => {
          setShowUpgrade(false);
        }}
      />
    );
  }

  return (
    <PaperProvider theme={myTheme}>
      <View flex={1}>
        {!user ? <AuthStack /> : Student ? <StudentTab /> : <TeacherTab />}
      </View>
    </PaperProvider>
  );
}
