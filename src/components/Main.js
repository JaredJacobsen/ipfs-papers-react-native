import React from "react";
import { Route, Switch } from "../routing";
import { View } from "react-native";
import PageNotFound from "./PageNotFound";
import Papers from "./Papers";

export default function Main() {
  return (
    <View style={{ flex: 1 }}>
      <Switch>
        <Route path="/papers/" component={Papers} />
        <Route path="/" component={Papers} />
        <Route component={PageNotFound} />
      </Switch>
    </View>
  );
}
