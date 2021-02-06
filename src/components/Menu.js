import React from "react";
import { List } from "react-native-paper";
import { View, ScrollView } from "react-native";

export default function Menu() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <List.Accordion
          title="Tags"
          left={(props) => <List.Icon {...props} icon="account" />}
        >
          <List.Item title="web3" />
          <List.Item
            title="machine-learning"
            left={(props) => <List.Icon {...props} icon="sync" />}
          />
        </List.Accordion>
        <List.Accordion
          title="Authors"
          left={(props) => <List.Icon {...props} icon="account" />}
        >
          <List.Item title="web3" />
          <List.Item
            title="machine-learning"
            left={(props) => <List.Icon {...props} icon="sync" />}
          />
        </List.Accordion>
      </ScrollView>
    </View>
  );
}
