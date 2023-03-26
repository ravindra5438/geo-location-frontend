import { FlatList } from "react-native";
import React from "react";
import MyListEmpty from "../../../components/MyListEmpty";
import SingleCourseHome from "./SingleCourseHome";

const ClassesHome = ({ courses }) => {
  return (
    <FlatList
      data={courses}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        return <SingleCourseHome item={item} />;
      }}
      keyExtractor={(item) => item._id}
      ListEmptyComponent={MyListEmpty}
    />
  );
};

export default ClassesHome;
