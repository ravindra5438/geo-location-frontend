import { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import useAxios from "../../../services";
import {
  Button,
  Modal,
  Portal,
  Divider,
  Text,
  TextInput,
  useTheme,
  Card,
  IconButton,
} from "react-native-paper";
import Alert from "../../../components/alert";
import StudentCourses from "./StudentCourses";

const deviceHeight = Dimensions.get("window").height * 0.96;

export default StudentHome = () => {
  const axiosInstance = useAxios();
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      height: deviceHeight,
      flexGrow: 1,
      backgroundColor: theme.colors.onPrimary,
    },
    courseContainer: {
      flex: 1,
      backgroundColor: theme.colors.onPrimary,
    },
    createButton: {
      width: 80,
      height: 60,
      borderRadius: 4,
    },
    createButtonContainer: {
      flex: 0.11,
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
  });

  const [courseCode, setCourseCode] = useState(null);

  const [portalVisibility, setPortalVisibility] = useState(false);

  const enrollCourseHandler = async () => {
    let courseCod;
    if (courseCode) {
      courseCod = courseCode.toLowerCase();
    }
    try {
      await axiosInstance
        .post(`/enrollCourse`, { courseCode: courseCod })
        .then((res) => {
          Alert("success", "success", res.data.message);
        })
        .catch((err) => {
          Alert("error", "Sorry!!", err.response.data.message);
        });
      setPortalVisibility(false);
      setCourseCode(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.courseContainer}>
        <StudentCourses />
      </Card>
      <View style={styles.createButtonContainer}>
        <IconButton
          size={40}
          iconColor={theme.colors.primaryContainer}
          backgroundColor={theme.colors.primary}
          icon="plus"
          style={styles.createButton}
          onPress={() => setPortalVisibility(true)}
        />
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
              Join Course
            </Text>
          </View>
          <Divider bold={true} style={styles.divider} />
          <TextInput
            style={{
              width: "100%",
              textAlign: "center",
              justifyContent: "center",
            }}
            value={courseCode}
            mode="outlined"
            label="Course Code"
            onChangeText={(text) => setCourseCode(text)}
          />
          <Button
            style={{ borderRadius: 8, width: "60%", marginTop: 16 }}
            mode="contained"
            onPress={enrollCourseHandler}
          >
            Join
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};
