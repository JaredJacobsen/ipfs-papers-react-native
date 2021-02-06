import React from "react";
import { filter, lowerCase, toPairs } from "lodash/fp";
import useFetch from "../hooks/useFetch";
import { Button, Divider, Title, Text } from "react-native-paper";
import { ScrollView, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import papersStore from "../papersStore";
import { useRecoilValue } from "recoil";
import { omniboxTextState } from "../atoms";
import fuzzysearch from "fuzzysearch";

function useFilterPapers(papers) {
  const omniboxText = useRecoilValue(omniboxTextState);

  return omniboxText
    ? filter(
        (paper, k) =>
          fuzzysearch(lowerCase(omniboxText), lowerCase(paper.title)),
        papers
      )
    : papers;
}

export default function Papers() {
  const { papers, refetch } = useFetch(
    async ({ setState }) =>
      setState({ papers: await papersStore.fetchPapersFromIpfs() }),
    [],
    { papers: [] }
  );

  const papersFilt = useFilterPapers(papers);

  return (
    <ScrollView>
      {toPairs(papersFilt).map(([k, paper]) => (
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
      <Button onPress={async () => refetch()}>
        <Icon name="refresh" size={40} />
      </Button>
    </ScrollView>
  );
}
