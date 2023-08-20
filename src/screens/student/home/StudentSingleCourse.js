import { Button, IconButton, Text ,useTheme} from "react-native-paper";
import { useState } from "react";
import * as Location from "expo-location";
import { StyleSheet, View } from "react-native";
import Alert from "../../../components/alert";
import FlatlistSingleItemContainer from "../../../components/FlatlistSingleItemContainer";
import useAxios from "../../../services";
import * as Device from "expo-device";
import { useNavigation } from "@react-navigation/native";
import Moddal from "../../../components/Moddal";

function StudentSingleCourse({ item }) {
  const [markAtt, setMarkAtt] = useState(false);
  const axiosInstance = useAxios();
  const navigation = useNavigation();
  const [displayCard,setDisplayCard] = useState(false);
  const [showModel,setShowModel] = useState(false);

  const styles = StyleSheet.create({
    button: {
      borderRadius: 4,
    },
  });

  const getLocation = async (item, timeOut = 15000) => {
    const controller = new AbortController();

    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, timeOut);
    });

    let timmy = setTimeout(() => {
      controller.abort();
      setMarkAtt(false);
      Alert("error", "Sorry", "little busy, please try again");
    }, timeOut);

    try {
      setMarkAtt(true);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert("error", "Dismissed", "Permission to access location was denied");
        console.log("Permission to access location was denied");
        setMarkAtt(false);
        clearTimeout(timmy);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let deviceId = Device.osBuildId;
      console.log(deviceId);

      axiosInstance
        .put(
          `/class`,
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
          clearTimeout(timmy);
          Alert("success", "SUCCESS", res?.data?.message);
          setMarkAtt(false);
        })
        .catch(function (error) {
          console.log(error);
          clearTimeout(timmy);
          setMarkAtt(false);
          if (error?.response?.data?.message) {
            Alert("error", "Sorry", error?.response?.data?.message);
          }
        });
    } catch (error) {
      setMarkAtt(false);
      clearTimeout(timmy);
      console.log(error);
    }
  };

  const leaveCourseHandler = async (courseId) => {
    axiosInstance.put(`/course/${courseId}`)
      .then((res) => {
        console.log(res.data)
        Alert("success", "SUCCESS", res?.data?.message);
        setDisplayCard(true);
      })
      .catch((err) => {
        Alert("error", "Sorry", err?.response?.data?.message);
      });
  };





  return (
    <FlatlistSingleItemContainer style={{marginBottom:20,display:displayCard?"none":"flex"}}>
      <View style={{ maxWidth: "70%" }}>
        <Text variant="titleMedium">{item.courseName.toUpperCase()}</Text>
      </View>
      <View style={{position:"absolute",flexDirection:"row",bottom:-24}}>
        <IconButton
          icon="bell-alert-outline"
          iconColor="red"
          size={20}
          onPress={() =>
            navigation.navigate("Notifications", {
              courseId: item._id,
            })
          }
        />
        <IconButton
          icon="account-minus-outline"
          iconColor="red"
          size={20}
          onPress={() => {
            setShowModel(true);
          }}
        />
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
      <Moddal showModel={showModel} setShowModel={setShowModel} style={{padding:16}}>
        <Text style={{textAlign:'center',color:'grey'}}>Are you sure,you want to unenroll from this course?</Text>
        <Button textColor="red" onPress={() => {
          leaveCourseHandler(item._id);
          setShowModel(false);
          }}>delete</Button>
      </Moddal>
    </FlatlistSingleItemContainer>
  );
}

export default StudentSingleCourse;
