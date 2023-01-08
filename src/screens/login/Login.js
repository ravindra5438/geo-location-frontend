import { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import {
  Button,
  TextInput,
  Card,
  useTheme,
  Text,
  Modal,
  Portal,
  Divider,
} from "react-native-paper";
import AuthContext from "../../store/auth-context.js";
import useAxios from "../../services/index.js";
import Alert from "../../components/alert.js";

export default Login = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const theme = useTheme();
  const axiosInstance = useAxios();
  const [showModal, setShowModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  // const [isLoaderActive, setIsLoaderActive] = useState(false);

  const styles = StyleSheet.create({
    container: {
      padding: 24,
      flexDirection: "column",
      marginHorizontal: "10%",
      justifyContent: "center",
      backgroundColor: theme.colors.primaryContainer,
    },
    containerInModal: {
      padding: 24,
      flexDirection: "column",
      marginHorizontal: "10%",
      justifyContent: "center",
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: 8,
    },
    textInput: {
      marginVertical: 8,
    },
    button: {
      borderRadius: 8,
      marginTop: 8,
    },
  });

  const forgetPasswordHandler = async () => {
    await axiosInstance
      .post("/auth/recover", { email: resetEmail })
      .then((res) => {
        if (res.status === 200) {
          Alert(
            "success",
            "Success",
            "a reset password link has been sent to your email"
          );
          setShowModal(false);
          setResetEmail("");
        }
      })
      .catch((err) => {
        setShowModal(false);
        Alert("error", "sorry", "something went wrong");
        console.log("err: ", err);
      });
  };

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
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-around",
            marginTop: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Pressable onPress={() => setShowModal(true)}>
              <Text style={{ color: "#7676A7" }}>Forget Password?</Text>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <Text>need an account?</Text>
            <Pressable onPress={() => navigation.navigate("Sign Up")}>
              <Text
                style={{
                  color: "green",
                  textDecorationStyle: "solid",
                  textDecorationLine: "underline",
                }}
              >
                SIGN UP
              </Text>
            </Pressable>
          </View>
          <View style={{ marginTop: 4 }}>
            <Button
              mode="elevated"
              icon={() => (
                <Image
                  source={require("../../../assets/google.png")}
                  style={{ width: 30, height: 30 }}
                />
              )}
              style={[styles.button]}
              onPress={() => {
                authCtx.googleAuth();
              }}
            >
              Continue With Google
            </Button>
          </View>
        </View>
        <Portal>
          <Modal visible={showModal} onDismiss={() => setShowModal(false)}>
            <View style={[styles.containerInModal]}>
              <Text style={{ textAlign: "center", color: "green" }}>
                A reset Password Link will be sent to Provided email.
              </Text>
              <Divider
                bold
                style={{ marginVertical: 8, backgroundColor: "white" }}
              />
              <TextInput
                mode="outlined"
                label="@email"
                placeholder="Enter your email"
                onChangeText={(text) => setResetEmail(text)}
              />
              <Button
                style={{
                  borderRadius: 4,
                  width: "50%",
                  alignSelf: "center",
                  marginTop: 16,
                }}
                onPress={() => forgetPasswordHandler()}
                mode="contained"
              >
                Send Email
              </Button>
            </View>
          </Modal>
        </Portal>
      </Card>
    </View>
  );
};
