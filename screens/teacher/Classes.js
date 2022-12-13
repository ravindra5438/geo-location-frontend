import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable,
} from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useEffect, useContext, useState } from "react";
import Alert from "../../components/alert";
import { REACT_APP_URL } from "@env";
import AuthContext from "../../store/auth-context";
import axios from "axios";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
import FlatlistSingleItemContainer from "../../components/FlatlistSingleItemContainer";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default Classes = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const authCtx = useContext(AuthContext);
  const isFocused = useIsFocused();
  const { courseId } = route.params;
  const [classes, setClasses] = useState(null);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "green",
    },
  });

  useEffect(() => {
    setLoading(true);
    getClassByCourseId(courseId);
  }, [isFocused]);

  const getClassByCourseId = async (courseId) => {
    const options = {
      method: "GET",
      url: `${REACT_APP_URL}/getClassesByCourseId?courseId=${courseId}`,
      headers: {
        "x-access-token": authCtx.token,
      },

      data: {
        courseId: courseId,
      },
    };

    await axios
      .request(options)
      .then(function (res) {
        setClasses(res?.data?.data);
        console.log(res.data.data);
        Alert("success", "SUCCESS", res.data.message);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        Alert("error", "Sorry", error.response.data.message);
        setLoading(false);
      });
  };

  return (
    <View
      style={{
        width: deviceWidth,
        height: deviceHeight,
        backgroundColor: theme.colors.onPrimary,
      }}
    >
      {loading ? (
        <ActivityIndicator size="large" color="green" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={classes}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate("STUDENTS", { classId: item._id })
              }
            >
              <FlatlistSingleItemContainer>
                <Text
                  style={{ color: theme.colors.error }}
                  variant="titleMedium"
                >
                  {new Date(item.createdDate).toDateString()}
                </Text>
                <Text style={{ color: "green" }} variant="titleMedium">
                  {new Date(item.createdDate).toLocaleTimeString()}
                </Text>
              </FlatlistSingleItemContainer>
            </Pressable>
          )}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};
