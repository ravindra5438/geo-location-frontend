import React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { DataTable, Switch } from "react-native-paper";
import useAxios from "../../../services";
import alert from "../../../components/alert";

const styles = StyleSheet.create({
  dataTableCenter: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

const SingleStudentPerClass = ({ item, classId }) => {
  const [toggle, setToggle] = useState(item.present);
  const axiosInstance = useAxios();

  const handleMarkAttendance = async (id) => {
    try {
      await axiosInstance
        .put(`/class/${classId}`, { students: [{ _id: id, present: !toggle }] })
        .then((res) => setToggle((toggle) => !toggle))
        .catch((err) => alert("error", "sorry", err.response.data.message));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DataTable.Row>
      <DataTable.Cell
        textStyle={{ color: "green" }}
        style={[
          styles.dataTableCenter,
          {
            flex: 0.3,
          },
        ]}
      >
        <Switch
          color="green"
          value={toggle}
          onValueChange={() => handleMarkAttendance(item._id)}
        />
      </DataTable.Cell>
      <DataTable.Cell style={styles.dataTableCenter}>
        {item.name}
      </DataTable.Cell>
      <DataTable.Cell style={[styles.dataTableCenter, { flex: 0.4 }]}>
        {item.registrationNo}
      </DataTable.Cell>
    </DataTable.Row>
  );
};

export default SingleStudentPerClass;
