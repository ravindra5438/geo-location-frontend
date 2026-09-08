import { View, StyleSheet, Dimensions } from "react-native";
import StudentCourses from "./StudentCourses";

const StudentHome = ({ route }) => {
  return <StudentCourses {...route.params} />;
};

export default StudentHome;
