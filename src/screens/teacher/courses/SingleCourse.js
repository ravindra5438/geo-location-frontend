import {
  Button,
  Text,
  useTheme,
  TextInput,
  IconButton,
} from "react-native-paper";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  Vibration,
} from "react-native";
import Alert from "../../../components/alert";
import { MotiView } from "moti";
import Moddal from "../../../components/Moddal";
import useAxios from "../../../services";
import * as DocumentPicker from "expo-document-picker";

const deviceWidth = Dimensions.get("window").width * 0.96;

export default function SingleCourse({
  item,
  navigation,
  index,
  deleteId,
  currentIndex,
  setCurrentIndex,
}) {
  const theme = useTheme();
  const [showDelete, setShowDelete] = useState(false);
  const [radius, setRadius] = useState(item.radius);
  const [showModel, setShowModel] = useState(false);
  const [courseLock, setCourseLock] = useState(item.isActive);
  const axiosInstance = useAxios();

  const styles = StyleSheet.create({
    rowContainer: {
      alignItems: "center",
      paddingTop: 8,
      height: 50,
      paddingHorizontal: 8,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    container: {
      elevation: 4,
      marginHorizontal: 8,
      marginVertical: 8,
      borderRadius: 8,
    },
    rowHandler: {
      flexDirection: "row",
    },
    button: {
      borderRadius: 4,
      width: "45%",
    },
  });

  const filePickerHandler = async () => {
    const DocumentResult = await DocumentPicker.getDocumentAsync({
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  };

  const sendAttendanceToMail = async (item) => {
    await axiosInstance
      .get(`/sendAttendanceViaMail?courseId=${item._id}`)
      .then(function (res) {
        console.log(res.data);
        Alert("success", "SUCCESS", res?.data?.message);
      })
      .catch(function (error) {
        console.log(error);
        Alert("error", "Sorry", error?.response?.data?.message);
      });
  };

  const courseLockHandler = async (toggle) => {
    await axiosInstance
      .post("/toggleCourseEnrollment", { courseId: item._id, toggle: toggle })
      .then((res) => {
        console.log(res.data);
        Alert("success", "SUCCESS", res?.data?.message);
        setCourseLock(!courseLock);
      })
      .catch((error) => {
        console.log(error);
        Alert("error", "Sorry", error?.response?.data?.message);
      });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <MotiView
        animate={{
          height: index === currentIndex ? 210 : 60,
          width: showDelete ? deviceWidth * 0.8 : deviceWidth,
          backgroundColor: item.activeClass
            ? "#CEEDC7"
            : theme.colors.primaryContainer,
        }}
        transition={{
          type: "spring",
        }}
        style={styles.container}
      >
        <Pressable
          onLongPress={() => {
            setShowDelete(!showDelete);
            Vibration.vibrate(50);
          }}
          onPress={() => {
            setShowDelete(false);
            setCurrentIndex(index === currentIndex ? null : index);
          }}
        >
          <View style={styles.rowContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text variant="titleLarge">{item.courseName.toUpperCase()}</Text>
              {courseLock ? (
                <IconButton
                  iconColor="red"
                  size={20}
                  icon="lock"
                  onPress={() => {
                    courseLockHandler(courseLock);
                  }}
                />
              ) : (
                <IconButton
                  iconColor="green"
                  size={20}
                  icon="lock-open"
                  onPress={() => {
                    courseLockHandler(courseLock);
                  }}
                />
              )}
            </View>
            <Text variant="titleSmall">{item.courseCode}</Text>
          </View>
          {index === currentIndex && (
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 300 }}
            >
              <View style={styles.rowContainer}>
                <Button
                  disabled={item.activeClass}
                  mode="contained"
                  onPress={() => setShowModel(true)}
                  style={styles.button}
                  icon="radius"
                >
                  RADIUS : {radius}
                </Button>
                <Button
                  disabled={item.activeClass}
                  mode="contained"
                  icon="plus"
                  style={styles.button}
                  onPress={() => {
                    filePickerHandler();
                  }}
                >
                  Add Students
                </Button>
              </View>

              <View style={styles.rowContainer}>
                <Button
                  disabled={item.activeClass}
                  icon="download"
                  mode="contained"
                  style={styles.button}
                  onPress={() => {
                    sendAttendanceToMail(item);
                  }}
                >
                  Attendance
                </Button>
                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate("CLASSES", { courseId: item._id })
                  }
                  icon="table"
                >
                  CLASS DATA
                </Button>
              </View>
              <Button
                style={{
                  borderRadius: 4,
                  width: "96%",
                  alignSelf: "center",
                  marginTop: 8,
                }}
                onPress={() =>
                  navigation.navigate("Enrolled Students", {
                    courseId: item._id,
                  })
                }
                mode="contained"
                icon="group"
              >
                Enrolled Students
              </Button>
            </MotiView>
          )}
        </Pressable>
      </MotiView>
      <Moddal showModel={showModel} setShowModel={setShowModel}>
        <TextInput
          label="Radius"
          backgroundColor={"#D4F6CC"}
          borderRadius={4}
          maxLength={3}
          mode="flat"
          keyboardType="numeric"
          onChangeText={(text) => {
            setRadius(text);
          }}
        />
        <Button
          mode="contained"
          style={{
            borderRadius: 4,
            marginTop: 8,
          }}
          onPress={() => {
            // getLocation(item);
          }}
        >
          Set Radius
        </Button>
      </Moddal>

      {showDelete && (
        <Button onPress={() => deleteId(item._id)} icon="delete" />
      )}
    </View>
  );
}
