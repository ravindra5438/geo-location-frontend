import { Button, Text } from "react-native-paper";
import { useState } from "react";
import * as Location from "expo-location";
import { StyleSheet, View } from "react-native";
import Alert from "../../../components/alert";
import FlatlistSingleItemContainer from "../../../components/FlatlistSingleItemContainer";
import useAxios from "../../../services";
import * as Device from "expo-device";

function StudentSingleCourse({ item }) {
  const [markAtt, setMarkAtt] = useState(false);
  const axiosInstance = useAxios();

  const styles = StyleSheet.create({
    button: {
      borderRadius: 4,
    },
  });

  const getLocation = async (item, timeOut = 6000) => {
    try {
      setMarkAtt(true);
      const controller = new AbortController();

      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, timeOut);
      });

      let timmy = setTimeout(() => {
        controller.abort();
        setMarkAtt(false);
        Alert("error", "Sorry", "sorry something went wrong, please try again");
      }, timeOut);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert("error", "Dismissed", "Permission to access location was denied");
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let deviceId = Device.osBuildId;
      console.log(deviceId);

      axiosInstance
        .post(
          `/markAttendance`,
          {
            courseId: item._id,
            location: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            deviceId: deviceId,
          },
          { signal: controller.signal }
        )
        .then(function (res) {
          console.log(res?.data);
          Alert("success", "SUCCESS", res?.data?.message);
          setMarkAtt(false);
        })
        .catch(function (error) {
          console.log(error);
          setMarkAtt(false);
          if (error?.response?.data?.message) {
            Alert("error", "Sorry", error?.response?.data?.message);
          }
        })
        .then((data) => {
          clearTimeout(timmy);
        });
    } catch (error) {
      setMarkAtt(false);
      console.log(error);
    }
  };

  return (
    <FlatlistSingleItemContainer>
      <View style={{ maxWidth: "70%" }}>
        <Text variant="titleMedium">{item.courseName.toUpperCase()}</Text>
      </View>
      <Button
        mode="contained"
        disabled={!item.activeClass || markAtt}
        loading={markAtt}
        style={styles.button}
        onPress={() => getLocation(item)}
      >
        Mark
      </Button>
    </FlatlistSingleItemContainer>
  );
}

export default StudentSingleCourse;
