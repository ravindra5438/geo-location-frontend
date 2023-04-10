import TeacherCourses from "../../../screens/teacher/courses/TeacherCourses";
import Classes from "../../../screens/teacher/classes/Classes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";
import StudentPerClass from "../../../screens/teacher/students/StudentPerClass";
import StudentsEnrolled from "../../../screens/teacher/students/StudentsEnrolled";
import PushNotification from "../../../screens/teacher/courses/notify/PushNotification";

const Stack = createNativeStackNavigator();

export default TeacherStack = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="COURSE"
      detachInactiveScreens={true}
      screenOptions={{
        headerShown:true,
        headerMode: "screen",
        headerTintColor: theme.colors.primaryContainer,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        animation:"fade_from_bottom",
        headerTitleStyle: {
          fontWeight: "700",
        },
        headerTitleAlign: "center",
      }}
    >
      {/* <Stack.Screen name="COURSE" component={TeacherCourses} /> */}
      <Stack.Screen name="CLASSES" component={Classes} />
      <Stack.Screen options={{
        headerTitleAlign:'left',
      }} name="STUDENTS" component={StudentPerClass} />
      <Stack.Screen name="Enrolled Students" component={StudentsEnrolled} />
      <Stack.Screen name="NOTIFY" component={PushNotification} />
    </Stack.Navigator>
  );
};
