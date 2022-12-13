import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

export default FlatlistSingleItemContainer = ({ children }) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    courseContainerShrink: {
      alignItems: "center",
      paddingVertical: 8,
      paddingHorizontal: 8,
      marginHorizontal: 16,
      borderRadius: 8,
      marginVertical: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: theme.colors.secondaryContainer,
    },
  });
  return <View style={styles.courseContainerShrink}>{children}</View>;
};
