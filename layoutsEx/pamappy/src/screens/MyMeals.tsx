import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { Button, Divider, Screen } from "pearl-ui";
import React, { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";

import { BusyIndicator, Card, CardLabelValue } from "~components";
import { NavigatorParamList } from "~navigation";

import i18n from "../../i18n/i18n";
import { useGetUsersMe, usePutUsersEdit } from "../api";

export const MyMealsScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "myMeals">
> = ({ navigation }) => {
  const { data, isLoading, error, refetch } = useGetUsersMe();
  const [fieldName, setfieldName] = useState<string>("breakfast");
  const [date, setDate] = useState<Date>(new Date());
  const edit = usePutUsersEdit({
    onSuccess: async ({ data }) => {
      refetch();
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const modalRef = useRef<Modalize>(null);

  const { t } = useTranslation();

  const onSubmit = (currentDate?: Date, field?: string) => {
    let currDate = Platform.OS === "android" ? currentDate : date;
    let currField: string = Platform.OS === "android" ? field : fieldName;
    edit.mutate({
      requestBody: {
        [currField]: currDate,
      },
    });
    modalRef.current?.close();
  };

  const handleShowPicker = (field: string) => {
    setfieldName(field);
    let value = null;
    if (field == "breakfast" && user?.breakfast) {
      value = new Date(user?.breakfast);
    } else if (field == "lunch" && user?.lunch) {
      value = new Date(user?.lunch);
    } else if (field == "dinner" && user?.dinner) {
      value = new Date(user?.dinner);
    } else {
      value = new Date();
    }

    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        themeVariant: "dark",
        value: value,
        mode: "time",
        locale: i18n.language,
        is24Hour: true,
        display: "spinner",
        onChange: (event, date) => handleDateOnChange(event, date, field),
      });
    } else {
      modalRef.current?.open();
    }
  };
  const handleDateOnChange = (
    event: any,
    selectedDate: Date,
    field?: string
  ) => {
    if (Platform.OS === "android" && event.type == "dismissed") return;
    if (Platform.OS === "android") {
      onSubmit(selectedDate, field);
    } else {
      setDate(selectedDate);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: t("screen.my-meals.title", "Mes repas"),
    });
  }, [navigation, t]);
  if (isLoading) {
    return (
      <Screen>
        <BusyIndicator />
      </Screen>
    );
  }
  const user = data?.data;
  return (
    <Screen flex={1} backgroundColor="grayBackground">
      <Card withShadow={false}>
        <CardLabelValue
          onPress={() => {
            handleShowPicker("breakfast");
          }}
          label={t("screen.my-meals.morning.label", "Matin")}
          value={
            user?.breakfast
              ? dayjs(user?.breakfast).format("HH:mm")
              : t("common.select.label", "Choisir")
          }
        />
        <Divider />

        <CardLabelValue
          onPress={() => {
            handleShowPicker("lunch");
          }}
          label={t("screen.my-meals.afternoon.label", "Midi")}
          value={
            user?.lunch
              ? dayjs(user?.lunch).format("HH:mm")
              : t("common.select.label", "Choisir")
          }
        />

        <Divider />

        <CardLabelValue
          onPress={() => {
            handleShowPicker("dinner");
          }}
          label={t("screen.my-meals.night.label", "Soir")}
          value={
            user?.dinner
              ? dayjs(user?.dinner).format("HH:mm")
              : t("common.select.label", "Choisir")
          }
        />
      </Card>
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
            value={date}
            mode="time"
            is24Hour={true}
            locale={`${i18n.language}`}
            display="spinner"
            onChange={handleDateOnChange}
          />
          <Button
            isFullWidth
            variant="primary"
            marginHorizontal={"m"}
            onPress={() => onSubmit()}
          >
            {t("common.button.save", "Enregistrer")}
          </Button>
        </Modalize>
      </Portal>
    </Screen>
  );
};
