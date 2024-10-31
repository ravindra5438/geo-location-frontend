import { View, StyleSheet } from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import {
  useTheme,
  Portal,
  Modal,
  Text,
  Divider,
  TextInput,
  Button,
} from "react-native-paper";
import useAxios from "../../../services";

const CreateCourse = ({ navigation }) => {
  const [portalVisibility, setPortalVisibility] = React.useState(false);
  const [courseName, setCourseName] = React.useState(null);
  const theme = useTheme();
  const axiosInstance = useAxios();

  const styles = StyleSheet.create({
    portalContainer: {
      backgroundColor: "white",
      alignItems: "center",
      marginHorizontal: 16,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    divider: {
      marginVertical: 8,
      width: "100%",
      height: 2,
      backgroundColor: theme.colors.primary,
    },
  });

  const createCourseHandler = async () => {
    await axiosInstance
      .post("/course", { courseName: courseName })
      .then(function (res) {
        console.log(res?.data);
        Alert("success", "SUCCESS", res?.data?.message);
      })
      .catch(function (error) {
        console.log(error);
        Alert("error", "Sorry", error?.response?.data?.message);
      });
    setCourseName(null);
    setPortalVisibility(false);
    navigation.navigate("Home");
    navigation.navigate("Courses");
  };

  return (
    <View>
      <IconButton
        onPress={() => setPortalVisibility(true)}
        iconColor={theme.colors.primaryContainer}
        icon="plus"
      />
      <Portal>
        <Modal
          visible={portalVisibility}
          onDismiss={() => setPortalVisibility(false)}
          contentContainerStyle={styles.portalContainer}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              variant="titleLarge"
              style={{ color: theme.colors.primary, fontWeight: "700" }}
            >
              Create Course
            </Text>
          </View>
          <Divider bold={true} style={styles.divider} />
          <TextInput
            style={{ width: "100%" }}
            mode="outlined"
            autoFocus={true}
            maxLength={40}
            label="Course Name"
            onChangeText={(text) => {
              setCourseName(text);
            }}
          />
          <Text
            style={{ color: "grey", alignSelf: "flex-start" }}
            variant="labelSmall"
          >
            max-length 40
          </Text>
          <Button
            style={{ width: "60%", borderRadius: 8, marginTop: 16 }}
            mode="contained"
            onPress={createCourseHandler}
          >
            Create
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

export default CreateCourse;
