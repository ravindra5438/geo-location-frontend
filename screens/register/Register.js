import { useContext, useState } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { Button, TextInput, Card, Text } from "react-native-paper";
import AuthContext from "../../store/auth-context";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default Register = ({ navigation }) => {
  const authCtx = useContext(AuthContext);

  const [Teacher, setTeacher] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [registrationNo, setRegistrationNo] = useState("");

  return (
    <View style={{ width: deviceWidth, height: deviceHeight }}>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: 120, height: 120 }}
            source={require("../../assets/gkvlogo.png")}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            mode={Teacher ? "elevated" : "contained"}
            onPress={() => {
              setTeacher(false);
            }}
          >
            Student
          </Button>
          <Button
            mode={Teacher ? "contained" : "elevated"}
            onPress={() => {
              setTeacher(true);
            }}
          >
            Teacher
          </Button>
        </View>
        <TextInput
          label="Name"
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
          mode="outlined"
          style={styles.textInput}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          mode="outlined"
          style={styles.textInput}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          mode="outlined"
          style={styles.textInput}
        />
        {!Teacher ? (
          <TextInput
            label="Registration No."
            value={registrationNo}
            onChangeText={(text) => {
              setRegistrationNo(text);
            }}
            keyboardType="numeric"
            mode="outlined"
            style={styles.textInput}
          />
        ) : null}
        <Button
          mode="contained"
          style={styles.button}
          onPress={() =>
            authCtx.signUp({
              email,
              password,
              name,
              registrationNo,
              role: Teacher ? "teacher" : "student",
            })
          }
        >
          Register
        </Button>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text variant="titleSmall">Back to</Text> Login
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
  },
  textInput: {
    height: 40,
    marginVertical: 8,
  },
  button: {
    borderRadius: 8,
    marginTop: 8,
  },
});
