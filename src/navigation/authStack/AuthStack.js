import Login from "../../screens/login/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  // headerShown is false here, so nothing else keeps content clear of the
  // status and navigation bars now that Android is always edge-to-edge.
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        headerMode: "screen",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#8758FF" },
        headerTitleAlign: "center",
        headerBackVisible: false,
        contentStyle: { paddingTop: insets.top, paddingBottom: insets.bottom },
      }}
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
