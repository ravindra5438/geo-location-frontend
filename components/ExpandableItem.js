import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useTheme, Text, List, Button, TextInput } from "react-native-paper";
import { MotiView } from "moti";

export default ExpandableItem = ({ children }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(true);

  const styles = StyleSheet.create({
    rowContainer: {
      alignItems: "center",
      paddingTop: 8,
      height: 50,
      paddingHorizontal: 8,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    container: {
      backgroundColor: theme.colors.primaryContainer,
      flexDirection: "column",
      marginHorizontal: 8,
      borderRadius: 8,
    },
  });
  return (
    <MotiView
      from={{
        height: 0,
      }}
      animate={{ height: expanded ? 170 : 60 }}
      transition={{
        type: "spring",
        duration: 600,
      }}
      style={styles.container}
    >
      <Pressable
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        <View style={styles.rowContainer}>
          <Text variant="titleLarge">mathematics</Text>
          <Text variant="titleSmall">fkjfjd</Text>

          <Button
            mode="contained"
            style={{ borderRadius: 4 }}
            onPress={() => {}}
          >
            Start Class
          </Button>
        </View>
        {expanded && (
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", delay: 300, duration: 1000 }}
          >
            <TextInput
              style={{ marginHorizontal: 8 }}
              label="Radius"
              mode="outlined"
              keyboardType="numeric"
            />
            <View style={styles.rowContainer}>
              <Button
                mode="contained"
                style={{ borderRadius: 4, marginTop: 4, width: "50%" }}
                onPress={() => {}}
              >
                Download Attendance
              </Button>
              <Button
                mode="outlined"
                style={{ borderRadius: 4, marginTop: 4, width: "50%" }}
                onPress={() => {}}
              >
                CLASS DATA
              </Button>
            </View>
          </MotiView>
        )}
      </Pressable>
    </MotiView>
  );
};
