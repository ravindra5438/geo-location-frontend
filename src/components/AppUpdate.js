import React from "react";
import {
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Linking,
  StyleSheet,
} from "react-native";

const AppUpdate = (props) => {
  const playstore_url =
    "https://play.google.com/store/apps/details?id=com.gkv.gkvapp";
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#D1CECE"
        translucent={true}
      />
      <View style={styles.container}>
        <Image
          style={{ width: "100%", marginTop: 0 }}
          source={require("../../assets/AppUpdate/appUpdate-top-cloudfull.png")}
        />
        <Image
          style={{ ...styles.funnyCloud, width: "100%", height: "40%" }}
          source={require("../../assets/AppUpdate/appUpdate-funny-cloud-bg.gif")}
        />
        <View style={styles.textContainer}>
          <Text style={styles.heading}>New Update is Available! </Text>
          <Text style={styles.subheading}>
            We added lots of new features and fix some bugs to make your
            experience as smooth as possible
          </Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(playstore_url);
            }}
          >
            <View>
              <Text style={styles.updateBtn}>UPDATE APP</Text>
            </View>
          </TouchableOpacity>
          {props.notNow ? (
            <TouchableOpacity onPress={props.onPress}>
              <View>
                <Text style={styles.notnowBtn}>NOT NOW </Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {props.notNow ? (
        <View
          style={{
            ...styles.bottomCloud,
            bottom: -280,
            width: "100%",
            marginBottom: 0,
          }}
        >
          <Image
            style={styles.bottomCloud1}
            source={require("../../assets/AppUpdate/btmCloud.png")}
          />
          <Image
            style={styles.bottomCloud2}
            source={require("../../assets/AppUpdate/btmCloud.png")}
          />
        </View>
      ) : (
        <View
          style={{
            ...styles.bottomCloud,
            bottom: -290,
            width: "100%",
            marginBottom: 0,
          }}
        >
          <Image
            style={styles.bottomCloud1}
            source={require("../../assets/AppUpdate/btmCloud.png")}
          />
          <Image
            style={styles.bottomCloud2}
            source={require("../../assets/AppUpdate/btmCloud.png")}
          />
        </View>
      )}
    </>
  );
};

export default AppUpdate;

const styles = StyleSheet.create({
  container: {
    marginTop: -100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 11,
  },
  funnyCloud: {
    marginTop: -80,
    zIndex: -1,
  },
  heading: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "700",
    alignSelf: "stretch",
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center",
    color: "#4E4D4D",
  },
  subheading: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    alignSelf: "stretch",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: "rgba(78, 77, 77, 0.8)",
    paddingHorizontal: 40,
    paddingVertical: 18,
  },
  textContainer: {
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: -20,
    position: "relative",
  },
  updateBtn: {
    fontSize: 17,
    textAlign: "center",
    width: "90%",
    backgroundColor: "#396EB3",
    color: "white",
    height: 47,
    marginTop: 15,
    marginBottom: 10,
    display: "flex",
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    textAlignVertical: "center",
    borderColor: "#396EB3",
  },
  notnowBtn: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    alignSelf: "stretch",
    fontSize: 16,
    lineHeight: 24,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "rgba(78, 77, 77, 0.4)",
  },
  bottomCloud: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    position: "absolute",
    bottom: 0,
    marginBottom: 0,
  },
  bottomCloud1: {
    opacity: 0.4,
    marginLeft: -60,
    marginTop: -10,
  },
  bottomCloud2: {
    opacity: 0.6,
    marginLeft: -40,
    marginTop: -20,
    position: "absolute",
    left: 290,
  },
});
