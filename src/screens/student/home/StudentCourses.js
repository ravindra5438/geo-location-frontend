import { Button, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useTheme } from "react-native-paper";
import { View, StyleSheet, FlatList } from "react-native";
import Alert from "../../../components/alert";
import { useIsFocused } from "@react-navigation/native";
import FlatlistSingleItemContainer from "../../../components/FlatlistSingleItemContainer";
import useAxios from "../../../services";
import myListEmpty from "../../../components/MyListEmpty";

export default StudentCourses = ({ joinCourse }) => {
  const axiosInstance = useAxios();
  const [courses, setCourses] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    axiosInstance
      .get(`/getCourses`)
      .then(function (res) {
        console.log(res.data);
        setCourses(res.data.data);
      })
      .catch(function (error) {
        console.log(error);
        Alert("error", "Sorry", error.response.data.message);
      });
  }, [isFocused, joinCourse]);
  const theme = useTheme();
  const styles = StyleSheet.create({
    button: {
      borderRadius: 4,
    },
  });

  function singleItem({ item }) {
    return (
      <FlatlistSingleItemContainer>
        <Text variant="titleLarge">{item.courseName.toUpperCase()}</Text>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => getLocation(item)}
        >
          Mark Attendance
        </Button>
      </FlatlistSingleItemContainer>
    );
  }

  const getLocation = async (item) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert("error", "Dismissed", "Permission to access location was denied");
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    axiosInstance
      .post(`/markAttendance`, {
        courseId: item._id,
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      })
      .then(function (res) {
        console.log(res?.data);
        Alert("success", "SUCCESS", res?.data?.message);
      })
      .catch(function (error) {
        console.log(error);
        Alert("error", "Sorry", error?.response?.data?.message);
      });
  };

  return (
    <View>
      <FlatList
        data={courses}
        renderItem={singleItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={myListEmpty}
      />
    </View>
  );
};
