import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useEffect, useContext, useState } from "react";
import Alert from "../../../components/alert";
import { REACT_APP_URL } from "@env";
import AuthContext from "../../../store/auth-context";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import MyListEmpty from "../../../components/MyListEmpty";
import SingleClass from "./SingleClass";
import useAxios from "../../../services";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default Classes = ({ route, navigation }) => {
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const [deleteClassId, setDeleteClassId] = useState(null);
  const authCtx = useContext(AuthContext);
  const isFocused = useIsFocused();
  const { courseId } = route.params;
  const [classes, setClasses] = useState(null);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "green",
    },
  });

  const removeId = () => {
    let arr = classes.filter(function (item) {
      return item._id !== deleteClassId;
    });
    setClasses(arr);
  };

  useEffect(() => {
    if (!deleteClassId) return;

    axiosInstance
      .delete(`/deleteClassById?classId=${deleteClassId}`)
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
  }, [isFocused]);

  const getClassByCourseId = async (courseId) => {
    await axiosInstance
      .get(`/getClassesByCourseId?courseId=${courseId}`, { courseId: courseId })
      .then(function (res) {
        setClasses(res?.data?.data);
        console.log(res?.data?.data);
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
      )}
    </View>
  );
};
