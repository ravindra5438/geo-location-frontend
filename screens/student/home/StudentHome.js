import axios from "axios";
import { useContext, useState } from "react";
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
  Avatar,
} from "react-native-paper";
import { REACT_APP_URL } from "@env";
import Alert from "../../../components/alert";
import AuthContext from "../../../store/auth-context";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default StudentHome = () => {
  const axiosInstance = useAxios();
  const theme = useTheme();
  const styles = StyleSheet.create({
    buttonContainer: {
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
      backgroundColor: theme.colors.primary,
      borderTopRightRadius: 80,
      borderTopLeftRadius: 80,
    },
    container: {
      height: deviceHeight,
      flexGrow: 1,
      backgroundColor: theme.colors.onPrimary,
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
    button: {
      width: 100,
      height: 100,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
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

  const authCtx = useContext(AuthContext);
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
      <View style={{ flexGrow: 2 }} />
      <View style={styles.buttonContainer}>
        <Button
          contentStyle={{ width: 100, height: 100 }}
          style={styles.button}
          mode="contained-tonal"
          onPress={() => setPortalVisibility(true)}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: theme.colors.primary,
            }}
          >
            JOIN
          </Text>
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
