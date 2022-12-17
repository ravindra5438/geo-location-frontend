import { ActivityIndicator, TextInput } from "react-native-paper";
import { useEffect, useState, useContext } from "react";
import { REACT_APP_URL } from "@env";
import { useTheme } from "react-native-paper";
import { View, Dimensions, FlatList } from "react-native";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import Alert from "../../components/alert";
import { useIsFocused } from "@react-navigation/native";
import SingleClass from "./SingleClass";
import MyListEmpty from "../../components/MyListEmpty";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default TeacherCourses = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  const [courses, setCourses] = useState(null);
  const [deleteCourseId, setDeleteCourseId] = useState(null);
  const isFocused = useIsFocused();
  const theme = useTheme();

  const removeId = () => {
    let arr = courses.filter(function (item) {
      return item._id !== deleteCourseId;
    });
    setCourses(arr);
  };

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
        console.log("courses", res.data.data);
        setCourses(res.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        Alert("error", "Sorry", error.response.data.message);
        setLoading(false);
      });
  }, [isFocused]);

  useEffect(() => {
    const options = {
      method: "DELETE",
      url: `${REACT_APP_URL}/deleteCourseById?courseId=${deleteCourseId}`,
      headers: {
        "x-access-token": authCtx.token,
      },
    };

    axios
      .request(options)
      .then(function (res) {
        removeId();
      })
      .catch(function (error) {
        console.log(error);
        Alert("error", "Sorry", error.response.data.message);
      });
  }, [deleteCourseId]);

  return (
    <View
      style={{
        width: deviceWidth,
        height: deviceHeight * 0.93,
        backgroundColor: theme.colors.onPrimary,
        paddingTop: 8,
      }}
    >
      {loading ? (
        <ActivityIndicator size="large" color="red" style={{ flex: 1 }} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={courses}
          renderItem={(props) => (
            <SingleClass
              {...props}
              deleteId={setDeleteCourseId}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={MyListEmpty}
        />
      )}
    </View>
  );
};
