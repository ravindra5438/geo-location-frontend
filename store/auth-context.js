import axios from "axios"
import {REACT_APP_URL} from "@env"
import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (props) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token;

  const loginHandler = async({email,password}) => {
      console.log("auth context",email,password);
      console.log("URL",REACT_APP_URL)
      try {
          const data = await axios({
              url:`${REACT_APP_URL}/login`,
              method:"post",
              data:{
                  email:email,
                  password:password,
                }
            })
            console.log(data.data);
            setToken(data.data.token);
} catch (err) {
    console.log(err);
}
console.log("token in auth",token);


  };

  const logoutHandler = () => {
    setToken(null);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;