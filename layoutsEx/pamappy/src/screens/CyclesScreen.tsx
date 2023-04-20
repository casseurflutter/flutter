import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { find, last, sortBy } from "lodash";
import { Box, Button, Pressable, Screen, Text } from "pearl-ui";
import React, { FC, useCallback, useEffect, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import { FlatList, Image } from "react-native";
import { uid } from "react-uid";

import { BusyIndicator, Card, DotsDivider } from "~components";
import { NavigatorParamList } from "~navigation";

import {
  useGetCyclesAll,
  useGetUsersMe,
  usePostCyclesCreate,
} from "../api/hooks";
import EggCheck from "../assets/egg-check.svg";
import Egg from "../assets/egg-small.svg";
import Bird from "../assets/icons/Bird";
import { CycleStepType } from "../models/CycleStepType";


const Ticks = ({ remainingEggs = 0, transfers = 0 }) => {
  return (
    <Box my="s" flex={1} flexWrap={"wrap"} flexDirection={"row"}>
      {Array.from(Array().keys(transfers)).map((m, index) => (
        <Box marginRight={"n"} key={uid(m, index)}>
          <EggCheck width={20} />
        </Box>
      ))}
      {Array.from(Array(remainingEggs).keys()).map((m, index) => (
        <Box marginRight={"n"} key={uid(m, index)}>
          <Egg width={20} />
        </Box>
      ))}
    </Box>
  );
};

export const CyclesScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "cycles">
> = ({ navigation }) => {
  const query = useGetUsersMe();

  const cyclesQuery = useGetCyclesAll();
  useFocusEffect(
    React.useCallback(() => {
      cyclesQuery.refetch();
    }, [])
  );

  const canCreateCycle = useMemo(() => {
    if (cyclesQuery.isFetched && cyclesQuery.data?.data != undefined) {
      const lastest = last(sortBy(cyclesQuery.data?.data, ["_id"]));

      if (
        !lastest ||
        lastest.steps.findIndex(
          (s) => s.stepType == CycleStepType.CYCLE_ENDED
        ) >= 0
      ) {
        return true;
      }
    }

    return false;
  }, [cyclesQuery, cyclesQuery.isRefetching]);
  const cycles = useMemo(() => {
    if (cyclesQuery.data && cyclesQuery.data.data) {
      return cyclesQuery.data?.data.sort((a, b) => a._id - b._id);
    }
    return [];
  }, [cyclesQuery]);

  const cycle = usePostCyclesCreate({
    onSuccess: (data) => {
      navigation.navigate("editCycle", { cycle: data.data });
      cyclesQuery.refetch();
      query.refetch();
    },
  });

  const { t } = useTranslation();

  useEffect(() => {
    navigation.setOptions({
      title: t("screen.cycles.title", "FIV"),
      headerRight: () =>
        canCreateCycle && (
          <Pressable
            isDisabled={cycle.isLoading}
            onPress={() => {
              if (
                query.data?.data?.currentCycle <= cyclesQuery.data?.data?.length
              ) {
                cycle.mutate();
              } else {
                navigation.navigate("editCycle", {
                  cycle: query.data?.data?.currentCycle,
                });
              }
            }}
            marginHorizontal={"m"}
          >
            <Text color="white">
              {t("screen.cycles.button.save", "Nouveau")}
            </Text>
          </Pressable>
        ),
    });
  }, [navigation, canCreateCycle, t, cycle, query, cyclesQuery]);

  const renderItem = ({ item, index }) => {
    const steps = item.steps || [];
    const closed =
      steps.findIndex((s) => s.stepType === CycleStepType.CYCLE_ENDED) > 0;
    const remainingEggs =
      find(steps, (o) => o.remainingEggs)?.remainingEggs || 0;
    const transfers =
      steps.find((s) => s.stepType == CycleStepType.TRANSFERT)
        ?.transferedEggs || 0;

    return (
      <Pressable
        key={index}
        borderColor={closed ? "gray3" : "rose"}
        borderWidth={closed ? 0 : 2}
        borderRadius="m"
        onPress={() => {
          navigation.navigate("editCycle", { cycle: item._id });
        }}
      >
        {({ pressed }) => (
          <Card
            opacity={pressed ? 0.5 : 1}
            flexDirection="row"
            alignItems="center"
            p="m"
            flex={1}
            withShadow={false}
          >
            <Box flexDirection="row" flex={1}>
              <Box mr="s">
                <Image
                  source={require("../assets/icons/ic_cycle.png")}
                  style={{
                    tintColor: closed ? "#979797" : "#DD4773",
                    width: 40,
                    height: 40,
                  }}
                  resizeMode="contain"
                />
              </Box>
              <Box>
                <Text
                  color={closed ? "gray8" : "rose"}
                  fontWeight="bold"
                  variant={"p1"}
                >
                  FIV {item._id}
                </Text>

                {closed ? (
                  <Box flexDirection="row">
                    <Text mr="l" color="gray8" fontSize="xs">
                      {t("screen.cycles.remaining-eggs", "Oeufs: {{count}}", {
                        count: remainingEggs,
                      })}
                    </Text>
                    <Text color="gray8" fontSize="xs">
                      {t("screen.cycles.transfers", "Tentatives: {{count}}", {
                        count: remainingEggs,
                      })}
                    </Text>
                  </Box>
                ) : (
                  <Ticks remainingEggs={remainingEggs} transfers={transfers} />
                )}
              </Box>
            </Box>
            <Box marginLeft={"xl"}>
              {closed ? (
                <Text color="gray8" variant={"p2"} marginHorizontal={"s"}>
                  {t("screen.cycles.state.closed", "Cloturé")}
                </Text>
              ) : (
                <Text color="rose" variant={"p2"} marginHorizontal={"s"}>
                  {t("screen.cycles.state.actuel", "Actuel")}
                </Text>
              )}
            </Box>
          </Card>
        )}
      </Pressable>
    );
  };
  const renderSeparator = () => <DotsDivider size="xl" color="bleuClair" />;

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
          <Trans i18nKey={"screen.cycle.empty.title"}>
            Cet espace te permet de suivre l’évolution de tes cylces.
          </Trans>
        </Text>
        <Text textAlign="center" color={"gray8"}>
          <Trans i18nKey={"screen.cycle.empty.description"}>
            Enregistre et garde une chronologie sur la ponction, le nombre
            d’oeufs disponibles, les transferts, la grossesse et la naissance.
          </Trans>
        </Text>
        <Button
          backgroundColor="bleu"
          activeBackgroundColor="bleu"
          isFullWidth
          marginTop={"l"}
          onPress={() => {
            if (
              query.data?.data?.currentCycle <= cyclesQuery.data?.data?.length
            ) {
              cycle.mutate();
            } else {
              navigation.navigate("editCycle", {
                cycle: query.data?.data?.currentCycle,
              });
            }
          }}
        >
          {t("screen.cycle.button.create-ponction", "Créer le premier cycle")}
        </Button>
      </Box>
    ),
    [cyclesQuery, query]
  );
  if (cyclesQuery.isLoading) {
    return (
      <Screen backgroundColor="grayBackground">
        <BusyIndicator />
      </Screen>
    );
  }

  return (
    <Box
      backgroundColor="grayBackground"
      paddingHorizontal={"m"}
      flex={1}
      paddingTop={"m"}
    >
      <FlatList
        data={cycles}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={renderListEmptyComponent}
        keyExtractor={(_, index) => index.toString()}
      />
    </Box>
  );
};
