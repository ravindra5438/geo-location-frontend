import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import AuthStack from "./authStack/AuthStack";
import TeacherDrawer from "./HomeStack/TeacherDrawer";
import StudentDrawer from "./HomeStack/StudentDrawer";

SplashScreen.preventAutoHideAsync();

const myTheme = {
  ...DefaultTheme,
};

export default function MainStack() {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [Student, setStudent] = useState(false);

  const prepare = async () => {
    try {
      await AsyncStorage.getItem("token").then((data) => {
        setUser(data);
      });

      await AsyncStorage.getItem("role").then((data) => {
        setStudent(data == "student" ? true : false);
      });
    } catch {
      (e) => console.warn(e);
    } finally {
      console.log("authCtx", authCtx);
      setIsLoading(false);
      SplashScreen.hideAsync();
    }
  };
  useEffect(() => {
    prepare();
  }, [authCtx]);

  if (isLoading) {
    return null;
  }

  return (
    <PaperProvider theme={myTheme}>
      {!user ? <AuthStack /> : Student ? <StudentDrawer /> : <TeacherDrawer />}
    </PaperProvider>
  );
}
