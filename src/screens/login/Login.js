import { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Image, Pressable, ScrollView } from "react-native";
import {
  Button,
  TextInput,
  useTheme,
  Text,
  Modal,
  Portal,
  Divider,
} from "react-native-paper";
import AuthContext from "../../store/auth-context.js";
import useAxios from "../../services/index.js";
import Alert from "../../components/alert.js";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GOOGLE_WEB_CLIENT_ID, GOOGLE_ANDROID_CLIENT_ID } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export default Login = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const theme = useTheme();
  const axiosInstance = useAxios();
  const [signUp, setSignUp] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 32,
      flexDirection: "column",
      marginHorizontal: 8,
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
        Alert("error", "sorry", err.response.data.message);
        console.log("err: ", err);
      });
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_WEB_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      setLoading(true);
      if (token) {
        axiosInstance
          .post("/auth/google", {
            userToken: token,
          })
          .then(async (res) => {
            authCtx.setToken(res?.data?.token);
            AsyncStorage.setItem("token", res?.data?.token);
            AsyncStorage.setItem("name", res?.data?.user?.name);
            AsyncStorage.setItem("role", res?.data?.user?.role);
            AsyncStorage.setItem("email", res?.data?.user?.email);
            AsyncStorage.setItem(
              "profile",
              res?.data?.user?.profileImage || ""
            );
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            Alert("error", "Somthing Went Wrong", err?.response?.data?.message);
          });
      }
    } catch (err) {
      setLoading(false);
      Alert("error", "Somthing Went Wrong");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        backgroundColor: "#EEEEEE",
        paddingHorizontal: 16,
      }}
    >
      <Pressable onPress={() => setSignUp(!signUp)}>
        <View
          margin={32}
          flexDirection="row"
          alignSelf="center"
          style={{ elevation: 10, backgroundColor: "white", borderRadius: 40 }}
        >
          <Button mode={signUp ? "text" : "contained"}>logIn </Button>
          <Button mode={signUp ? "contained" : "text"}>signUp</Button>
        </View>
      </Pressable>
      <View>
        {signUp && (
          <TextInput
            label="Name"
            onChangeText={(text) => {
              setUser({ ...user, name: text });
            }}
            mode="outlined"
            style={styles.textInput}
          />
        )}
        <TextInput
          label="Email"
          onChangeText={(text) => {
            setUser({ ...user, email: text });
          }}
          mode="outlined"
          style={styles.textInput}
        />
        <TextInput
          label="Password"
          secureTextEntry={isPasswordSecure}
          onChangeText={(text) => {
            setUser({ ...user, password: text });
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
        {signUp ? (
          <Button
            disabled={authCtx.isLoading || loading}
            loading={authCtx.isLoading}
            mode="contained"
            style={styles.button}
            onPress={() => authCtx.signUp(user)}
          >
            {" "}
            SignUp
          </Button>
        ) : (
          <Button
            disabled={authCtx.isLoading || loading}
            loading={authCtx.isLoading}
            mode="contained"
            style={styles.button}
            onPress={() => authCtx.login(user)}
          >
            {" "}
            Login
          </Button>
        )}
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-around",
            marginTop: 8,
          }}
        >
          {!signUp && (
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
          )}
          <View style={{ marginTop: 4 }}>
            <Button
              mode="text"
              disabled={!request || loading}
              loading={loading}
              icon={() => (
                <Image
                  source={require("../../../assets/google.png")}
                  style={{ width: 30, height: 30 }}
                />
              )}
              style={[styles.button]}
              onPress={() => promptAsync()}
            >
              {" "}
              Continue With Google
            </Button>
          </View>
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
              {" "}
              Send Email
            </Button>
          </View>
        </Modal>
      </Portal>
    </ScrollView>
  );
};
