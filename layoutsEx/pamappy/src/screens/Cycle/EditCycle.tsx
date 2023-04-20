import { useActionSheet } from "@expo/react-native-action-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { get } from "lodash";
import {
  Box,
  Button,
  Divider,
  Pressable,
  Screen,
  Text,
  TextLink,
} from "pearl-ui";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Alert, FlatList, Image } from "react-native";
import { uid } from "react-uid";

import {
  useGetCyclesAll,
  useGetCyclesNumberAll,
  usePostCyclesStepCreate,
} from "~api";
import { BusyIndicator, Card, DotsDivider, P } from "~components";
import { NavigatorParamList } from "~navigation";

import Birth from "../../assets/birth.svg";
import CalendarIcon from "../../assets/cycle-calendar.svg";
import Egg from "../../assets/egg.svg";
import Bird from "../../assets/icons/Bird";
import RoseBird from "../../assets/roseBird.svg";
import Transfert from "../../assets/transfert.svg";
import { CycleStepType } from "../../models/CycleStepType";

function stepTypeIcon(step: number) {
  if (step == 1) {
    return (
      <Image
        source={require("../../assets/heartup.png")}
        style={{ height: 30, width: 20 }}
        resizeMode="contain"
      />
    );
  } else if (step == 7) {
    return <RoseBird width={35} />;
  } else if (step == 4) {
    return <Transfert height={35} width={24} />;
  } else if (step == 5) {
    return (
      <Image
        source={require("../../assets/pregnancy.png")}
        style={{ height: 40, width: 25, marginTop: 5 }}
        resizeMode="contain"
      />
    );
  } else if (step == 6) {
    return <Birth width={24} />;
  } else {
    return <CalendarIcon height={35} width={25} />;
  }
}

function stepTypeColor(step: number): string {
  if (step == 1 || step == 5) {
    return "vert";
  } else if (step == 7 || step == 4) {
    return "rose";
  } else {
    return "blueNavigation";
  }
}

function ReadMoreText({ value }: any) {
  const [textShown, setTextShown] = useState(false);
  const [numLines, setNumLines] = useState<number | undefined>(undefined);
  const [showMoreButton, setShowMoreButton] = useState(false);

  const { t } = useTranslation();

  const onTextLayout = useCallback(
    (e) => {
      if (e.nativeEvent.lines.length > 1 && !textShown) {
        setShowMoreButton(true);
        setNumLines(2);
      }
    },
    [textShown]
  );
  const toggleTextShown = () => {
    setTextShown(!textShown);
  };
  useEffect(() => {
    setNumLines(textShown ? undefined : 2);
  }, [textShown]);
  return (
    <Box mr="l">
      <P
        onTextLayout={onTextLayout}
        ellipsizeMode="tail"
        numberOfLines={numLines}
      >
        {value}
      </P>
      {showMoreButton ? (
        <TextLink onPress={() => toggleTextShown()} variant="link">
          {textShown
            ? t("common.see-less", "Voir moins")
            : t("common.see-more", "Voir plus")}
        </TextLink>
      ) : null}
    </Box>
  );
}
function TransfertReminder({ remainingEggs = 0 }) {
  return (
    <>
      <Card p="m" withShadow={false}>
        <Box flexDirection="row" alignContent={"center"} alignItems={"center"}>
          <Egg width={30} />

          <Text variant="p2" color="neutral.600" marginHorizontal={"m"}>
            {/* {t(
              "screen.edit-cycle.remainingEggs",
              "{{count}} oeufs sont encore disponibes",
              {
                count: 0,
              }
            )} */}
            <Trans
              i18nKey="screen.edit-cycle.remainingEggs"
              count={remainingEggs}
            >
              {`{{ count }} oeufs sont encore disponibes`}
            </Trans>
          </Text>
        </Box>
      </Card>
      <DotsDivider size="xl" color="bleuClair" />
    </>
  );
}

