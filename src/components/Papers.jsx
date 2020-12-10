import React from "react";
import { toPairs } from "ramda";
import useFetch from "../hooks/useFetch";
import { Button, Divider, Title, IconButton, Text } from "react-native-paper";
import { usePapersDb } from "../hooks/useOrbit";
import { ScrollView, View } from "react-native";

export default function Papers() {
  const papersDb = usePapersDb();

  const { papers, refetch } = useFetch(
    async ({ setState }) => setState({ papers: await papersDb.all }),
    [],
    { papers: [] }
  );

  // const papers = { key: { title: "title" } };

  console.log(toPairs(papers), papers);
  return (
    <ScrollView>
      {toPairs(papers).map(([k, paper]) => (
        <View key={k}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 10 }}>
              <View style={{ flex: 2 }}>
                <Title>{paper.title}</Title>
              </View>
              <View style={{ flex: 1 }}>
                <Text>Description</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <IconButton
                icon="delete"
                onPress={async () => {
                  await papersDb.del(k);
                  refetch();
                }}
              />
            </View>
          </View>
          <Divider />
        </View>
      ))}
      <Button
        onPress={async () => {
          const t = Date.now();
          const cid = await papersDb.set(`paper-${t}`, { title: t });
          console.log("cid of new paper: ", cid);
          refetch();
        }}
      >
        Add Paper
      </Button>
    </ScrollView>
  );
}
