import { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { startCase } from "lodash";
import { Box, Button, Divider, Icon, Pressable, Text } from "pearl-ui";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Share } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";

import { BusyIndicator } from "~components";
import { NavigatorParamList } from "~navigation";

import { useGetNotesAll } from "../api/hooks";
import Bird from "../assets/bird.svg";
import Edit from "../assets/edit.svg";
import { usePreventFlickering } from "../hooks/usePreventFlickering";
import { colors } from "./Note";
type SegmentControlProps = {
  value: number;
  onSelected: (v: number) => void;
};
const SegmentControl = ({ value, onSelected }: SegmentControlProps) => {
  const [selectedTag, setSelectedTag] = useState(value);
  const { t } = useTranslation();
  return (
    <SegmentedControlTab
      tabsContainerStyle={{
        flex: 1,
        backgroundColor: "#EEEEEF",
        borderRadius: 5,
        minWidth: 100,
      }}
      tabStyle={{
        backgroundColor: "#EEEEEF",
        margin: 2,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "transparent",
      }}
      borderRadius={5}
      activeTabStyle={{
        backgroundColor: "white",
        margin: 2,
        borderWidth: 2,
        borderRadius: 5,
      }}
      tabTextStyle={{ color: "#333333" }}
      activeTabTextStyle={{ color: "#000000" }}
      values={[
        t("screen.notes.segment.engoing", "En cours"),
        t("screen.notes.segment.archived", "Archivé"),
      ]}
      selectedIndex={selectedTag}
      onTabPress={(i) => {
        setSelectedTag(i);
        onSelected(i);
      }}
    />
  );
};

export const NotesScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "notes">
> = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedTag, setSelectedTag] = useState(0);
  const query = useGetNotesAll();

  const { isRefetching, handleRefetch } = usePreventFlickering(query.refetch);
  useEffect(() => {
    navigation.setOptions({
      title: t("screen.notes.title", "Notes"),
      headerRight: () => (
        <Pressable p="s" onPress={() => navigation.navigate("note")}>
          <Icon
            iconFamily="FontAwesome5"
            iconName="plus-square"
            size="l"
            color={"white"}
          />
        </Pressable>
      ),
    });
  }, [navigation, t]);
  const onShare = async () => {
    let notes = query?.data?.data.map(
      (item) => `${item.title}\n\n ${item.content} \n\n`
    );
    try {
      const result = await Share.share({
        message: [...notes, "Pamappy"].join(""),
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error?.message);
    }
  };

  const renderListEmptyComponent = useCallback(
    () => (
      <Box
        flexDirection="row"
        alignContent="center"
        justifyContent="center"
        alignItems="center"
        width={"100%"}
        flex={1}
        minHeight={300}
      >
        <Icon
          iconFamily="Feather"
          iconName="inbox"
          color={"gray4"}
          size="xxl"
        />
      </Box>
    ),
    []
  );

  const renderItemSeparatorComponent = useCallback(() => <Divider />, []);

  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        backgroundColor={"white"}
        paddingHorizontal={"m"}
        paddingVertical={"m"}
        onPress={() => navigation.navigate("note", { id: item._id })}
      >
        <Box flexDirection="row">
          <Box mt="l">
            <Bird fill={colors[item.tag].hex} width={25} height={20} />
          </Box>

          <Box ml="s" flex={1}>
            <Text variant="caption" color="gray6">
              {startCase(item.user.firstName)} - {dayjs(item.date).format("ll")}
            </Text>
            <Text variant="st1" color={"bleu"}>
              {item.title}
            </Text>
            <Text variant="p2" numberOfLines={3}>
              {item.content}
            </Text>
          </Box>

          <Box>
            <Edit />
          </Box>
        </Box>
      </Pressable>
    );
  };
  const Notes = query.data?.data.filter((item) =>
    selectedTag === 0 ? !item.archived : item.archived
  );
  return (
    <Box flex={1} backgroundColor={"blueTresClair"}>
      <Box
        backgroundColor={"white"}
        paddingVertical={"s"}
        paddingHorizontal={"m"}
        flexDirection="row"
        alignItems="center"
        borderTopWidth={1}
        borderBottomWidth={1}
        borderColor={"gray3"}
      >
        <Box
          flexDirection="row"
          alignContent="center"
          justifyContent="center"
          alignItems="center"
        >
          <SegmentControl
            value={selectedTag}
            onSelected={(v) => setSelectedTag(v)}
          />

          {query.data?.data.length != 0 ? (
            <>
              <Box flex={1}></Box>

              <Button
                onPress={onShare}
                variant="share"
                size="s"
                leftIcon={
                  <Icon
                    iconFamily="Ionicons"
                    iconName="share-outline"
                    color="white"
                    size="m"
                  />
                }
              >
                {t("screen.notes.button.share", "Partager")}
              </Button>
            </>
          ) : null}
        </Box>
      </Box>

      {query.isLoading ? (
        <BusyIndicator />
      ) : (
        <FlatList
          data={Notes}
          showsVerticalScrollIndicator={false}
          refreshing={isRefetching}
          onRefresh={handleRefetch}
          renderItem={renderItem}
          ItemSeparatorComponent={renderItemSeparatorComponent}
          ListEmptyComponent={renderListEmptyComponent}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
    </Box>
  );
};
