import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useHistory } from "../routing.web";

export default function PageNotFound() {
  const history = useHistory();

  return (
    <View>
      <Text style={{ fontSize: 30, textAlign: "center" }}>
        404 Page Not Found
      </Text>
      <Text style={{ fontSize: 20, textAlign: "center" }}>
        The page you are looking for may not exist, may have been deleted, or
        may have failed to load.
      </Text>
      <Button onPress={() => history.push("/")}>Return To Home</Button>
    </View>
  );
}
