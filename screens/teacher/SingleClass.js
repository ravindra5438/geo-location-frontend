import { Button, Text } from "react-native-paper";
import { useState, useContext } from "react";
import { REACT_APP_URL } from "@env";
import * as Location from "expo-location";
import { useTheme } from "react-native-paper";
import { View, StyleSheet, Pressable } from "react-native";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import Alert from "../../components/alert";
import FlatlistSingleItemContainer from "../../components/FlatlistSingleItemContainer";
// import Animated, {
//   FadeIn,
//   FadeInLeft,
//   FadeOut,
//   FadeOutRight,
// } from "react-native-reanimated";

export default function SingleClass({ item, navigation }) {
  const theme = useTheme();
  const [classStarted, setClassStarted] = useState(false);
  const authCtx = useContext(AuthContext);

  const styles = StyleSheet.create({
    button: {
      borderRadius: 4,
    },
  });

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

  return (
    //<Animated.View entering={FadeInLeft} exiting={FadeOutRight}>
    <View>
      <Pressable
        onPress={() =>
          navigation.navigate("CLASSES", {
            courseId: item._id,
          })
        }
      >
        <FlatlistSingleItemContainer>
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
        </FlatlistSingleItemContainer>
      </Pressable>
    </View>
  );
}
