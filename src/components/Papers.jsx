import React from "react";
import { toPairs } from "ramda";
import useFetch from "../hooks/useFetch";
import { Button, Divider, Title, IconButton, Text } from "react-native-paper";
import useIpfs from "../hooks/useIpfs";
import { ScrollView, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Papers() {
  const { papersStore } = useIpfs();

  const { papers, refetch } = useFetch(
    async ({ setState }) => setState({ papers: await papersStore.all() }),
    [],
    { papers: [] }
  );

  console.log(papers, toPairs(papers));

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
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {paper.pdf && (
                <Button
                  style={{ flex: 1 }}
                  onPress={async () => {
                    try {
                      window.open("http://localhost:8080/ipfs/" + paper.pdf);
                    } catch (error) {
                      console.log("Failed to open pdf: ", error);
                    }
                  }}
                >
                  <Icon name="pdf-box" size={25} />
                </Button>
              )}
              <Button
                style={{ flex: 1 }}
                onPress={async () => {
                  await papersStore.del(k);
                  refetch();
                }}
              >
                <Icon name="delete" size={25} />
              </Button>
            </View>
          </View>
          <Divider />
        </View>
      ))}
      <Button
        onPress={async () => {
          const t = Date.now();
          const cid = await papersStore.set(`paper-${t}`, {
            title: t,
            pdf: "QmTPbKxxdPMeXHg4mYf2sbsPnRbxXh3pqCB6Ji21vqqeJF",
          });
          console.log("cid of new paper: ", cid);
          refetch();
        }}
      >
        Add Paper
      </Button>
    </ScrollView>
  );
}
