import { Button, Text } from "react-native-paper";
import { useContext, useEffect, useState } from "react";
import { REACT_APP_URL } from "@env";
import * as Location from "expo-location";
import { useTheme } from "react-native-paper";
import { View, Dimensions, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import Alert from "../../components/alert";
import { useIsFocused } from "@react-navigation/native";
import FlatlistSingleItemContainer from "../../components/FlatlistSingleItemContainer";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default StudentCourses = () => {
  const authCtx = useContext(AuthContext);
  const [courses, setCourses] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    const options = {
      method: "GET",
      url: `${REACT_APP_URL}/getCourses`,
      headers: {
        "x-access-token": authCtx.token,
      },
    };

    axios
      .request(options)
      .then(function (res) {
        console.log(res.data);
        setCourses(res.data.data);
      })
      .catch(function (error) {
        console.log(error);
        Alert("error", "Sorry", error.response.data.message);
      });
  }, [isFocused]);
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
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    const options = {
      method: "POST",
      url: `${REACT_APP_URL}/markAttendance`,
      headers: {
        "x-access-token": authCtx.token,
      },
      data: {
        courseId: item._id,
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      },
    };

    axios
      .request(options)
      .then(function (res) {
        console.log(res?.data);
        Alert("success", "SUCCESS", res?.data?.message);
      })
      .catch(function (error) {
        console.log(error);
        Alert("error", "Sorry", error?.response?.data?.message);
      });
  };

  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: theme.colors.error }}>No Courses found</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        width: deviceWidth,
        height: deviceHeight,
        backgroundColor: theme.colors.onPrimary,
      }}
    >
      <FlatList
        data={courses}
        renderItem={singleItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={myListEmpty}
      />
    </View>
  );
};
