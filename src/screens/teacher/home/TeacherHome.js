import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { View, StyleSheet, Dimensions } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import useAxios from "../../../services";
import CoursesHome from "./CoursesHome";


export default TeacherHome = () => {
  const axiosInstance = useAxios();
  const theme = useTheme();
  const isFocused = useIsFocused();
  const [courses, setCourses] = useState(null);

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 8,
      flex: 1,
      backgroundColor: theme.colors.onPrimary,
    },
  });

  useEffect(() => {
    axiosInstance
      .get("/getCourses")
      .then(function (res) {
        console.log("courses from Home", res.data);
        setCourses(res?.data?.data);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <CoursesHome courses={courses} />
    </View>
  );
};