export const EditCycleScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "editCycle">
> = ({ navigation, route }) => {
  const query = useGetCyclesNumberAll(route.params.cycle);
  const { showActionSheetWithOptions } = useActionSheet();
  const cyclesQuery = useGetCyclesAll();

  const closed = useMemo(
    () =>
      query.data?.data.findIndex(
        (i) => i.stepType === CycleStepType.CYCLE_ENDED
      ) >= 0,
    [query]
  );

  const cycleStep = usePostCyclesStepCreate({
    onSuccess: (data) => {
      cyclesQuery.refetch();
      if (data.data.stepType < 7) {
        navigation.navigate("editStep", {
          cycle: route.params.cycle,
          stepType: data.data.stepType,
          id: data.data._id,
        });
      }
    },
    onError: (e) => {
      Alert.alert(
        t("alert.error.title", "Erreur"),
        t(
          "alert.error.500.message",
          "Une erreur technique est survenue,merci de réessayer ultérieurement."
        ),
        [{ text: t("alert.error.500.button.ok", "Ok") }]
      );
      console.log(JSON.stringify(e));
    },
    onSettled: () => {
      query.refetch();
      cyclesQuery.refetch();
    },
  });

  const { t } = useTranslation();
  useEffect(() => {
    navigation.setOptions({
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#2FB0ED",
      },
      title: t("screen.edit-cycle.title", "FIV {{number}}", {
        number: route.params.cycle,
      }),
    });
  }, [navigation, t]);

  const cycles = useMemo(() => {
    if (query.data && query.data.data) {
      return query.data?.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    }
    return [];
  }, [query]);

  const renderItem = ({ item, index }) => {
    const previousStep = get(query.data.data, index - 1, undefined);
    const transfertRemaining = item.remainingEggs - item.transferedEggs;
    return (
      <>
        {item.stepType == CycleStepType.TRANSFERT &&
        !closed &&
        transfertRemaining > 0 ? (
          <TransfertReminder remainingEggs={transfertRemaining} />
        ) : null}
        <Card withShadow={false} padding={"m"}>
          <Box>
            <Box flexDirection="row" alignItems="flex-start">
              {stepTypeIcon(item.stepType)}
              <Box flexDirection="column" marginLeft={"s"}>
                <Box flexDirection="row">
                  <Text variant="st1" color={stepTypeColor(item.stepType)}>
                    {t(`cycle.step-type-${item.stepType}`)}
                  </Text>

                  {item.stepType == CycleStepType.TRANSFERT ? (
                    <Text
                      ml="xs"
                      variant="st1"
                      color={stepTypeColor(item.stepType)}
                    >
                      {item.transfertNumber}
                    </Text>
                  ) : null}
                </Box>

                {item.date ? (
                  <Text variant="p2" color="gray7">
                    {dayjs(item.date).format("LL")}
                  </Text>
                ) : null}
              </Box>
              <Box flex={1} />
              {!closed && (
                <TextLink
                  variant="primary"
                  onPress={() =>
                    navigation.navigate("editStep", {
                      cycle: route.params.cycle,
                      stepType: item.stepType,
                      id: item._id,
                      editable:
                        index == 0 ||
                        item.stepType == CycleStepType.CONFIRMED_PREGNANCY ||
                        item.stepType == CycleStepType.BIRTH,
                    })
                  }
                >
                  {t("common.button.edit", "Modifier")}
                </TextLink>
              )}
            </Box>

            <Box flex={1}>
              {item?.note ? (
                <>
                  <Divider my="s" />
                  <ReadMoreText value={item?.note} />
                </>
              ) : null}
            </Box>

            {![
              CycleStepType.CONFIRMED_PREGNANCY,
              CycleStepType.BIRTH,
              CycleStepType.CYCLE_ENDED,
            ].includes(item.stepType) ? (
              <Box marginLeft={"l"}>
                {item.remainingEggs > 0 || item.transferedEggs > 0 ? (
                  <Box my="s" flex={1} flexWrap={"wrap"} flexDirection={"row"}>
                    {Array.from(
                      Array(
                        item.stepType == CycleStepType.TRANSFERT
                          ? item.transferedEggs
                          : item.remainingEggs || 0
                      ).keys()
                    ).map((m, index) => (
                      <Box marginRight={"n"} key={uid(m, index)}>
                        <Egg width={25} />
                      </Box>
                    ))}
                    {/* {Array.from(
                      Array(
                        item.stepType == CycleStepType.TRANSFERT
                          ? item.transferedEggs
                          : item.stepType == CycleStepType.J3 ||
                            item.stepType == CycleStepType.J5
                          ? previousStep
                            ? previousStep.remainingEggs - item.transferedEggs
                            : 0
                          : 0
                      ).keys()
                    ).map((m, index) => (
                      <Box marginRight={"n"} key={uid(m, index)}>
                        <EggGray width={25} />
                      </Box>
                    ))} */}
                  </Box>
                ) : item.stepType != CycleStepType.J5 && !closed ? (
                  <TextLink
                    variant="danger"
                    onPress={() =>
                      navigation.navigate("editStep", {
                        cycle: route.params.cycle,
                        stepType: item.stepType,
                        id: item._id,
                      })
                    }
                  >
                    {t(
                      "screen.edit-cycle.specify-egss.label",
                      "Précisez le nombre d’oeufs disponibles"
                    )}
                  </TextLink>
                ) : null}
              </Box>
            ) : null}
          </Box>
        </Card>
      </>
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
          <Bird fillColor="#979797" />
        </Box>
        <Text
          color={"gray8"}
          variant="p1"
          fontWeight="semibold"
          textAlign="center"
        >
          <Trans i18nKey={"screen.edit-cycle.empty.title"}>
            La première FIV a bien été créée.
          </Trans>
        </Text>
        <Text textAlign="center" color={"gray8"}>
          <Trans i18nKey={"screen.edit-cycle.empty.description"}>
            La première étape d’un FIV est la ponction.
          </Trans>
        </Text>
        <Button
          isFullWidth
          marginTop={"l"}
          backgroundColor="bleu"
          activeBackgroundColor="bleuClair"
          onPress={() =>
            navigation.navigate("editStep", {
              cycle: route.params.cycle,
              stepType: 1,
            })
          }
        >
          {t(
            "screen.edit-cycle.button.create-puncture",
            "Enregistrer une ponction"
          )}
        </Button>
      </Box>
    ),
    []
  );

  const handleShowEventActionSheet = () => {
    const cycles = query.data?.data ?? [];

    let options = [
      t("screen.edit-cycle.add-event.end-cycle", "Cloturer le cycle"),
      t("common.cancel", "Annuler"),
    ];

    let optionIndex = [7];

    const latestTransfert = cycles.find(
      (i) => i.stepType == CycleStepType.TRANSFERT
    );

    // add transfert
    if (
      cycles.findIndex((i) => i.stepType == CycleStepType.CONFIRMED_PREGNANCY) <
        0 &&
      cycles.findIndex((i) => i.stepType == CycleStepType.BIRTH) < 0 &&
      (cycles[0].stepType == CycleStepType.J5 || cycles[0].remainingEggs > 0)
    ) {
      options.unshift(t("screen.edit-cycle.add-event.transfert", "Transferts"));
      optionIndex.unshift(4);
    }
    //

    if (
      cycles.findIndex((i) => i.stepType == CycleStepType.CONFIRMED_PREGNANCY) <
        0 &&
      cycles.findIndex((i) => i.stepType == CycleStepType.TRANSFERT) >= 0
    ) {
      options.unshift(
        t(
          "screen.edit-cycle.add-event.confirmed-pregnancy",
          "Grossesse confirmée"
        )
      );
      optionIndex.unshift(5);
    }
    //
    if (
      cycles.findIndex((i) => i.stepType == CycleStepType.BIRTH) < 0 &&
      cycles.findIndex(
        (i) => i.stepType == CycleStepType.CONFIRMED_PREGNANCY
      ) >= 0
    ) {
      options.unshift(t("screen.edit-cycle.add-event.birth", "Naissance"));
      optionIndex.unshift(6);
    }
    showActionSheetWithOptions(
      {
        options,
        title: t(
          "screen.edit-cycle.add-event.title",
          "Quel événement veux-tu ajouter ?"
        ),

        cancelButtonIndex: options.length - 1,
      },
      (buttonIndex) => {
        if (buttonIndex == undefined || buttonIndex == options.length - 1)
          return;

        const stepType = optionIndex[buttonIndex];

        const handleMutate = () => {
          cycleStep.mutate({
            requestBody: {
              cycleNumber: route.params.cycle,
              stepType: stepType,
              transfertNumber:
                stepType == CycleStepType.TRANSFERT && latestTransfert
                  ? latestTransfert.transfertNumber + 1
                  : 1,
              date:
                query.data?.data.length > 0
                  ? dayjs(query.data?.data[0].date).add(1, "hour").toDate()
                  : dayjs().endOf("day").toDate(),
            },
          });
        };

        if (stepType == CycleStepType.CYCLE_ENDED) {
          Alert.alert(
            t("screen.edit-cycle.alert.close.title", "Clôturer un cycle"),
            t(
              "screen.edit-cycle.alert.close.description",
              "Si tu clôtures un cycle, tu auras toujours accès aux événements enregistrés dans ce cyle mais tu ne pourras plus enregistrer de nouveaux événements."
            ),
            [
              {
                text: t("common.cancel", "Annuler"),
                style: "cancel",
              },
              {
                text: t(
                  "screen.edit-cycle.alert.close-cycle.button.confirm",
                  "Clôturer"
                ),
                style: "destructive",
                onPress: () => {
                  handleMutate();
                },
              },
            ]
          );
        } else {
          handleMutate();
        }
      }
    );
  };

  const renderListHeaderComponent = useCallback(
    () =>
      !query.isLoading && query.data?.data.length > 0 && !closed ? (
        <Box
          flexDirection="row"
          paddingTop={"m"}
          alignContent="center"
          justifyContent="center"
          alignItems="center"
          marginBottom={"m"}
        >
          <Button
            mr="s"
            backgroundColor="bleu"
            activeBackgroundColor="bleuClair"
            onPress={handleShowEventActionSheet}
            borderRadius="l"
            size="m"
            h={60}
          >
            {t(
              "screen.edit-cycle.button.register-event",
              "Enregistrer un événement"
            )}
          </Button>
          <Pressable
            activeBackgroundColor="blueTresClair"
            borderRadius="l"
            justifyContent="center"
            borderColor="blueNavigation"
            bg="blueTresClair"
            h={60}
            onPress={() =>
              navigation.navigate("eggsRemaining", {
                cycle: route.params.cycle,
              })
            }
            p="s"
            borderWidth={1}
          >
            <Text fontSize="s" color="gray8">
              {t("screen.edit-cycle.button.remaining-eggs", "Oeufs restants")}
            </Text>
          </Pressable>
        </Box>
      ) : (
        <Box
          paddingTop={"m"}
          alignContent="center"
          justifyContent="center"
          alignItems="center"
          marginBottom={"m"}
        />
      ),
    [query, t]
  );

  if (query.isLoading) {
    return (
      <Screen backgroundColor="grayBackground">
        <BusyIndicator />
      </Screen>
    );
  }
  return (
    <Box backgroundColor="grayBackground" flex={1} paddingHorizontal={"m"}>
      <FlatList
        data={cycles}
        refreshing={query.isRefetching}
        showsVerticalScrollIndicator={false}
        onRefresh={query.refetch}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={renderListHeaderComponent}
        ListEmptyComponent={renderListEmptyComponent}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </Box>
  );
};
