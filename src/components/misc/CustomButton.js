import React from "react";
import { Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";

export default function CustomButton({ title, mode = "outlined", ...props }) {
  return (
    <View style={styles.buttonOuterLayout}>
      <View style={styles.buttonLayout}>
        <Button mode={mode} {...props}>
          {title}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterLayout: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLayout: {
    margin: 10,
  },
});
