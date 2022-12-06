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
    },
  });

  const authCtx = useContext(AuthContext);
  const [courseCode, setCourseCode] = useState(null);

  const [portalVisibility, setPortalVisibility] = useState(false);

  const enrollCourseHandler = async () => {
    console.log(authCtx.token);
    try {
      await axios({
        url: `${REACT_APP_URL}/enrollCourse`,
        method: "post",
        data: {
          courseCode: courseCode.toLowerCase(),
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
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => setPortalVisibility(true)}
        >
          Join Course
        </Button>
        <Button style={styles.button} mode="elevated">
          class
        </Button>
      </View>
      <Portal>
        <Modal
          visible={portalVisibility}
          onDismiss={() => setPortalVisibility(false)}
          contentContainerStyle={styles.portalContainer}
        >
          <View style={{ alignItems: "center" }}>
            <Text variant="titleLarge" style={{ color: theme.colors.primary }}>
              Join Course
            </Text>
          </View>
          <Divider bold={true} style={styles.divider} />
          <TextInput
            style={{ width: "100%" }}
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
