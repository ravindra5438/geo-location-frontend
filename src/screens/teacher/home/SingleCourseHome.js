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
    console.log(item.activeClass);
    setClassStarted(item.activeClass)
  }, [item.activeClass])

  const endClassHandler = async (item) => {
    try {
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
    } catch (error) {
      console.log(error);
    }

  };

  const getLocation = async (item, timeOut = 6000) => {
    const controller = new AbortController();

      new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, timeOut);
      });

      let timmy = setTimeout(() => {
        controller.abort();
        setIsLoading(false);
        Alert("error", "Sorry", "little busy,please try again");
      }, timeOut);

    try {
      setIsLoading(true);
      
      Location.requestForegroundPermissionsAsync().
      then(res => {
        console.log(res.status)
      }).catch(err => {
        clearTimeout();
        return;
      })
      Location.enableNetworkProviderAsync().then(res=>console.log("\n\n\nRajeev",res,"\n\n\nRajeev"))
      
      let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true,accuracy: Location.Accuracy.Highest});
      console.log("\n\nlocation\n\n", location)


      axiosInstance
        .post(`/startClass`, {
          courseId: item._id,
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          radius: item.radius,
        }, {
          signal: controller.signal
        })
        .then(function (res) {
          setClassStarted(true);
          clearTimeout(timmy);
          setIsLoading(false)
          Alert("success", "SUCCESS", res.data.message);
        })
        .catch(function (error) {
          setIsLoading(false)
          clearTimeout(timmy);
          if (error?.response?.data?.message) {
            Alert("error", "Sorry", error?.response?.data?.message);
          }
          console.log(error);
        })
    } catch (error) {
      setIsLoading(false);
      clearTimeout(timmy);
      console.log(error)
    }
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
            End
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
