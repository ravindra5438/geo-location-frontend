import { Button, Text, useTheme, TextInput } from "react-native-paper";
import { useState, useContext, useEffect } from "react";
import * as Location from "expo-location";
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
import FlatlistSingleItemContainer from "../../../components/FlatlistSingleItemContainer";

const deviceHeight = Dimensions.get("window").height;
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
  const [classStarted, setClassStarted] = useState(item.activeClass);
  const [showDelete, setShowDelete] = useState(false);
  const [radius, setRadius] = useState(item.radius);
  const [showModel, setShowModel] = useState(false);
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
      backgroundColor: theme.colors.primaryContainer,
      elevation: 4,
      marginHorizontal: 8,
      marginVertical: 8,
      borderRadius: 8,
    },
    rowHandler: {
      flexDirection: "row",
    },
  });

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

  const endClassHandler = async (item) => {
    await axiosInstance
      .post(`/dismissClass`, { courseId: item._id })
      .then(function (res) {
        console.log(res.data);
        Alert("success", "SUCCESS", res.data.message);
      })
      .catch(function (error) {
        console.log(error);
        Alert("error", "Sorry", error.response.data.message);
      });
    setClassStarted(false);
  };

  const getLocation = async (item) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    axiosInstance
      .post(`/startClass`, {
        courseId: item._id,
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        radius: radius,
      })
      .then(function (res) {
        Alert("success", "SUCCESS", res.data.message);
      })
      .catch(function (error) {
        console.log(error);
        Alert("error", "Sorry", error.response.data.message);
      });
    setShowModel(false);
    setClassStarted(true);
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
          height: index === currentIndex ? 170 : 60,
          width: showDelete ? deviceWidth * 0.8 : deviceWidth,
          backgroundColor: theme.colors.primaryContainer, //index === currentIndex ? "#2DCDDF" : "#ADE792",
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
            <Text variant="titleLarge">{item.courseName.toUpperCase()}</Text>
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
                  disabled={classStarted}
                  mode="contained"
                  onPress={() => setShowModel(true)}
                  style={{
                    borderRadius: 4,
                    width: "45%",
                    // backgroundColor: "#FF597B",
                  }}
                >
                  RADIUS : {radius}
                </Button>
                {classStarted ? (
                  <Button
                    mode="outlined"
                    style={{
                      borderRadius: 4,
                      width: "43%",
                    }}
                    onPress={() => {
                      endClassHandler(item);
                    }}
                  >
                    End Class
                  </Button>
                ) : (
                  <Button
                    mode="contained"
                    style={{
                      borderRadius: 4,
                      width: "45%",
                      // backgroundColor: "#2B3467",
                    }}
                    onPress={() => {
                      getLocation(item);
                    }}
                  >
                    Start Class
                  </Button>
                )}
              </View>

              <View style={styles.rowContainer}>
                <Button
                  disabled={classStarted}
                  icon="download"
                  mode="contained"
                  style={{
                    borderRadius: 4,
                    marginTop: 4,
                    width: "45%",
                    // backgroundColor: "#2B3467",
                  }}
                  onPress={() => {
                    sendAttendanceToMail(item);
                  }}
                >
                  Attendance
                </Button>
                <Button
                  disabled={classStarted}
                  mode="contained"
                  style={{
                    borderRadius: 4,
                    marginTop: 4,
                    width: "45%",
                    // backgroundColor: "#FF597B",
                  }}
                  onPress={() =>
                    navigation.navigate("CLASSES", { courseId: item._id })
                  }
                >
                  CLASS DATA
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
          mode="flat"
          keyboardType="numeric"
          value={radius}
          onChangeText={(item) => {
            setRadius(item);
          }}
        />
        <Button
          mode="contained"
          style={{
            borderRadius: 4,
            marginTop: 8,
            // backgroundColor: "#2B3467",
          }}
          onPress={() => {
            getLocation(item);
          }}
        >
          Start Class
        </Button>
      </Moddal>

      {showDelete && (
        <Button onPress={() => deleteId(item._id)} icon="delete" />
      )}
    </View>
  );
}
