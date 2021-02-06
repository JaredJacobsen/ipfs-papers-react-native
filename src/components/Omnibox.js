import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { omniboxTextState } from "../atoms";
import { useRecoilState } from "recoil";

export default function Omnibox() {
  const [omniboxText, setOmniboxText] = useRecoilState(omniboxTextState);

  return (
    <TextInput
      mode="outlined"
      value={omniboxText}
      onChangeText={(text) => setOmniboxText(text)}
      style={{
        flex: 1,
        // width: "85%",
        // height: 10,
      }}
      dense={true}
      left={<TextInput.Icon name="magnify" onPress={() => {}} />}
      right={
        <TextInput.Icon
          name="arrow-top-right"
          onPress={() => {
            window.open(
              "https://scholar.google.com/scholar?q=" +
                encodeURIComponent(omniboxText)
            );
          }}
        />
      }
    />
  );
}
