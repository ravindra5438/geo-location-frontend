import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { View, StyleSheet, Dimensions } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import useAxios from "../../../services";
import CoursesHome from "./CoursesHome";

const deviceHeight = Dimensions.get("window").height * 0.93;

export default TeacherHome = () => {
  const axiosInstance = useAxios();
  const theme = useTheme();
  const isFocused = useIsFocused();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 4,
      flex: 1,
      backgroundColor: theme.colors.onPrimary,
    },
  });

  const [courses, setCourses] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get("/getCourses")
      .then(function (res) {
        console.log("courses from Home", res.data);
        setCourses(res?.data?.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log("error", error);
        setIsLoading(false);
      });
  }, [isFocused]);
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="red"
          style={{
            flex: 1,
            marginTop: deviceHeight * 0.4,
          }}
        />
      ) : (
        <CoursesHome courses={courses} />
      )}
    </View>
  );
};
