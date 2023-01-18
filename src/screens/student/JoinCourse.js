import { View, StyleSheet } from "react-native";
import { useState } from "react";
import Alert from "../../components/alert";
import useAxios from "../../services";
import {
  Button,
  Modal,
  Portal,
  Divider,
  Text,
  useTheme,
  TextInput,
  IconButton,
} from "react-native-paper";

const JoinCourse = ({ navigation, route }) => {
  const [portalVisibility, setPortalVisibility] = useState(false);
  const [courseCode, setCourseCode] = useState(null);
  const axiosInstance = useAxios();
  const theme = useTheme();
  const [joinCourse, setJoinCourse] = useState(0);

  const styles = StyleSheet.create({
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
          setJoinCourse(Math.random());
        })
        .catch((err) => {
          Alert("error", "Sorry!!", err.response.data.message);
        });
      setPortalVisibility(false);
      setCourseCode(null);
    } catch (err) {
      console.log(err);
    }
    navigation.navigate("Home", { joinCourse: joinCourse });
  };

  return (
    <View>
      <IconButton
        iconColor={theme.colors.primaryContainer}
        icon="plus"
        onPress={() => setPortalVisibility(true)}
      />
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

export default JoinCourse;
