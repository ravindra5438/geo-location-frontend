import { Provider as PaperProvider } from "react-native-paper";
import Login from "./screens/login/Login";
import Register from "./screens/register/Register";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useEffect, useState } from "react";
import TeacherHome from "./screens/teacher/TeacherHome";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TeacherCourses from "./screens/teacher/TeacherCourses";
import StudentCourses from "./screens/student/StudentCourses";
import StudentHome from "./screens/student/StudentHome";
import AuthContext from "./store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function TeacherDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ drawerType: "back", swipeEdgeWidth: 200 }}
    >
      <Drawer.Screen name="Home" component={TeacherHome} />
      <Drawer.Screen name="Courses" component={TeacherCourses} />
    </Drawer.Navigator>
  );
}
function StudentDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ drawerType: "back", swipeEdgeWidth: 200 }}
    >
      <Drawer.Screen name="Home" component={StudentHome} />
      <Drawer.Screen name="Course" component={StudentCourses} />
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
  }, []);

  return (
    <NavigationContainer>
      <PaperProvider>
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
        ) : (
          <Stack.Navigator
            initialRouteName="Teacher Home"
            screenOptions={{
              headerMode: "screen",
              headerShown: false,
              headerTintColor: "white",
              headerStyle: { backgroundColor: "#8758FF" },
              headerTitleAlign: "center",
              headerBackVisible: false,
            }}
          >
            {Student ? (
              <Stack.Screen name="Student Home" component={StudentDrawer} />
            ) : (
              <Stack.Screen name="Teacher Home" component={TeacherDrawer} />
            )}
          </Stack.Navigator>
        )}
      </PaperProvider>
    </NavigationContainer>
  );
}
