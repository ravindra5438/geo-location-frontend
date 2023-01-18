import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import TeacherHome from "../../screens/teacher/home/TeacherHome";
import TeacherStack from "./teacherStack/TeacherStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";
import CreateCourse from "../../screens/teacher/home/CreateCourse";

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
      <Tab.Screen name="Courses" component={TeacherStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function TeacherTab() {
  const theme = useTheme();
  return (
    <Stack.Navigator
    //   screenOptions={{
    //     headerShadowVisible: false,
    //     headerTitle: "GeoAtt",
    //     headerTintColor: theme.colors.primaryContainer,
    //     headerTitleAlign: "center",
    //     headerStyle: {
    //       backgroundColor: theme.colors.primary,
    //     },
    //   }}
    >
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
    </Stack.Navigator>
  );
}

export default TeacherTab;
