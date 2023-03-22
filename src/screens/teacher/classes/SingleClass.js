import { useState } from "react";
import { MotiView } from "moti";
import { Pressable, View, Vibration, Dimensions } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import FlatlistSingleItemContainer from "../../../components/FlatlistSingleItemContainer";

const deviceWidth = Dimensions.get("window").width;

export default SingleClass = ({ item, navigation, setDeleteClassId }) => {
  const theme = useTheme();
  const [deleteClass, setDeleteClass] = useState(false);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <MotiView
        animate={{ width: deleteClass ? deviceWidth - 100 : deviceWidth }}
      >
        <Pressable
          onLongPress={() => {
            setDeleteClass(!deleteClass);
            Vibration.vibrate(50);
          }}
          style={{ flex: 1 }}
          onPress={() => navigation.navigate("STUDENTS", { classId: item._id })}
        >
          <FlatlistSingleItemContainer>
            <Text style={{ color: theme.colors.error }} variant="titleMedium">
              {new Date(item.createdAt).toDateString()}
            </Text>
            <Text style={{ color: "green" }} variant="titleMedium">
              {new Date(item.createdAt).toLocaleTimeString()}
            </Text>
          </FlatlistSingleItemContainer>
        </Pressable>
      </MotiView>
      {deleteClass && (
        <MotiView
          from={{
            width: 0,
          }}
          animate={{ width: 100 }}
          transition={{ type: "spring" }}
        >
          <Button
            icon="delete"
            onPress={() => {
              setDeleteClassId(item._id);
            }}
          />
        </MotiView>
      )}
    </View>
  );
};
