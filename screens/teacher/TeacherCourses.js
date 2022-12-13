import { ActivityIndicator, Text } from "react-native-paper";
import { useEffect, useState, useContext } from "react";
import { REACT_APP_URL } from "@env";
import { useTheme } from "react-native-paper";
import { View, Dimensions, FlatList } from "react-native";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import Alert from "../../components/alert";
import { useIsFocused } from "@react-navigation/native";
import SingleClass from "./SingleClass";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default TeacherCourses = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  const [courses, setCourses] = useState(null);
  const isFocused = useIsFocused();
  const theme = useTheme();

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        Alert("error", "Sorry", error.response.data.message);
        setLoading(false);
      });
  }, [isFocused]);

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
      {loading ? (
        <ActivityIndicator size="large" color="red" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={courses}
          renderItem={(props) => (
            <SingleClass {...props} navigation={navigation} />
          )}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={myListEmpty}
        />
      )}
    </View>
  );
};
