import axios from "axios";
import { useContext, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
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
import Alert from "../../components/alert";
import AuthContext from "../../store/auth-context";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default StudentHome = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    buttonContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      height: deviceHeight,
      flex: 1,
      backgroundColor: theme.colors.onPrimary,
    },
    profileContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
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
      marginTop: 30,
      fontSize: 30,
      fontWeight: "bold",
      color: theme.colors.primary,
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
      await axios({
        url: `${REACT_APP_URL}/enrollCourse`,
        method: "post",
        data: {
          courseCode: courseCod,
        },
        headers: { "x-access-token": authCtx.token },
      })
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
          size={deviceWidth / 2}
          label={authCtx?.name?.charAt(0)?.toUpperCase()}
        />
        <Text style={styles.headingText}>
          Hello {authCtx?.name?.toUpperCase()}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => setPortalVisibility(true)}
        >
          Join Course
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
            style={styles.button}
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
