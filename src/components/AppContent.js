import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import { ActivityIndicator, IconButton, Title } from "react-native-paper";
import CustomButton from "./misc/CustomButton";
import Menu from "./Menu";
import Main from "./Main";
import useIpfsStatus from "../hooks/useIpfsStatus";
import { useTheme } from "react-native-paper";
import Omnibox from "./Omnibox";

export default function AppContent() {
  const [showMenu, setShowMenu] = useState(true);
  const { colors } = useTheme();
  const ipfsStatus = useIpfsStatus();

  if (ipfsStatus === "testing connection") {
    return <ActivityIndicator />;
  } else if (ipfsStatus === "unavailable") {
    return (
      <Text>
        Unable to reach IPFS. Make sure that IPFS is running at
        http://localhost:5001
      </Text>
    );
  }

  return (
    <View style={styles.outerContainer}>
      {/* <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => setShowMenu(!showMenu)} />
        <Appbar.Action icon="plus-box-outline" onPress={() => {}} />
        <Appbar.Content
          title="IPFS Papers"
          color="white"
          titleStyle={{ textAlign: "center" }}
        />
        <Appbar.Action icon="settings" onPress={() => {}} />
      </Appbar.Header> */}
      <View style={styles.navBar}>
        <View style={styles.navBarLeft}>
          <IconButton
            icon="menu"
            color={colors.primary}
            size={30}
            onPress={() => setShowMenu(!showMenu)}
          />
          <Title
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.primary,
            }}
          >
            IPFS PAPERS
          </Title>
        </View>
        <View style={styles.navBarCenter}>
          <Omnibox />
          <CustomButton title={"UPLOAD PAPER"} />
        </View>
        <View style={styles.navBarRight}>
          <IconButton
            icon="settings"
            color={colors.primary}
            size={30}
            onPress={() => setShowMenu(!showMenu)}
          />
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View
          style={StyleSheet.flatten([styles.menu, { flex: showMenu ? 15 : 0 }])}
        >
          <Menu />
        </View>
        <View
          style={StyleSheet.flatten([
            styles.main,
            { flex: showMenu ? 85 : 100 },
          ])}
        >
          <Main />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    overflow: "hidden",
  },
  navBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "lightgray",
  },
  bodyContainer: {
    flex: 15,
    flexDirection: "row",
  },
  navBarLeft: {
    flex: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  navBarCenter: {
    flex: 75,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  navBarRight: {
    flex: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  menu: {
    borderRightWidth: 1,
    borderColor: "lightgray",
    height: "100%",
  },
  main: {
    height: "100%",
  },
});
