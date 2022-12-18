import React from "react";
import { DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";
import {
  useTheme,
  Button,
  Portal,
  Modal,
  Text,
  Divider,
} from "react-native-paper";
import AuthContext from "../store/auth-context";

export default CustomDrawer = (props) => {
  const authCtx = React.useContext(AuthContext);
  const theme = useTheme();
  const [portalVisibility, setPortalVisibility] = React.useState(false);

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
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View>
        <DrawerItemList {...props} />
      </View>
      <DrawerItem
        labelStyle={{ fontWeight: "700" }}
        inactiveBackgroundColor={theme.colors.primary}
        inactiveTintColor={theme.colors.onPrimary}
        label="LOGOUT"
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
