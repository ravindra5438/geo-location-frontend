import { StyleSheet, Vibration } from "react-native";
import React, { useState } from "react";
import { useTheme, FAB } from "react-native-paper";

const FloatingActionButton = ({ onPress, icon }) => {
  const theme = useTheme();
  const [position, setPosition] = useState(true);

  const styles = StyleSheet.create({
    fab: {
      backgroundColor: theme.colors.primary,
      position: "absolute",
      margin: 16,
      bottom: 0,
    },
  });

  return (
    <FAB
      color={theme.colors.primaryContainer}
      icon={icon}
      style={[styles.fab, position ? { right: 0 } : { left: 0 }]}
      onPress={onPress}
      onLongPress={() => {
        Vibration.vibrate(50);
        setPosition(!position);
      }}
    />
  );
};

export default FloatingActionButton;
