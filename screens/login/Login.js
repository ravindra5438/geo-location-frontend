import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Button, TextInput, Card } from "react-native-paper";
import AuthContext from "../../store/auth-context.js";
import axios from "axios";
import { REACT_APP_URL } from "@env";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default Login = ({ navigation }) => {
  const authCtx = useContext(AuthContext);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const loginHandler = async () => {
    try {
      await axios({
        url: `${REACT_APP_URL}/login`,
        method: "post",
        data: {
          email: email,
          password: password,
        },
      })
        .then((res) => {
          AsyncStorage.setItem("token", res.data.token);
          AsyncStorage.setItem("name", res.data.user.name);
          AsyncStorage.setItem("role", res.data.user.role);
        })
        .catch((err) => {
          Alert("error", "Sorry", err.response.data.message);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ width: deviceWidth, height: deviceHeight }}>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: 115, height: 100 }}
            source={require("../../assets/gkvlogo.png")}
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
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          mode="outlined"
          style={styles.textInput}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexDirection: "column",
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
