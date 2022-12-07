import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {
  Button,
  Text,
  Portal,
  Modal,
  TextInput,
  Divider,
  useTheme,
} from "react-native-paper";
import Alert from "../../components/alert";
import { REACT_APP_URL } from "@env";
import axios from "axios";
import AuthContext from "../../store/auth-context";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default TeacherHome = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    buttonContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      height: deviceHeight,
    },
    button: {
      width: 200,
      marginVertical: 8,
      borderRadius: 8,
    },
    portalContainer: {
      backgroundColor: "white",
      alignItems: "center",
      marginHorizontal: 16,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: 4,
      borderColor: theme.colors.primary,
    },
    divider: {
      marginVertical: 8,
      width: "100%",
      height: 2,
      backgroundColor: theme.colors.primary,
    },
    headingText: {
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 80,
      marginTop: 80,
      fontSize: 20,
      fontWeight: "bold",
    },
  });

  const authCtx = React.useContext(AuthContext);
  const [portalVisibility, setPortalVisibility] = React.useState(false);
  const [courseName, setCourseName] = React.useState(null);
  const createCourseHandler = () => {
    const options = {
      method: "POST",
      url: `${REACT_APP_URL}/createCourse`,
      headers: {
        "x-access-token": authCtx.token,
      },
      data: { courseName: courseName },
    };

    axios
      .request(options)
      .then(function (res) {
        console.log(res.data);
        Alert("success", "SUCCESS", res.data.message);
      })
      .catch(function (error) {
        console.error(error);
        Alert("error", "Sorry", error.response.data.message);
      });
    setCourseName(null);
    setPortalVisibility(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Hi {authCtx.name}</Text>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => setPortalVisibility(true)}
        >
          Create Course
        </Button>
        <Button
          style={styles.button}
          mode="elevated"
          onPress={() => authCtx.logout()}
        >
          Logout
        </Button>
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
              style={styles.button}
              mode="contained"
              onPress={createCourseHandler}
            >
              Create
            </Button>
          </Modal>
        </Portal>
      </View>
    </View>
  );
};
