import { Button, Text } from "react-native-paper";
import { useEffect, useState, useContext } from "react";
import { REACT_APP_URL } from "@env";
import * as Location from "expo-location";
import { useTheme } from "react-native-paper";
import { View, Dimensions, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import Alert from "../../components/alert";
import { useIsFocused } from "@react-navigation/native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default TeacherCourses = () => {
  const authCtx = useContext(AuthContext);
  const [courses, setCourses] = useState(null);
  const [classStarted, setClassStarted] = useState(false);
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
    courseContainerShrink: {
      alignItems: "center",
      paddingVertical: 8,
      paddingHorizontal: 8,
      marginHorizontal: 16,
      borderRadius: 8,
      marginVertical: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: theme.colors.secondaryContainer,
    },
    courseContainerExpanded: {
      alignItems: "center",
      backgroundColor: "#874364",
      paddingVertical: 100,
      marginHorizontal: 8,
      borderRadius: 8,
      marginVertical: 8,
    },
    button: {
      borderRadius: 4,
    },
  });

  function singleItem({ item }) {
    return (
      <View style={styles.courseContainerShrink}>
        <Text variant="titleLarge">{item.courseName.toUpperCase()}</Text>
        <Text variant="titleSmall">{item.courseCode}</Text>

        {classStarted ? (
          <Button
            mode="outlined"
            style={styles.button}
            onPress={() => {
              endClassHandler(item);
            }}
          >
            End Class
          </Button>
        ) : (
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => {
              getLocation(item);
            }}
          >
            Start Class
          </Button>
        )}
      </View>
    );
  }

  const endClassHandler = async (item) => {
    const options = {
      method: "POST",
      url: `${REACT_APP_URL}/dismissClass`,
      headers: {
        "x-access-token": authCtx.token,
      },
      data: {
        courseId: item._id,
      },
    };

    await axios
      .request(options)
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
    console.log(location);
    const options = {
      method: "POST",
      url: `${REACT_APP_URL}/startClass`,
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
        console.log("start class", res.data);
        Alert("success", "SUCCESS", res.data.message);
      })
      .catch(function (error) {
        console.log(error);
        Alert("error", "Sorry", error.response.data.message);
      });
    setClassStarted(true);
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
        backgroundColor: theme.colors.onError,
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
