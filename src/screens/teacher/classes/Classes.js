import { View, FlatList } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { useEffect, useState } from "react";
import Alert from "../../../components/alert";
import { useIsFocused } from "@react-navigation/native";
import MyListEmpty from "../../../components/MyListEmpty";
import SingleClass from "./SingleClass";
import useAxios from "../../../services";
import FloatingActionButton from "../../../components/FloatingActionButton";

export default Classes = ({ route, navigation }) => {
  const axiosInstance = useAxios();
  // console.log(route)
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const [deleteClassId, setDeleteClassId] = useState(null);
  const isFocused = useIsFocused();
  const { courseId } = route.params;
  const [classes, setClasses] = useState(null);

  const removeId = () => {
    let arr = classes.filter(function (item) {
      return item._id !== deleteClassId;
    });
    setClasses(arr);
  };

  useEffect(() => {
    if (!deleteClassId) return;

    axiosInstance
      .delete(`/class/${deleteClassId}`)
      .then(function (res) {
        removeId();
        setDeleteClassId(null);
      })
      .catch(function (error) {
        console.log(error);
        Alert("error", "Sorry", error?.response?.data?.message);
      });
  }, [deleteClassId]);

  useEffect(() => {
    setLoading(true);
    getClassByCourseId(courseId);
  }, [navigation.isFocused]);

  const getClassByCourseId = async (courseId) => {
    await axiosInstance
      .get(`/class?courseId=${courseId}`)
      .then(function (res) {
        setClasses(res?.data?.data);
        console.log("res from classes\n\n", res?.data?.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        Alert("error", "Sorry", error?.response?.data?.message);
        setLoading(false);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.onPrimary,
      }}
    >
      {loading ? (
        <ActivityIndicator size="large" color="green" style={{ flex: 1 }} />
      ) : (
        <View style={{ flex: 1, padding: 8 }}>
          <FlatList
            data={classes}
            ListEmptyComponent={MyListEmpty}
            renderItem={(props) => (
              <SingleClass
                {...props}
                navigation={navigation}
                setDeleteClassId={setDeleteClassId}
              />
            )}
            keyExtractor={(item) => item._id}
          />
          <FloatingActionButton
            onPress={() => navigation.goBack()}
            icon="arrow-left"
          />
        </View>
      )}
    </View>
  );
};
