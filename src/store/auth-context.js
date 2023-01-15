import axios from "axios";
import { REACT_APP_URL } from "@env";
import React, { useEffect, useState } from "react";
import Alert from "../components/alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
WebBrowser.maybeCompleteAuthSession();

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  name: "",
  role: "",
  email: "",
  profile: "",
  login: (props) => {},
  signUp: (props) => {},
  logout: () => {},
  googleAuth: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigation = useNavigation();

  const userIsLoggedIn = !!token;
  const getData = async () => {
    await AsyncStorage.getItem("token").then((data) => {
      setToken(data);
    });
    await AsyncStorage.getItem("name").then((data) => {
      setName(data);
    });
    await AsyncStorage.getItem("role").then((data) => {
      setRole(data);
    });
    await AsyncStorage.getItem("email").then((data) => {
      setEmail(data);
    });
    await AsyncStorage.getItem("profile").then((data) => {
      setProfile(data);
    });
  };
  getData();

  const loginHandler = async ({ email, password }) => {
    try {
      await axios({
        url: `${REACT_APP_URL}/auth/login`,
        method: "post",
        data: {
          email: email,
          password: password,
        },
      })
        .then(async (res) => {
          setToken(res?.data?.token);
          await AsyncStorage.setItem("token", res?.data?.token);
          await AsyncStorage.setItem("name", res?.data?.user?.name);
          await AsyncStorage.setItem("role", res?.data?.user?.role);
          await AsyncStorage.setItem("email", res?.data?.user?.email);
          await AsyncStorage.setItem("profile", res?.data?.user?.profileImage);
        })
        .catch((err) => {
          Alert("error", "Sorry", err?.response?.data?.message);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "761450022754-jblgjbq21hhjdc6rnusd2e8c7807e9b4.apps.googleusercontent.com",
    androidClientId:
      "761450022754-5c6gs13aniu6mr8mq1rkrfd9jk5j6tgd.apps.googleusercontent.com",
    redirectUri: "https://auth.expo.io/@rajeevsahu/geolocation-attendance",
    // redirectUri: makeRedirectUri(), //for production we have to uncomment this
  });

  const googleLoginHandler = () => {
    promptAsync()
      .then((response) => {
        if (response?.type === "success") {
          var config = {
            method: "get",
            url: "https://www.googleapis.com/oauth2/v2/userinfo?alt=json",
            headers: {
              Authorization: `Bearer ${response?.authentication?.accessToken}`,
            },
          };

          axios(config)
            .then(async (response) => {
              const googleData = {
                email: response.data.email,
                gId: response.data.id,
                name: response.data.name,
                profileImage: response.data.picture,
              };
              await axios
                .post(`${REACT_APP_URL}/auth/authWithGoogle`, googleData)
                .then(async (res) => {
                  setToken(res?.data?.token);
                  await AsyncStorage.setItem("token", res?.data?.token);
                  await AsyncStorage.setItem("name", res?.data?.user?.name);
                  await AsyncStorage.setItem("role", res?.data?.user?.role);
                  await AsyncStorage.setItem("email", res?.data?.user?.email);
                  await AsyncStorage.setItem(
                    "profile",
                    res?.data?.user?.profileImage
                  );
                })
                .catch((err) => {
                  Alert("error", "Sorry", err?.response?.data?.message);
                });
            })
            .catch(function (error) {
              console.log(error);
            });
        } else if (response?.type === "dismiss") {
          Alert("error", "Dismissed");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signUpHandler = async ({
    name,
    email,
    password,
    role,
    registrationNo,
  }) => {
    try {
      await axios({
        url: `${REACT_APP_URL}/auth/signUp`,
        method: "post",
        data: {
          name: name,
          role: role,
          registrationNo: registrationNo,
          email: email,
          password: password,
        },
      })
        .then(async (res) => {
          setToken(res?.data?.token);
          await AsyncStorage.setItem("token", res?.data?.token);
          await AsyncStorage.setItem("name", res?.data?.user?.name);
          await AsyncStorage.setItem("role", res?.data?.user?.role);
          await AsyncStorage.setItem("email", res?.data?.user?.email);
          await AsyncStorage.setItem("profile", res?.data?.user?.profileImage);
        })
        .catch((err) => Alert("error", "Sorry", err?.response?.data?.message));
    } catch (err) {
      console.log(err);
    }
  };

  const logoutHandler = () => {
    setToken(null);
    AsyncStorage.clear();
  };

  const contextValue = {
    token: token,
    name: name,
    role: role,
    email: email,
    profile: profile,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    signUp: signUpHandler,
    googleAuth: googleLoginHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
