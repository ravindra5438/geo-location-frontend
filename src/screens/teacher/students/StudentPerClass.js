import { View, StyleSheet, FlatList } from "react-native";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { useTheme, DataTable, Switch } from "react-native-paper";
import { useEffect, useState } from "react";
import Alert from "../../../components/alert";
import { useIsFocused } from "@react-navigation/native";
import useAxios from "../../../services";
import FloatingActionButton from "../../../components/FloatingActionButton";
import SearchBar from "../../../components/SearchBar";
import SingleStudentPerClass from "./SingleStudentPerClass";

export default StudentPerClass = ({ route, navigation }) => {
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isFocused = useIsFocused();
  const { classId } = route.params;
  const [students, setStudents] = useState([]);
  const [filteredStudent, setFilteredStudent] = useState(students);
  const [refresh, setRefresh] = useState(false);
  const [queryString, setQueryString] = useState("");
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "green",
    },
    dataTableCenter: {
      alignItems: "center",
      justifyContent: "center",
    },
  });

  useEffect(() => {
    console.log(navigation);
    navigation.setOptions({
      headerRight: () => <SearchBar setQueryString={setQueryString} />,
    });
  }, [navigation.isFocused]);

  useEffect(() => {
    setLoading(true);
    getClassById(classId);
  }, [navigation.isFocused, refresh]);

  const getClassById = async (classId) => {
    await axiosInstance
      .get(`/class/students?classId=${classId}`)
      .then(function (res) {
        setStudents(res?.data?.data);
        setFilteredStudent(res?.data?.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        Alert("error", "Sorry", error.response.data.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    const filteredResult = students.filter(
      (student) =>
        student.name
          ?.toLowerCase()
          .trim()
          .includes(queryString.toLowerCase().trim()) ||
        student.registrationNo.includes(queryString.trim())
    );
    setFilteredStudent(filteredResult);
  }, [queryString]);

  return (
    <View
      style={{
        flex: 1,
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
        <View style={{ flex: 1 }}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title
                numeric={true}
                textStyle={{ color: "green" }}
                style={[
                  styles.dataTableCenter,
                  {
                    flex: 0.2,
                  },
                ]}
              >
                P/A
              </DataTable.Title>
              <DataTable.Title
                textStyle={{ color: "green" }}
                style={[styles.dataTableCenter, { flex: 1 }]}
              >
                Name
              </DataTable.Title>
              <IconButton
                iconColor="#C780FA"
                onPress={() => setRefresh(!refresh)}
                icon="refresh"
              />
              <DataTable.Title
                textStyle={{ color: "green" }}
                style={[styles.dataTableCenter, { flex: 0.4 }]}
              >
                Reg.No
              </DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={filteredStudent}
              ListEmptyComponent={MyListEmpty}
              renderItem={({ item, index }) => (
                <SingleStudentPerClass item={item} classId={classId} />
              )}
              keyExtractor={(item) => item._id}
            />
          </DataTable>
          <FloatingActionButton
            onPress={() => navigation.goBack()}
            icon="arrow-left"
          />
        </View>
      )}
    </View>
  );
};
