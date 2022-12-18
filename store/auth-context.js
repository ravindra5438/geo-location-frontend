import axios from "axios";
import { REACT_APP_URL } from "@env";
import React, { useState } from "react";
import Alert from "../components/alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  name: "",
  role: "",
  login: (props) => {},
  signUp: (props) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [role, setRole] = useState(null);
  const navigation = useNavigation();

  const userIsLoggedIn = !!token;
  AsyncStorage.getItem("token").then((data) => {
    setToken(data);
  });
  AsyncStorage.getItem("name").then((data) => {
    setName(data);
  });
  AsyncStorage.getItem("role").then((data) => {
    setRole(data);
  });
  const loginHandler = async ({ email, password }) => {
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
          setToken(res?.data?.token);
          AsyncStorage.setItem("token", res?.data?.token);
          AsyncStorage.setItem("name", res?.data?.user?.name);
          AsyncStorage.setItem("role", res?.data?.user?.role);
        })
        .catch((err) => {
          Alert("error", "Sorry", err?.response?.data?.message);
        });
    } catch (err) {
      console.log(err);
    }
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
        url: `${REACT_APP_URL}/signUp`,
        method: "post",
        data: {
          name: name,
          role: role,
          registrationNo: registrationNo,
          email: email,
          password: password,
        },
      })
        .then((res) => {
          setToken(res?.data?.token);
          AsyncStorage.setItem("token", res?.data?.token);
          AsyncStorage.setItem("name", res?.data?.user?.name);
          AsyncStorage.setItem("role", res?.data?.user?.role);
        })
        .catch((err) => Alert("error", "Sorry", err?.response?.data?.message));
    } catch (err) {
      console.log(err);
    }
  };

  const logoutHandler = () => {
    setToken(null);
    AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: "HOME" }],
    });
  };

  const contextValue = {
    token: token,
    name: name,
    role: role,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    signUp: signUpHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
