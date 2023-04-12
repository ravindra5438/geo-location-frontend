import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";
import StudentHome from "../../screens/student/home/StudentHome";
import JoinCourse from "../../screens/student/JoinCourse";
import Notification from "../../screens/student/home/notification/Notification";

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
      <Tab.Screen name="Home" component={StudentHome} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function StudentTab() {
  const theme = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ navigation, route }) => ({
          headerShadowVisible: false,
          headerTitle: "GeoAtt",
          headerTintColor: theme.colors.primaryContainer,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerRight: (props) => (
            <JoinCourse navigation={navigation} route={route} {...props} />
          ),
        })}
        name="GeoAtt"
        component={TabNav}
      />
      <Stack.Screen
        options={({ navigation}) => ({
          headerTitle: "Notifications",
          headerTintColor: theme.colors.primaryContainer,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: theme.colors.primary,
          }
        })}
        name="Notifications"
        component={Notification}
      />
    </Stack.Navigator>
  );
}

export default StudentTab;
