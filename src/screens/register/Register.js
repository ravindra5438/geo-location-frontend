import { useContext, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, TextInput, Card, Text, useTheme } from "react-native-paper";
import AuthContext from "../../store/auth-context";

export default Register = ({ navigation }) => {
  const authCtx = useContext(AuthContext);

  const [Teacher, setTeacher] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [registrationNo, setRegistrationNo] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      padding: 24,
      flexDirection: "column",
      marginHorizontal: "10%",
      justifyContent: "center",
      backgroundColor: theme.colors.primaryContainer,
    },
    textInput: {
      marginVertical: 8,
    },
    button: {
      borderRadius: 8,
      marginTop: 8,
    },
  });

  return (
    <View
      style={{
        flexGrow: 1,
        justifyContent: "center",
        backgroundColor: "#EEEEEE",
      }}
    >
      <Card style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: 115, height: 100 }}
            source={require("../../../assets/gkvlogo.png")}
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
          secureTextEntry={isPasswordSecure}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          mode="outlined"
          right={
            <TextInput.Icon
              onPress={() => setIsPasswordSecure(!isPasswordSecure)}
              icon={isPasswordSecure ? "eye-off" : "eye"}
            />
          }
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
          labelStyle={{ color: "green" }}
        >
          <Text variant="titleSmall">already a user?</Text> LOGIN
        </Button>
      </Card>
    </View>
  );
};
