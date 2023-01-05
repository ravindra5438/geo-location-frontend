import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

export default FlatlistSingleItemContainer = ({ children, style }) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    courseContainer: {
      alignItems: "center",
      paddingVertical: 8,
      paddingHorizontal: 8,
      marginHorizontal: 16,
      borderRadius: 8,
      elevation: 3,
      marginVertical: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: theme.colors.primaryContainer,
    },
  });
  return <View style={[styles.courseContainer, style]}>{children}</View>;
};
