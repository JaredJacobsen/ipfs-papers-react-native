import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ActivityIndicator, Appbar } from "react-native-paper";
import Menu from "./Menu";
import Main from "./Main";
import useIpfs from "../hooks/useIpfs";

export default function AppContent() {
  const [showMenu, setShowMenu] = useState(true);
  const { loading } = useIpfs();

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.outerContainer}>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => setShowMenu(!showMenu)} />
        <Appbar.Content
          title="IPFS Papers"
          color="white"
          titleStyle={{ textAlign: "center" }}
        />
      </Appbar.Header>
      <View style={styles.innerContainer}>
        <View
          style={StyleSheet.flatten([styles.menu, { flex: showMenu ? 20 : 0 }])}
        >
          <Menu />
        </View>
        <View
          style={StyleSheet.flatten([
            styles.main,
            { flex: showMenu ? 80 : 100 },
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
  innerContainer: {
    flex: 99999, //Messages will not be correctly positioned without this
    flexDirection: "row",
  },
  menu: {
    borderRightWidth: 1,
    borderColor: "lightgray",
    height: "100%",
  },
  main: {
    flex: 80,
    height: "100%",
  },
});
