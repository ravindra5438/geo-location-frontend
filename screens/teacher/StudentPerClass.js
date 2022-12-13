import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useEffect, useContext, useState } from "react";
import Alert from "../../components/alert";
import { REACT_APP_URL } from "@env";
import AuthContext from "../../store/auth-context";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import FlatlistSingleItemContainer from "../../components/FlatlistSingleItemContainer";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default StudentPerClass = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const authCtx = useContext(AuthContext);
  const isFocused = useIsFocused();
  const { classId } = route.params;
  console.log("classId", classId);
  const [students, setStudents] = useState(null);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "green",
    },
  });

  useEffect(() => {
    setLoading(true);
    getClassById(classId);
  }, [isFocused]);

  const getClassById = async (classId) => {
    const options = {
      method: "GET",
      url: `${REACT_APP_URL}/getClassById?classId=${classId}`,
      headers: {
        "x-access-token": authCtx.token,
      },

      data: {
        classId: classId,
      },
    };

    await axios
      .request(options)
      .then(function (res) {
        setStudents(res?.data?.data?.students);
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
        <ActivityIndicator
          size="large"
          animating={loading}
          style={{ flex: 1 }}
          color="red"
        />
      ) : (
        <FlatList
          data={students}
          renderItem={({ item }) => (
            <FlatlistSingleItemContainer>
              <Text style={{ color: "green" }} variant="titleMedium">
                {item.name}
              </Text>
              <Text
                style={{ color: theme.colors.primary }}
                variant="titleMedium"
              >
                {item.registrationNo}
              </Text>
            </FlatlistSingleItemContainer>
          )}
          keyExtractor={(item) => item.registrationNo}
        />
      )}
    </View>
  );
};
