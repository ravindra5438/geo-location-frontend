import axios from "axios";
import { REACT_APP_URL } from "@env";
import React, { useState } from "react";
import Alert from "../components/alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AuthContext = React.createContext({
  token: "",
  setToken: (props) => {},
  isLoggedIn: false,
  name: "",
  role: "",
  email: "",
  profile: "",
  login: (props) => {},
  signUp: (props) => {},
  logout: () => {},
  isLoading: false,
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
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
          if (res.data.user.role === "admin") {
            return Alert("error", "Sorry", "This App is not for the Admin");
          }
          setToken(res?.data?.token);
          AsyncStorage.setItem("token", res?.data?.token);
          AsyncStorage.setItem("name", res?.data?.user?.name);
          AsyncStorage.setItem("role", res?.data?.user?.role);
          AsyncStorage.setItem("email", res?.data?.user?.email);
          AsyncStorage.setItem("profile", res?.data?.user?.profileImage || "");
        })
        .catch((err) => {
          Alert("error", "Sorry", err?.response?.data?.message);
        });
    } catch (err) {
      console.error("Error in loginHandler", err);
    }
    setIsLoading(false);
  };

  const signUpHandler = async ({ name, email, password }) => {
    setIsLoading(true);
    try {
      await axios({
        url: `${REACT_APP_URL}/auth/signUp`,
        method: "post",
        data: {
          name: name,
          email: email,
          password: password,
        },
      })
        .then(async (res) => {
          Alert("success", "success", res?.data?.message);
        })
        .catch((err) => Alert("error", "Sorry", err?.response?.data?.message));
    } catch (err) {
      console.error("Error in signUpHandler", err);
    }
    setIsLoading(false);
  };

  const logoutHandler = () => {
    setToken(null);
    AsyncStorage.clear();
  };

  const contextValue = {
    token: token,
    setToken: setToken,
    name: name,
    role: role,
    email: email,
    profile: profile,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    signUp: signUpHandler,
    isLoading: isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
