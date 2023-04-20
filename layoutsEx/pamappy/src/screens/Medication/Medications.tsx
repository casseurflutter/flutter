import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Pressable, Text, TextLink } from "pearl-ui";
import React, { FC, useCallback, useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Image } from "react-native";

import { BusyIndicator, Card, FlatList } from "~components";
import { NavigatorParamList } from "~navigation";

import { useGetMedicationsAll } from "../../api/hooks";
import Bird from "../../assets/icons/Bird";
import { usePreventFlickering } from "../../hooks/usePreventFlickering";

export const MedicationScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "medications">
> = ({ navigation }) => {
  const { t } = useTranslation();

  useEffect(() => {
    navigation.setOptions({
      title: t("screen.add-medication.title", "Médicaments"),
      headerStyle: {
        backgroundColor: "#2FB0ED",
      },
      headerTintColor: "white",
      headerRight: () => (
        <TextLink
          p="s"
          onPress={() => navigation.navigate("addMedication")}
          variant="save"
        >
          {t("screen.medications.button.new", "Nouveau")}
        </TextLink>
      ),
    });
  }, [navigation, t]);
  const query = useGetMedicationsAll();
  const { isRefetching, handleRefetch } = usePreventFlickering(query.refetch);
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <Pressable
        my="xs"
        key={index}
        onPress={() => {
          navigation.navigate("addMedication", { id: item._id });
        }}
      >
        {({ pressed }) => (
          <Card
            borderColor="gray3"
            borderWidth={1}
            borderRadius="m"
            opacity={pressed ? 0.5 : 1}
            flexDirection="row"
            alignItems="center"
            p="m"
            flex={1}
            withShadow={false}
          >
            <Box alignItems="center" flexDirection="row" flex={1}>
              <Box mr="s">
                <Image
                  source={require("../../assets/icons/ic_cycle.png")}
                  style={{ tintColor: "#61BBE6", width: 40, height: 40 }}
                  resizeMode="contain"
                />
              </Box>
              <Text color="bleu">{item.title}</Text>
            </Box>
          </Card>
        )}
      </Pressable>
    );
  };

  const renderListEmptyComponent = useCallback(
    () => (
      <Box
        my="xxl"
        alignContent="center"
        justifyContent="center"
        alignItems="center"
      >
        <Box marginVertical={"l"}>
          <Bird width={70} height={50} fillColor="#979797" />
        </Box>
        <Text
          color="gray8"
          variant="p1"
          fontWeight="semibold"
          textAlign="center"
        >
          <Trans i18nKey={"screen.medications.empty.title"}>
            Cet espace te permet de créer un médicament
          </Trans>
        </Text>
      </Box>
    ),
    []
  );
  return (
    <Box flex={1} bg="athensGray">
      {query.isLoading ? (
        <BusyIndicator />
      ) : (
        <FlatList
          refreshing={isRefetching}
          onRefresh={handleRefetch}
          data={query.data?.data}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          ListEmptyComponent={renderListEmptyComponent}
          contentContainerStyle={{
            marginHorizontal: 20,
            marginTop: 20,
            paddingBottom: 100,
          }}
        />
      )}
    </Box>
  );
};
