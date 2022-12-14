import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useTheme, DataTable } from "react-native-paper";
import { useEffect, useState } from "react";
import Alert from "../../../components/alert";
import { useIsFocused } from "@react-navigation/native";
import useAxios from "../../../services";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const StudentsEnrolled = ({ route }) => {
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isFocused = useIsFocused();
  const { courseId } = route.params;
  const [students, setStudents] = useState(null);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "green",
    },
    dataTableCenter: {
      alignItems: "center",
      justifyContent: "flex-start",
    },
  });

  useEffect(() => {
    setLoading(true);
    getCourseById(courseId);
    console.log(students);
  }, [isFocused]);

  const getCourseById = async (courseId) => {
    await axiosInstance
      .get(`/getCourseById?courseId=${courseId}`, {
        courseId: courseId,
      })
      .then(function (res) {
        setStudents(res?.data?.data?.students);
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
        <DataTable>
          <DataTable.Header>
            <DataTable.Title
              numeric={true}
              textStyle={{ color: "green" }}
              style={[
                styles.dataTableCenter,
                {
                  flex: 0.2,
                  marginRight: 4,
                },
              ]}
            >
              S.No
            </DataTable.Title>
            <DataTable.Title
              textStyle={{ color: "green" }}
              style={[styles.dataTableCenter, { flex: 1 }]}
            >
              Name
            </DataTable.Title>
            <DataTable.Title
              textStyle={{ color: "green" }}
              style={[styles.dataTableCenter, { flex: 0.4 }]}
            >
              Reg.No
            </DataTable.Title>
          </DataTable.Header>
          <FlatList
            data={students}
            ListEmptyComponent={MyListEmpty}
            renderItem={({ item, index }) => (
              <DataTable.Row>
                <DataTable.Cell
                  textStyle={{ color: "green" }}
                  style={[
                    styles.dataTableCenter,
                    {
                      flex: 0.2,
                      marginRight: 4,
                    },
                  ]}
                >
                  {index + 1}
                </DataTable.Cell>
                <DataTable.Cell style={styles.dataTableCenter}>
                  {item.name}
                </DataTable.Cell>
                <DataTable.Cell style={[styles.dataTableCenter, { flex: 0.4 }]}>
                  {item.registrationNo}
                </DataTable.Cell>
              </DataTable.Row>
            )}
            keyExtractor={(item) => item._id}
          />
        </DataTable>
      )}
    </View>
  );
};

export default StudentsEnrolled;
