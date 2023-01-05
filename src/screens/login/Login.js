import { useContext, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, TextInput, Card, IconButton } from "react-native-paper";
import AuthContext from "../../store/auth-context.js";

export default Login = ({ navigation }) => {
  const authCtx = useContext(AuthContext);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  return (
    <View
      style={{
        // width: deviceWidth,
        // height: deviceHeight,
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
          style={styles.textInput}
          right={
            <TextInput.Icon
              onPress={() => setIsPasswordSecure(!isPasswordSecure)}
              icon={isPasswordSecure ? "eye-off" : "eye"}
            />
          }
        />
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => authCtx.login({ email, password })}
        >
          Login
        </Button>
        <Button
          mode="text"
          style={styles.button}
          onPress={() => navigation.navigate("Sign Up")}
        >
          create an account
        </Button>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexDirection: "column",
    marginHorizontal: "10%",
    justifyContent: "center",
  },
  textInput: {
    marginVertical: 8,
  },
  button: {
    borderRadius: 8,
    marginTop: 8,
  },
});
