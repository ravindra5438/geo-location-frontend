import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { useTheme, DataTable } from "react-native-paper";
import { useEffect, useState } from "react";
import Alert from "../../../components/alert";
import { useIsFocused } from "@react-navigation/native";
import useAxios from "../../../services";
import FloatingActionButton from "../../../components/FloatingActionButton";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default StudentPerClass = ({ route, navigation }) => {
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isFocused = useIsFocused();
  const { classId } = route.params;
  const [students, setStudents] = useState(null);
  const [refresh, setRefresh] = useState(false);
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
    console.log("refreshed");
    setLoading(true);
    getClassById(classId);
  }, [isFocused, refresh]);

  const getClassById = async (classId) => {
    await axiosInstance
      .get(`/getClassById?classId=${classId}`, {
        classId: classId,
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
                  <DataTable.Cell
                    style={[styles.dataTableCenter, { flex: 0.4 }]}
                  >
                    {item.registrationNo}
                  </DataTable.Cell>
                </DataTable.Row>
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
