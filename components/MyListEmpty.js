import { View, Dimensions } from "react-native";
import { Text, useTheme } from "react-native-paper";

const deviceHeight = Dimensions.get("window").height;

export default MyListEmpty = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: deviceHeight * 0.8,
      }}
    >
      <Text style={{ color: theme.colors.error }}>No Data found</Text>
    </View>
  );
};
