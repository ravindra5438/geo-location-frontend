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
  Card,
} from "react-native-paper";
import Alert from "../../components/alert";
import AuthContext from "../../store/auth-context";
import { Avatar } from "react-native-paper";
import useAxios from "../../services";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default TeacherHome = ({ navigation }) => {
  const axiosInstance = useAxios();
  const theme = useTheme();

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
      justifyContent: "space-between",
      padding: 20,
      flexGrow: 1,
      flexDirection: "row",
      borderRadius: 40,
      backgroundColor: theme.colors.primary,
    },
    container: {
      height: deviceHeight,
      backgroundColor: theme.colors.onPrimary,
    },
    button: {
      width: 200,
      borderRadius: 8,
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

  const authCtx = React.useContext(AuthContext);
  const [portalVisibility, setPortalVisibility] = React.useState(false);
  const [courseName, setCourseName] = React.useState(null);
  const createCourseHandler = async () => {
    await axiosInstance
      .post("/createCourse", { courseName: courseName })
      .then(function (res) {
        console.log(res?.data);
        Alert("success", "SUCCESS", res?.data?.message);
      })
      .catch(function (error) {
        console.log(error);
        Alert("error", "Sorry", error?.response?.data?.message);
      });
    setCourseName(null);
    setPortalVisibility(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Avatar.Text
          style={{ backgroundColor: "transparent" }}
          size={deviceWidth / 2}
          label={authCtx?.name?.charAt(0)?.toUpperCase()}
        />
        <Text style={styles.headingText}>
          {authCtx?.name?.toUpperCase().slice(1)}
        </Text>
        <Text style={styles.hello}>HELLO</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => setPortalVisibility(true)}
        >
          CREATE COURSE
        </Button>
      </View>
      <View style={styles.courseNameContainer}>
        <Card style={{ width: "40%", height: 100 }} />

        <Card style={{ width: "40%", height: 100 }} />
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
