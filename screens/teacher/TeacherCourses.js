import { Button, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { REACT_APP_URL } from "@env";
import * as Location from "expo-location";
import { useTheme } from "react-native-paper";
import { View, Dimensions, StyleSheet, FlatList } from "react-native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const data = [
  {
    name: "math",
    id: 1,
  },
  {
    name: "physics",
    id: 2,
  },
  {
    name: "hindi",
    id: 3,
  },
  {
    name: "english",
    id: 4,
  },
  {
    name: "history",
    id: 5,
  },
  {
    name: "math",
    id: 6,
  },
  {
    name: "physics",
    id: 7,
  },
  {
    name: "hindi",
    id: 8,
  },
  {
    name: "english",
    id: 9,
  },
  {
    name: "history",
    id: 10,
  },
  {
    name: "math",
    id: 11,
  },
  {
    name: "physics",
    id: 12,
  },
  {
    name: "hindi",
    id: 13,
  },
  {
    name: "english",
    id: 14,
  },
];

export default TeacherCourses = () => {
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
    courseContainerExpanded: {
      alignItems: "center",
      backgroundColor: "#874364",
      paddingVertical: 100,
      marginHorizontal: 8,
      borderRadius: 8,
      marginVertical: 8,
    },
    button: {
      borderRadius: 4,
    },
  });

  function singleItem({ item }) {
    return (
      <View style={styles.courseContainerShrink}>
        <Text variant="titleLarge">{item.name.toUpperCase()}</Text>
        <Button mode="contained" style={styles.button} onPress={getLocation}>
          Mark Attendance
        </Button>
      </View>
    );
  }

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
  };

  return (
    <View
      style={{
        width: deviceWidth,
        height: deviceHeight,
        backgroundColor: theme.colors.onError,
      }}
    >
      <FlatList
        data={data}
        renderItem={singleItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
