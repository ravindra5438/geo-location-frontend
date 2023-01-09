import Icon from "react-native-vector-icons/FontAwesome";
import { View } from "react-native";
import { Text, Divider, useTheme } from "react-native-paper";

export default ProfileFlatlistComponent = ({ text, icon }) => {
  const theme = useTheme();
  return (
    <View>
      <View style={{ flexDirection: "row", height: 70, alignItems: "center" }}>
        <View
          style={{
            marginHorizontal: 16,
            width: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name={icon} size={30} color={theme.colors.primary} />
        </View>
        <View style={{}}>
          <Text variant="headlineSmall" style={{ color: "#0081C9" }}>
            {text}
          </Text>
        </View>
      </View>
      <Divider bold={true} />
    </View>
  );
};
