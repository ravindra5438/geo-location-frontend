import { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import { View, Dimensions, FlatList, StyleSheet } from "react-native";
import Alert from "../../../components/alert";
import { useIsFocused } from "@react-navigation/native";
import SingleCourse from "./SingleCourse";
import MyListEmpty from "../../../components/MyListEmpty";
import useAxios from "../../../services";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default TeacherCourses = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [deleteCourseId, setDeleteCourseId] = useState(null);
  const isFocused = useIsFocused();
  const theme = useTheme();
  const axiosInstance = useAxios();

  const removeId = () => {
    let arr = courses.filter(function (item) {
      return item._id !== deleteCourseId;
    });
    setCourses(arr);
  };

  useEffect(() => {
    axiosInstance
      .get("/course")
      .then(function (res) {
        console.log(res.data);
        setCourses(res?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
        Alert("error", "Sorry", error?.response?.data?.message);
      });
  }, [isFocused]);

  useEffect(() => {
    if (!deleteCourseId) return;

    axiosInstance
      .delete(`/course/${deleteCourseId}`)
      .then(function (res) {
        removeId();
      })
      .catch(function (error) {
        console.log(error);
        Alert("error", "Sorry", error?.response?.data?.message);
      });
  }, [deleteCourseId]);

  return (
    <View
      style={{
        backgroundColor: theme.colors.onPrimary,
        paddingTop: 8,
        flexGrow: 1,
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={courses}
        renderItem={(props) => (
          <SingleCourse
            {...props}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            deleteId={setDeleteCourseId}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={MyListEmpty}
      />
    </View>
  );
};
