import { useTheme } from "react-native-paper";
import TeacherHome from "../../screens/teacher/home/TeacherHome";
import TeacherStack from "./teacherStack/TeacherStack";
import CustomDrawer from "../../components/CustomDrawer";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../../screens/profile/ProfileScreen";

const Drawer = createDrawerNavigator();

export default TeacherDrawer = (props) => {
  const theme = useTheme();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="HOME"
      detachInactiveScreens={true}
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
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="PROFILE"
        component={ProfileScreen}
      />
    </Drawer.Navigator>
  );
};
