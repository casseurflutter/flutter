import { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { Box, Divider, Icon, Pressable, Text } from "pearl-ui";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { BusyIndicator, FlatList } from "~components";
import { NavigatorParamList } from "~navigation";

import { useGetMessagesAll } from "../api/hooks";
import Ellipse from "../assets/Ellipse.svg";
import { usePreventFlickering } from "../hooks/usePreventFlickering";

const MessageItem: FC<any> = ({ item, onPress }) => {
  return (
    <Pressable onPress={onPress} p="s">
      <Box flexDirection="row">
        <Box pt="s" px="s">
          <Ellipse fill="#4EC19F" width={12} height={12} />
        </Box>
        <Box flex={1}>
          <Box justifyContent="space-between" flexDirection="row">
            <Box>
              <Text variant="t2" color="blueNavigation">
                {item.title}
              </Text>
            </Box>
            <Box flexDirection="row">
              <Text variant="p2" color="gray7">
                {dayjs(item.date).format("hh:mm")}
              </Text>
              <Icon
                iconFamily="Ionicons"
                iconName="chevron-forward"
                color="blueNavigation"
                size="l"
              />
            </Box>
          </Box>

          <Text numberOfLines={3} color="gray7" variant="p2">
            {item.content}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
};

export const MessagesScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "messages">
> = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedTag, setSelectedTag] = useState(0);
  const { data, isLoading, refetch } = useGetMessagesAll();
  const { isRefetching, handleRefetch } = usePreventFlickering(refetch);
  useEffect(() => {
    navigation.setOptions({
      title: t("screen.message.title", "Messages"),
      headerShadowVisible: true,
    });
  }, [navigation, t]);

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

  const renderItem = ({ item, index }) => {
    return (
      <MessageItem
        onPress={() => navigation.navigate("messageDetails", { id: item._id })}
        item={item}
        key={index}
      />
    );
  };
  const renderSeparator = useCallback(() => <Divider />, []);
  return (
    <Box flex={1} backgroundColor={"blueTresClair"}>
      {isLoading ? (
        <BusyIndicator />
      ) : (
        <FlatList
          data={data?.data}
          refreshing={isRefetching}
          onRefresh={handleRefetch}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparator}
          contentContainerStyle={{
            backgroundColor: "white",
          }}
          ListEmptyComponent={renderListEmptyComponent}
        />
      )}
    </Box>
  );
};
