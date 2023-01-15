import Icon from "react-native-vector-icons/FontAwesome";
import { View } from "react-native";
import { Text, Divider, useTheme } from "react-native-paper";

export default ProfileFlatlistComponent = ({ text, icon }) => {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: "row", height: 70, alignItems: "center" }}>
      <View
        style={{
          marginHorizontal: 16,
          width: 40,
          height: 40,
          borderRadius: 4,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.primary,
        }}
      >
        <Icon name={icon} size={20} color={theme.colors.primaryContainer} />
      </View>
      <View style={{}}>
        <Text variant="bodyLarge" style={{ color: theme.colors.primary }}>
          {text}
        </Text>
      </View>
    </View>
  );
};
