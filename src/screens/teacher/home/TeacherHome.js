import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { View, StyleSheet, Dimensions } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {
  Button,
  Text,
  Portal,
  Modal,
  TextInput,
  Divider,
  useTheme,
  Card,
} from "react-native-paper";
import Alert from "../../../components/alert";
import useAxios from "../../../services";
import Icon from "react-native-vector-icons/FontAwesome";
import CoursesHome from "./CoursesHome";

const deviceHeight = Dimensions.get("window").height * 0.93;

export default TeacherHome = ({ navigation }) => {
  const axiosInstance = useAxios();
  const theme = useTheme();
  const isFocused = useIsFocused();

  const styles = StyleSheet.create({
    buttonContainer: {
      justifyContent: "center",
      marginVertical: "7%",
      alignItems: "center",
    },
    profileContainer: {
      marginTop: "10%",
      alignItems: "center",
      width: "80%",
      height: 150,
      justifyContent: "center",
      alignSelf: "center",
      backgroundColor: theme.colors.primary,
      borderTopRightRadius: 60,
      borderBottomLeftRadius: 60,
    },
    courseNameContainer: {
      backgroundColor: theme.colors.onPrimary,
      maxHeight: deviceHeight * 0.9,
      marginVertical: 10,
      flexGrow: 1,
    },
    container: {
      paddingHorizontal: 4,
      height: deviceHeight,
      backgroundColor: theme.colors.onPrimary,
    },
    button: {
      padding: 0,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    portalContainer: {
      backgroundColor: "white",
      alignItems: "center",
      marginHorizontal: 16,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    divider: {
      marginVertical: 8,
      width: "100%",
      height: 2,
      backgroundColor: theme.colors.primary,
    },
    headingText: {
      fontSize: 20,
      fontWeight: "bold",
      position: "absolute",
      left: "59%",
      bottom: "25%",
      color: "#fff",
      borderBottomWidth: 3,
      borderBottomColor: "#fff",
    },
    hello: {
      position: "absolute",
      fontSize: 20,
      fontWeight: "bold",
      top: "25%",
      left: "25%",
      color: "#fff",
      borderTopWidth: 3,
      borderTopColor: "#fff",
    },
  });

  const [portalVisibility, setPortalVisibility] = useState(false);
  const [courseName, setCourseName] = useState(null);
  const [courses, setCourses] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [courseCreated, setCourseCreated] = useState(false);

  const createCourseHandler = async () => {
    await axiosInstance
      .post("/createCourse", { courseName: courseName })
      .then(function (res) {
        console.log(res?.data);
        Alert("success", "SUCCESS", res?.data?.message);
        setCourseCreated(!courseCreated);
      })
      .catch(function (error) {
        console.log(error);
        Alert("error", "Sorry", error?.response?.data?.message);
      });
    setCourseName(null);
    setPortalVisibility(false);
  };

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
  }, [isFocused, courseCreated]);
  return (
    <View style={styles.container}>
      <Card style={styles.courseNameContainer}>
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
      </Card>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => setPortalVisibility(true)}
          labelStyle={{ lineHeight: 30, letterSpacing: 0 }}
        >
          <Icon name="plus" size={20} />
        </Button>
      </View>
      <Portal>
        <Modal
          visible={portalVisibility}
          onDismiss={() => setPortalVisibility(false)}
          contentContainerStyle={styles.portalContainer}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              variant="titleLarge"
              style={{ color: theme.colors.primary, fontWeight: "700" }}
            >
              Create Course
            </Text>
          </View>
          <Divider bold={true} style={styles.divider} />
          <TextInput
            style={{ width: "100%" }}
            mode="outlined"
            value={courseName}
            label="Course Name"
            onChangeText={(text) => {
              setCourseName(text);
            }}
          />
          <Button
            style={{ width: "60%", borderRadius: 8, marginTop: 16 }}
            mode="contained"
            onPress={createCourseHandler}
          >
            Create
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};
