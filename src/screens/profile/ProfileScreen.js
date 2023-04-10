import React, { useContext, useEffect, useState } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ProfileFlatlistComponent from "./ProfileFlatlistComponent";
import AuthContext from "../../store/auth-context";
import { useTheme, Button, Portal, Modal, Text, Avatar, IconButton } from "react-native-paper";
import FloatingActionButton from "../../components/FloatingActionButton";
import useAxios from "../../services";

const deviceHeigth = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const ProfileScreen = () => {
  const [portalVisibility, setPortalVisibility] = React.useState(false);
  const authCtx = useContext(AuthContext);
  const [user,setUser] = useState({name:"",email:"",role:""});
  const [edited,setEdited] = useState(true);
  const theme = useTheme();
  const axiosInstance = useAxios();

  const styles = StyleSheet.create({
    portalContainer: {
      backgroundColor: theme.colors.onPrimary,
      alignItems: "center",
      marginHorizontal: 16,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      width: "50%",
      alignSelf: "center",
    },
  });

  useEffect(() => {
    axiosInstance.get("/user/me")
    .then(res => setUser(res?.data?.data))
    .catch(err => console.log("err from profile",err))
  },[edited])


  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <View
        style={{
          flex: 0.3,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.primaryContainer,
        }}
      >
        <View
          style={{
            width: deviceWidth * 0.3,
            height: deviceWidth * 0.3,
            borderRadius: 100,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            elevation: 10,
            overflow:'hidden'
          }}
        >
          {user.profileImage ? <Avatar.Image size={deviceWidth * 0.28} source={{
              uri: user.profileImage
            }} />:<Avatar.Text size={deviceWidth * 0.28} label={user.name? user.name[0].toUpperCase():"Sorry"} />}
        </View>
      </View>

      <View
        style={{
          flex: 0.5,
          justifyContent: "flex-start",
        }}
      >
        <ProfileFlatlistComponent icon="user" text={user.name} editable={true} setEdited={setEdited} edited={edited}/>
        <ProfileFlatlistComponent icon="registered" text={user.role} />
        <ProfileFlatlistComponent icon="envelope" text={user.email} />
      </View>
      <FloatingActionButton
        icon="logout"
        onPress={() => setPortalVisibility(true)}
      />
      <Portal>
        <Modal
          visible={portalVisibility}
          onDismiss={() => setPortalVisibility(false)}
          contentContainerStyle={styles.portalContainer}
        >
          <Text
            variant="titleMedium"
            style={{
              marginBottom: 8,
              color: theme.colors.error,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Are you Sure, you want to logout?
          </Text>
          <Button
            textColor="#227C70"
            style={{ borderRadius: 8, width: "100%" }}
            onPress={() => {
              authCtx.logout();
              setPortalVisibility(false);
            }}
          >
            LOGOUT
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};
export default ProfileScreen;
