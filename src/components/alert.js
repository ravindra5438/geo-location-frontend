import Toast from "react-native-toast-message";

const Alert = (type, heading, text) => {
  Toast.show({
    type: type,
    position: "bottom",
    text1: heading,
    text2: text,
  });
};

export default Alert;
