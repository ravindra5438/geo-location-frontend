import { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import Alert from "../../../components/alert";
import { useIsFocused } from "@react-navigation/native";
import useAxios from "../../../services";
import myListEmpty from "../../../components/MyListEmpty";
import StudentSingleCourse from "./StudentSingleCourse";
import FloatingActionButton from "../../../components/FloatingActionButton";

export default StudentCourses = ({ joinCourse }) => {
  const axiosInstance = useAxios();
  const [courses, setCourses] = useState(null);
  const [refresh, setRefresh] = useState(false);
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
  }, [isFocused, joinCourse, refresh]);

  return (
    <View flex={1}>
      <FlatList
        data={courses}
        renderItem={({ item }) => <StudentSingleCourse item={item} />}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={myListEmpty}
      />
      <FloatingActionButton
        icon="refresh"
        onPress={() => setRefresh(!refresh)}
      />
    </View>
  );
};
