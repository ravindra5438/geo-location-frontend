import StudentCourses from "../../../screens/student/StudentCourses";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { useTheme } from "react-native-paper";

const Stack = createNativeStackNavigator();

export default TeacherStack = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="COURSE"
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
      <Stack.Screen name="COURSE" component={StudentCourses} />
    </Stack.Navigator>
  );
};
