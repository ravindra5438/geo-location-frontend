import TeacherCourses from "./TeacherCourses";
import Classes from "./Classes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { useTheme } from "react-native-paper";
import StudentPerClass from "./StudentPerClass";

const Stack = createNativeStackNavigator();

export default TeacherStack = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="COURSE"
      detachInactiveScreens={true}
      screenOptions={{
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
        headerLeft: () => (
          <DrawerToggleButton tintColor={theme.colors.onPrimary} />
        ),
      }}
    >
      <Stack.Screen name="COURSE" component={TeacherCourses} />
      <Stack.Screen name="CLASSES" component={Classes} />
      <Stack.Screen name="STUDENTS" component={StudentPerClass} />
    </Stack.Navigator>
  );
};
