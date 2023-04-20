import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Divider,
  Input,
  Pressable,
  Screen,
  Text,
  TextLink,
} from "pearl-ui";
import React, { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Platform } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { useQueryClient } from "react-query";
import { uid } from "react-uid";

import { CycleStep, getCyclesNumberAll } from "~api";
import { BusyIndicator, Card, CardLabelValue } from "~components";
import { NavigatorParamList } from "~navigation";

import {
  useDeleteCyclesStepIdDelete,
  useGetCyclesNumberAll,
  useGetCyclesStepId,
  usePostCyclesStepCreate,
  usePutCyclesStepIdEdit,
} from "../../api/hooks";
import { CycleStepType } from "../../models/CycleStepType";

export const EditStepScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "editStep">
> = ({ navigation, route }) => {
  const [date, setDate] = useState<Date | undefined>();
  const [eggs, setEggs] = useState<number | undefined>();
  const [transferedEggs, setTransferedEggs] = useState<number>(0);
  const [maxEggs, setMaxEggs] = useState<number>(15);
  const [minDate, setMinDate] = useState(new Date());
  const eggModalRef = useRef<Modalize>(null);

  const [currentStep, setCurrentStep] = useState<CycleStep | undefined>(null);
  const modalRef = useRef<Modalize>(null);
  const [note, setNote] = useState("");
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const stepType = route.params.stepType ?? 1;
  const editable = route.params.editable ?? true;

  const query = useGetCyclesStepId(route.params?.id, {
    onSuccess: ({ data }) => {
      setDate(data.date);
      setNote(data.note);
      setEggs(data.remainingEggs);
      setTransferedEggs(data.transferedEggs);
      setCurrentStep(data);
    },
  });

  const cyclesQuery = useGetCyclesNumberAll(route.params.cycle, {
    enabled: query.isFetched,
    onSuccess: ({ data }) => {
      const copy = Array.from(data);
      const [current, previous, ...rest] = copy.reverse();
      const previousJ3 = data.find((s) => s.stepType == CycleStepType.J3);
      const previousJ5 = data.find((s) => s.stepType == CycleStepType.J5);

      if (previous?.remainingEggs) {
        setMaxEggs(previous.remainingEggs);
      } else if (previousJ3?.remainingEggs) {
        setMaxEggs(previousJ3.remainingEggs);
      } else if (previousJ5?.remainingEggs) {
        setMaxEggs(previousJ5.remainingEggs);
      }

      if (previous?.date) {
        const previousDate = dayjs(previous.date).toDate();
        setMinDate(previousDate);
      }
    },
  });

  const updateCycleStep = usePutCyclesStepIdEdit({
    onSuccess: () => {
      navigation.goBack();
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
      console.log(e.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries(getCyclesNumberAll.key);
    },
  });

  const deleteCycleStep = useDeleteCyclesStepIdDelete({
    onSuccess: () => {
      navigation.goBack();
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
      console.log(e.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries(getCyclesNumberAll.key);
    },
  });

  const createCycleStep = usePostCyclesStepCreate({
    onSuccess: () => {
      navigation.goBack();
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
    },
    onSettled: () => {
      queryClient.invalidateQueries(getCyclesNumberAll.key);
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmit = () => {
    if (route.params?.id) {
      updateCycleStep.mutate({
        id: route.params?.id,
        requestBody: {
          cycleNumber: route.params.cycle,
          stepType,
          note: note,
          date: dayjs(date).toString(),
          remainingEggs: eggs,
          transferedEggs,
        },
      });
    } else {
      if (stepType == CycleStepType.PUNCTURE && (eggs == 0 || !eggs)) {
        Alert.alert(
          t("alert.error.title", "Erreur"),
          t(
            "alert.error.create.puncture.message",
            "Merci de saisir le nombre d'oeufs prélevés pour la ponction"
          ),
          [{ text: t("alert.error.500.button.ok", "Ok") }]
        );
      } else {
        createCycleStep.mutate({
          requestBody: {
            cycleNumber: route.params.cycle,
            stepType,
            note: note,
            date: dayjs(date).toString(),
            remainingEggs: eggs,
            transferedEggs,
          },
        });
      }
    }
  };

  const handleDeleteStep = () => {
    deleteCycleStep.mutate({
      id: route.params?.id,
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#2FB0ED",
      },
      title: t(`cycle.step-type-${stepType}`),
      headerRight: () => (
        <TextLink variant="header" onPress={() => handleSubmit()}>
          {t("screen.new-puncture.button.save", "Enregistrer")}
        </TextLink>
      ),
    });
  }, [navigation, t, handleSubmit, stepType]);

  const handleDateOnChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const handleShowDatePicker = () => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        mode: "date",
        onChange: handleDateOnChange,
        value: date ? dayjs(date).toDate() : new Date(),
        is24Hour: true,
        display: "spinner",
      });
    } else {
      modalRef.current?.open();
    }
  };

  const handleSelectEgg = (value: number) => {
    if (currentStep?.stepType == CycleStepType.TRANSFERT) {
      setTransferedEggs(value);
      if (maxEggs && maxEggs > 0) {
        setEggs(maxEggs - value);
      }
    } else {
      setEggs(value);
    }
    eggModalRef.current?.close();
  };

  if (query.isLoading && route.params?.id) {
    return (
      <Screen backgroundColor="grayBackground">
        <BusyIndicator />
      </Screen>
    );
  }

  const disableDate =
    [
      CycleStepType.J3,
      CycleStepType.J5,
      CycleStepType.CYCLE_ENDED,
      CycleStepType.PUNCTURE,
    ].includes(query.data?.data.stepType) || !editable;
  const disableEggs =
    (query.data?.data.stepType === 1 && route.params?.id != undefined) ||
    !editable;

  return (
    <Screen backgroundColor="grayBackground" scrollable={false}>
      {query.isLoading && cyclesQuery.isLoading ? (
        <BusyIndicator />
      ) : (
        <>
          <Card withShadow={false} borderRadius="m">
            <CardLabelValue
              label={t("screen.new-puncture.date.label", "Date")}
              placeholder={
                disableDate
                  ? t("screen.new-puncture.date-automatic", "Date automatique")
                  : t("screen.new-puncture.date.select", "Choisir")
              }
              value={disableDate ? null : dayjs(date).format("LL")}
              onPress={handleShowDatePicker}
              disabled={disableDate}
            />

            {currentStep === null ||
            ![
              CycleStepType.BIRTH,
              CycleStepType.CONFIRMED_PREGNANCY,
              CycleStepType.CYCLE_ENDED,
            ].includes(currentStep?.stepType) ? (
              <>
                <Divider />
                <CardLabelValue
                  label={t(
                    "screen.new-puncture.eggs-collected.label",
                    "Nombre d'oeufs prélevés"
                  )}
                  placeholder={t(
                    "screen.new-puncture.eggs-collected.select",
                    "Choisir"
                  )}
                  onPress={() => eggModalRef.current?.open()}
                  disabled={disableEggs}
                  value={
                    currentStep?.stepType == CycleStepType.TRANSFERT
                      ? transferedEggs
                      : eggs
                  }
                />
              </>
            ) : null}
          </Card>
          <Card my="m" withShadow={false} borderRadius="m">
            <Input
              placeholder="Notes"
              placeholderTextColor="neutral.400"
              multiline
              isFullWidth
              minHeight={100}
              value={note}
              numberOfLines={4}
              onChangeText={(value) => setNote(value)}
            />
          </Card>
          {__DEV__ && (
            <TextLink variant={"danger"} onPress={() => handleDeleteStep()}>
              Delete
            </TextLink>
          )}
        </>
      )}

      <Portal>
        <Modalize
          ref={modalRef}
          scrollViewProps={{ showsVerticalScrollIndicator: false }}
          snapPoint={300}
          withHandle={false}
        >
          <DateTimePicker
            testID="dateTimePicker"
            themeVariant="light"
            value={date ? dayjs(date).toDate() : new Date()}
            mode={"date"}
            is24Hour={true}
            display="spinner"
            onChange={handleDateOnChange}
          />
          <Button
            isFullWidth
            variant="primary"
            marginHorizontal={"m"}
            onPress={() => modalRef.current?.close()}
          >
            {t("common.button.save", "Enregistrer")}
          </Button>
        </Modalize>
        <Modalize
          ref={eggModalRef}
          snapPoint={500}
          modalHeight={500}
          withHandle={false}
          closeSnapPointStraightEnabled={false}
          flatListProps={{
            data: Array.from(Array(maxEggs).keys()),
            keyExtractor: (item) => uid(item),
            renderItem: ({ item, index }) => (
              <Pressable
                onPress={() => handleSelectEgg(item + 1)}
                backgroundColor={"transparent"}
              >
                <Box alignItems={"center"} marginVertical={"m"} flex={1}>
                  <Text
                    color={eggs === item + 1 ? "blueNavigation" : "neutral.700"}
                  >
                    {item + 1}
                  </Text>
                </Box>
              </Pressable>
            ),
            showsVerticalScrollIndicator: false,
          }}
        />
      </Portal>
    </Screen>
  );
};
