import {
  Button,
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
  useTheme,
} from "react-native-paper";
import Login from "./screens/login/Login";
import Register from "./screens/register/Register";
import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useEffect, useState } from "react";
import TeacherHome from "./screens/teacher/TeacherHome";
import { createDrawerNavigator, DrawerContent } from "@react-navigation/drawer";
import TeacherStack from "./screens/teacher/TeacherStack";
import StudentHome from "./screens/student/StudentHome";
import AuthContext from "./store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomDrawer from "./components/CustomDrawer";
import StudentStack from "./screens/student/StudentStack";
import { Dimensions } from "react-native";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const myTheme = {
  ...DefaultTheme,
};

function TeacherDrawer(props) {
  const theme = useTheme();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="HOME"
      screenOptions={{
        drawerType: "front",
        swipeEdgeWidth: 200,
        drawerActiveBackgroundColor: theme.colors.onPrimary,
        drawerInactiveBackgroundColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.onPrimary,
        drawerActiveTintColor: theme.colors.primary,
        drawerLabelStyle: { fontWeight: "700" },
        drawerStyle: {
          backgroundColor: "transparent",
          height: 130,
          width: 200,
          marginTop: "23%",
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15,
        },
      }}
    >
      <Drawer.Screen
        options={{
          headerShown: true,
          headerMode: "screen",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            fontWeight: "700",
          },
          headerTitleAlign: "center",
          headerBackVisible: false,
        }}
        name="HOME"
        component={TeacherHome}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name="COURSES"
        component={TeacherStack}
      />
    </Drawer.Navigator>
  );
}
function StudentDrawer() {
  const theme = useTheme();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="HOME"
      screenOptions={{
        drawerType: "front",
        swipeEdgeWidth: 200,
        drawerActiveBackgroundColor: theme.colors.onPrimary,
        drawerInactiveBackgroundColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.onPrimary,
        drawerActiveTintColor: theme.colors.primary,
        drawerLabelStyle: { fontWeight: "700" },
        drawerStyle: {
          backgroundColor: "transparent",
          height: 130,
          width: 200,
          marginTop: "23%",
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15,
        },
      }}
    >
      <Drawer.Screen
        options={{
          headerShown: true,
          headerMode: "screen",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            fontWeight: "700",
          },
          headerTitleAlign: "center",
          headerBackVisible: false,
        }}
        name="Home"
        component={StudentHome}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name="COURSES"
        component={StudentStack}
      />
    </Drawer.Navigator>
  );
}

export default function Main() {
  const authCtx = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [Student, setStudent] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("token").then((data) => {
      setUser(data);
    });
    AsyncStorage.getItem("role").then((data) => {
      setStudent(data == "student" ? true : false);
    });
    console.log("authCtx", authCtx);
  }, [authCtx]);

  return (
    <NavigationContainer>
      <PaperProvider theme={myTheme}>
        {!user ? (
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
              headerMode: "screen",
              headerTintColor: "white",
              headerStyle: { backgroundColor: "#8758FF" },
              headerTitleAlign: "center",
              headerBackVisible: false,
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Sign Up" component={Register} />
          </Stack.Navigator>
        ) : Student ? (
          <StudentDrawer />
        ) : (
          <TeacherDrawer />
        )}
      </PaperProvider>
    </NavigationContainer>
  );
}
