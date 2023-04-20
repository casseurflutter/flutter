import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { filter, head } from "lodash";
import { Box, Screen, Text } from "pearl-ui";
import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions } from "react-native";
import * as Progress from "react-native-progress";

import { useGetCyclesNumberAll } from "~api";
import { BusyIndicator } from "~components";
import { NavigatorParamList } from "~navigation";

import { H3 } from "../components/Text";
import { CycleStepType } from "../models/CycleStepType";

export const EggsRemaining: FC<
  NativeStackScreenProps<NavigatorParamList, "eggsRemaining">
> = ({ navigation, route }) => {
  const query = useGetCyclesNumberAll(route.params.cycle);
  const { t } = useTranslation();

  useEffect(() => {
    navigation.setOptions({
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#2FB0ED",
      },
      title: t("screen.eggs-remaining.title", "Oeufs restants"),
    });
  }, [navigation]);

  if (query.isLoading) {
    return (
      <Screen backgroundColor="grayBackground">
        <BusyIndicator />
      </Screen>
    );
  }
  const windowWidth = Dimensions.get("window").width;

  const boxW = windowWidth / 2 - 40;

  const latest = head(query.data?.data);

  const punctions = filter(
    query.data?.data,
    (s) => s.stepType == CycleStepType.PUNCTURE
  ).length;

  const transfers = filter(
    query.data?.data,
    (s) => s.stepType == CycleStepType.TRANSFERT
  ).length;

  const eggTransfered = filter(
    query.data?.data,
    (s) => s.stepType == CycleStepType.TRANSFERT
  ).reduce((acc, s) => acc + s.transferedEggs || 0, 0);

  const totalEggs = filter(
    query.data?.data,
    (s) => s.stepType == CycleStepType.PUNCTURE
  ).reduce((acc, s) => acc + s.remainingEggs, 0);

  const remainingEggs = query.data?.data.find(
    (s) => s.remainingEggs != undefined
  )?.remainingEggs;

  return (
    <Screen flex={1} backgroundColor="athensGray">
      <Box mb="l">
        <Box>
          <Progress.Bar
            borderRadius={100}
            height={14}
            borderWidth={0}
            width={null}
            unfilledColor="white"
            color="#95D1EE"
            progress={latest?.stepType / 7}
          />
          <Box py="s" justifyContent="space-between" flexDirection="row">
            <H3 color="gray7">
              {t("screen.eggs-remaining.start.label", "Début")}
            </H3>
            <H3 color="blueNavigation">
              {t("screen.eggs-remaining.step.label", "Étape")}{" "}
              {latest?.stepType}/7
            </H3>
            <H3 color="gray7">{t("screen.eggs-remaining.end.label", "Fin")}</H3>
          </Box>
        </Box>
      </Box>

      <Box flexWrap="wrap" flexDirection="row">
        <Box mr="xl" pb="m" borderRadius="l">
          <H3 fontWeight="bold" pb="s" color="rose">
            {t(
              "screen.eggs-remaining.punction-past.label",
              "Ponctions passées"
            )}
          </H3>
          <Box
            w={boxW}
            h={96}
            borderRadius="m"
            justifyContent="center"
            alignItems="center"
            bg="white"
          >
            <Text fontWeight="bold" color="rose">
              {punctions}
            </Text>
          </Box>
        </Box>
        <Box pb="m">
          <H3 pb="s" fontWeight="bold" color="rose">
            {t(
              "screen.eggs-remaining.number-of-transfers.label",
              "Nombre de transferts"
            )}
          </H3>
          <Box
            w={boxW}
            h={96}
            borderRadius="m"
            justifyContent="center"
            alignItems="center"
            bg="white"
          >
            <Text fontWeight="bold" color="rose">
              {transfers}
            </Text>
          </Box>
        </Box>
        <Box pb="m" mr="xl">
          <H3 fontWeight="bold" pb="s" color="rose">
            {t(
              "screen.eggs-remaining.fresh-eggs-transferred.label",
              "Oeufs frais transférés"
            )}
          </H3>
          <Box
            w={boxW}
            h={96}
            justifyContent="center"
            borderRadius="m"
            alignItems="center"
            bg="white"
          >
            <Text fontWeight="bold" color="rose">
              {eggTransfered}
            </Text>
          </Box>
        </Box>
        <Box>
          <H3 fontWeight="bold" pb="s" color="rose">
            {t(
              "screen.eggs-remaining.total-frozen-eggs.label",
              "Total oeufs congelés"
            )}
          </H3>
          <Box
            w={boxW}
            h={96}
            borderRadius="m"
            justifyContent="center"
            alignItems="center"
            bg="white"
          >
            <Text fontWeight="bold" color="rose">
              {totalEggs}
            </Text>
          </Box>
        </Box>

        <Box w={"100%"}>
          <H3 fontWeight="bold" pb="s" color="rose">
            {t("screen.eggs-remaining.fiv.label", "Oeufs restant ce FIV")}
          </H3>
          <Box
            h={96}
            borderRadius="m"
            justifyContent="center"
            p="l"
            alignItems="center"
            bg="rose"
          >
            <Text fontWeight="bold" color="white">
              {remainingEggs}
            </Text>
          </Box>
        </Box>
      </Box>
    </Screen>
  );
};
