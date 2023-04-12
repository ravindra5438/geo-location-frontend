import {
  Button,
  Text,
  useTheme,
  TextInput,
  IconButton,
} from "react-native-paper";
import { useEffect, useState } from "react";
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
import * as Location from "expo-location";
import NotifyModal from "../../../components/NotifyModal";

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
  const [classStarted, setClassStarted] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const axiosInstance = useAxios();

  const styles = StyleSheet.create({
    rowContainer: {
      margin: 3,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    container: {
      margin: 8,
      paddingHorizontal: 8,
      borderRadius: 8,
      justifyContent: "center",
      overflow: "hidden",
      elevation: 3,
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
    try {
      if (DocumentResult.type === "success") {
        const data = new FormData();

        data.append("emails", {
          name: DocumentResult.name,
          type: DocumentResult.mimeType,
          uri: DocumentResult.uri,
        });
        data.append("courseId", item._id);

        console.log(data);

        await axiosInstance
          .post("/inviteStudentsToEnrollCourse", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            Alert("success", "Success", res?.data?.message);
          })
          .catch((err) => {
            Alert("error", "sorry", err?.response?.data?.message);
          });
      }
      return;
    } catch {
      (error) => {
        console.log(error);
      };
    }
  };

  useEffect(() => {
    setClassStarted(item.activeClass);
  }, [item.activeClass]);

  const sendAttendanceToMail = async (item) => {
    await axiosInstance
      .get(`/sendAttendanceViaMail?courseId=${item._id}`)
      .then(function (res) {
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
        Alert("success", "SUCCESS", res?.data?.message);
        setCourseLock(!courseLock);
      })
      .catch((error) => {
        console.log(error);
        Alert("error", "Sorry", error?.response?.data?.message);
      });
  };

  const getLocation = async (item, timeOut = 6000) => {
    const controller = new AbortController();

    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, timeOut);
    });

    let timmy = setTimeout(() => {
      controller.abort();
      setShowModel(false);
      Alert("error", "Sorry", "sorry something went wrong, please try again");
    }, timeOut);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    axiosInstance
      .post(
        `/startClass`,
        {
          courseId: item._id,
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          radius: radius,
        },
        {
          signal: controller.signal,
        }
      )
      .then(function (res) {
        setClassStarted(true);
        setShowModel(false);
        Alert("success", "SUCCESS", res.data.message);
      })
      .catch(function (error) {
        setShowModel(false);
        if (error?.response?.data?.message) {
          Alert("error", "Sorry", error?.response);
        }
        console.log(error);
      })
      .then((data) => {
        clearTimeout(timmy);
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
          backgroundColor: classStarted
            ? "#CEEDC7"
            : theme.colors.primaryContainer,
        }}
        transition={{
          type: "timing",
          duration: 200,
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
            <Text
              style={{ maxWidth: "62%", textAlign: "left" }}
              variant="titleMedium"
              numberOfLines={2}
            >
              {item.courseName.toUpperCase()}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {courseLock ? (
                <IconButton
                  iconColor="green"
                  size={20}
                  icon="lock-open"
                  onPress={() => {
                    courseLockHandler(!courseLock);
                  }}
                />
              ) : (
                <IconButton
                  iconColor="red"
                  size={20}
                  icon="lock"
                  onPress={() => {
                    courseLockHandler(!courseLock);
                  }}
                />
              )}
              <Text variant="titleSmall">{item.courseCode}</Text>
            </View>
          </View>
          {index === currentIndex && (
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 300, delay: 200 }}
            >
              <View style={styles.rowContainer}>
                <Button
                  disabled={classStarted}
                  mode="contained"
                  onPress={() => setShowModel(true)}
                  style={styles.button}
                  icon="radius"
                >
                  Radius : {radius}
                </Button>
                <Button
                  disabled={classStarted}
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
                  disabled={classStarted}
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
                  icon="table"
                  onPress={() => {
                    navigation.navigate("Classes", {
                      screen: "CLASSES",
                      params: { courseId: item._id },
                    });
                  }}
                >
                  ClassInfo
                </Button>
              </View>
              <View style={styles.rowContainer}>
                <Button
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate("Classes", {
                      screen: "Enrolled Students",
                      params: { courseId: item._id },
                    });
                  }}
                  mode="contained"
                  icon="account-supervisor"
                >
                  Enrolled
                </Button>
                <Button
                  style={styles.button}
                  mode="contained"
                  icon="message"
                  onPress={() => {
                    navigation.navigate("Classes", {
                      screen: "NOTIFY",
                      params: { courseId: item._id },
                    });
                  }}
                >
                  {" "}
                  Notify
                </Button>
              </View>
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
          autoFocus={true}
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
            getLocation(item);
          }}
        >
          Start Class
        </Button>
      </Moddal>
      <NotifyModal
        courseId={item._id}
        showNotifyModal={showNotifyModal}
        setShowNotifyModal={setShowNotifyModal}
      />
      {showDelete && (
        <Button onPress={() => deleteId(item._id)} icon="delete" />
      )}
    </View>
  );
}
