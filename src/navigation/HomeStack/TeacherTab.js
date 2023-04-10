import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import TeacherHome from "../../screens/teacher/home/TeacherHome";
import TeacherStack from "./teacherStack/TeacherStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";
import CreateCourse from "../../screens/teacher/home/CreateCourse";
import TeacherCourses from "../../screens/teacher/courses/TeacherCourses";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function TabNav() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          color: theme.colors.primaryContainer,
          fontWeight: "600",
        },
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
        },
        tabBarIndicatorStyle: {
          height: 4,
          backgroundColor: theme.colors.primaryContainer,
        },
      }}
    >
      <Tab.Screen name="Home" component={TeacherHome} />
      <Tab.Screen name="Courses" component={TeacherCourses} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function TeacherTab() {
  const theme = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ navigation }) => ({
          headerShadowVisible: false,
          headerTitle: "GeoAtt",
          headerTintColor: theme.colors.primaryContainer,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerRight: (props) => (
            <CreateCourse {...props} navigation={navigation} />
          ),
        })}
        name="GeoAtt"
        component={TabNav}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerShown:false,
          headerShadowVisible: true,
          headerTintColor: theme.colors.primaryContainer,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
        })}
        name="Classes"
        component={TeacherStack}
      />

    </Stack.Navigator>
  );
}

export default TeacherTab;
