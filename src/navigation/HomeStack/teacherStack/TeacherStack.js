import TeacherCourses from "../../../screens/teacher/courses/TeacherCourses";
import Classes from "../../../screens/teacher/classes/Classes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";
import StudentPerClass from "../../../screens/teacher/students/StudentPerClass";
import StudentsEnrolled from "../../../screens/teacher/students/StudentsEnrolled";

const Stack = createNativeStackNavigator();

export default TeacherStack = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="COURSE"
      detachInactiveScreens={true}
      screenOptions={{
        headerShown: false,
        headerMode: "screen",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTitleStyle: {
          fontWeight: "700",
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="COURSE" component={TeacherCourses} />
      <Stack.Screen name="CLASSES" component={Classes} />
      <Stack.Screen name="STUDENTS" component={StudentPerClass} />
      <Stack.Screen name="Enrolled Students" component={StudentsEnrolled} />
    </Stack.Navigator>
  );
};
