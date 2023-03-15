import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import FlatlistSingleItemContainer from "../../../components/FlatlistSingleItemContainer";
import { Button, Text } from "react-native-paper";
import Alert from "../../../components/alert";
import useAxios from "../../../services";
import * as Location from "expo-location";

const SingleCourseHome = ({ item }) => {
  const [classStarted, setClassStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const axiosInstance = useAxios();

  const styles = StyleSheet.create({
    button: {
      borderRadius: 4,
    },
    flatListComponent: {
      backgroundColor: "#CEEDC7",
    },
  });

  useEffect(() => {
    setClassStarted(item.activeClass);
  }, []);

  const endClassHandler = async (item) => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const getLocation = async (item) => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  return (
    <FlatlistSingleItemContainer
      style={classStarted && styles.flatListComponent}
    >
      <View style={{ maxWidth: "70%" }}>
        <Text variant="titleMedium">{item.courseName.toUpperCase()}</Text>
      </View>
      <View>
        {classStarted ? (
          <Button
            disabled={isLoading}
            loading={isLoading}
            style={[styles.button, { borderColor: "red" }]}
            mode="outlined"
            onPress={() => endClassHandler(item)}
            labelStyle={{ color: "red" }}
          >
            End Class
          </Button>
        ) : (
          <Button
            disabled={isLoading}
            loading={isLoading}
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
