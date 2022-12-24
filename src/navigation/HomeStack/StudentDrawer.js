import StudentHome from "../../screens/student/home/StudentHome";
import CustomDrawer from "../../components/CustomDrawer";
import StudentStack from "./studentStack/StudentStack";
import { useTheme } from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export default StudentDrawer = () => {
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
        component={StudentHome}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name="COURSES"
        component={StudentStack}
      />
    </Drawer.Navigator>
  );
};
