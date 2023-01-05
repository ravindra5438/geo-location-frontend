import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import FlatlistSingleItemContainer from "../../../components/FlatlistSingleItemContainer";
import { Button, Text } from "react-native-paper";
import Alert from "../../../components/alert";
import useAxios from "../../../services";
import * as Location from "expo-location";

const SingleCourseHome = ({ item }) => {
  const [classStarted, setClassStarted] = useState(item.activeClass);
  const axiosInstance = useAxios();

  const styles = StyleSheet.create({
    button: {
      borderRadius: 4,
    },
    flatListComponent: {
      backgroundColor: "#F9F9F9",
    },
  });

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
        radius: 25,
      })
      .then(function (res) {
        Alert("success", "SUCCESS", res.data.message);
        setClassStarted(true);
      })
      .catch(function (error) {
        console.log(error);
        Alert("error", "Sorry", error.response.data.message);
      });
  };

  return (
    <FlatlistSingleItemContainer
      style={classStarted ? styles.flatListComponent : null}
    >
      <View>
        <Text variant="titleLarge">{item.courseName}</Text>
      </View>
      <View>
        {classStarted ? (
          <Button
            style={styles.button}
            mode="outlined"
            onPress={() => endClassHandler(item)}
          >
            End Class
          </Button>
        ) : (
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => getLocation(item)}
          >
            START
          </Button>
        )}
      </View>
    </FlatlistSingleItemContainer>
  );
};

export default SingleCourseHome;
