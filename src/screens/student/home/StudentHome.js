import { View, StyleSheet, Dimensions } from "react-native";
import StudentCourses from "./StudentCourses";

export default StudentHome = ({ route }) => {
  return <StudentCourses {...route.params} />;
};
