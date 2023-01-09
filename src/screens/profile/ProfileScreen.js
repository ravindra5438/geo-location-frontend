import React, { useContext } from "react";
import { View, Dimensions, Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import ProfileFlatlistComponent from "./ProfileFlatlistComponent";
import AuthContext from "../../store/auth-context";
import { useTheme, Button, Portal, Modal, Text } from "react-native-paper";

const deviceHeigth = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const ProfileScreen = () => {
  const [portalVisibility, setPortalVisibility] = React.useState(false);
  const authCtx = useContext(AuthContext);
  const theme = useTheme();

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

  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <View
        style={{
          height: 600,
          alignSelf: "center",
          width: 600,
          borderRadius: 400,
          backgroundColor: theme.colors.primary,
          position: "absolute",
          bottom: deviceHeigth * 0.8,
        }}
      ></View>
      <View
        style={{
          flex: 0.5,
          alignItems: "center",
          justifyContent: "center",
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
          }}
        >
          <Icon
            name="user"
            size={deviceWidth * 0.2}
            color={theme.colors.primary}
          />
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <ProfileFlatlistComponent icon="user" text={authCtx.name} />
        <ProfileFlatlistComponent icon="registered" text={authCtx.role} />
        <ProfileFlatlistComponent icon="envelope" text={authCtx.email} />
        {/* <ProfileFlatlistComponent icon="phone" text="Contact Number" /> */}
      </View>
      <View style={{ flex: 0.4 }}>
        <Pressable onPress={() => setPortalVisibility(true)}>
          <View
            style={{
              height: 130,
              width: 130,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <IconAntDesign
              size={80}
              name="logout"
              color={theme.colors.primary}
            />
            <Text style={{ color: theme.colors.primary }}>Logout</Text>
          </View>
        </Pressable>
      </View>
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
