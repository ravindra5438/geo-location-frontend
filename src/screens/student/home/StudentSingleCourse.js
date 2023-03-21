import { Button, Text } from "react-native-paper";
import { useState } from "react";
import * as Location from "expo-location";
import { StyleSheet } from "react-native";
import Alert from "../../../components/alert";
import FlatlistSingleItemContainer from "../../../components/FlatlistSingleItemContainer";
import useAxios from "../../../services";
import * as Device from 'expo-device';

function StudentSingleCourse({ item }) {
  const [markAtt, setMarkAtt] = useState(false);
  const axiosInstance = useAxios();

  const styles = StyleSheet.create({
    button: {
      borderRadius: 4,
    },
  });

  const getLocation = async (item) => {
    try {
      setMarkAtt(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert("error", "Dismissed", "Permission to access location was denied");
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let deviceId = Device.osBuildId
      console.log(deviceId)

      axiosInstance
        .post(`/markAttendance`, {
          courseId: item._id,
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          deviceId:deviceId
        })
        .then(function (res) {
          console.log(res?.data);
          Alert("success", "SUCCESS", res?.data?.message);
          setMarkAtt(false);
        })
        .catch(function (error) {
          console.log(error);
          Alert("error", "Sorry", error?.response?.data?.message);
          setMarkAtt(false);
        });
    } catch (error) {
      setMarkAtt(false);
      console.log(error);
    }
  };

  return (
    <FlatlistSingleItemContainer>
      <Text variant="titleLarge">{item.courseName.toUpperCase()}</Text>
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
