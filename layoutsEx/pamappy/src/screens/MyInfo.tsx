import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { Formik, FormikHelpers } from "formik";
import { Box, Button, Divider, Input, Screen, Text } from "pearl-ui";
import React, { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Keyboard, Platform } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import * as yup from "yup";

import {
  BusyIndicator,
  Card,
  CardLabelValue,
  HeaderFormSubmit,
  SettingsItemHeader,
} from "~components";
import { NavigatorParamList } from "~navigation";

import i18n from "../../i18n/i18n";
import { getUsersMe, useGetUsersMe, usePutUsersEdit } from "../api";
import { BloodGroups, bloodGroupType } from "./BloodGroup";
interface MyInfo {
  birthDate: Date;
  bloodType: string;
}
type MyInfoFormValue = {
  weight: string;
  size: string;
  bloodType?: string;
  birthDate: string | undefined;
  mensesDuration: string;
  mensesAt: string | undefined;
};

export const MyInformationsScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "myInformations">
> = ({ navigation }) => {
  const { data, isLoading, refetch } = useGetUsersMe({
    enabled: false,
  });
  const [date, setDate] = useState<Date>(new Date());
  const [mensesAt, setMensesAt] = useState<any>(new Date());
  const queryClient = useQueryClient();
  const [field, setField] = useState<string>("birthDate");

  const refForm = useRef<any>(null);
  const modalRef = useRef<Modalize>(null);
  const bloodType = useRecoilValue(bloodGroupType);

  useEffect(() => {
    if (bloodType) {
      refForm.current.setFieldValue("bloodType", BloodGroups[bloodType]);
    }
  }, [bloodType]);

  useEffect(() => {
    if (data?.data?.birthDate) {
      setDate(new Date(data?.data?.birthDate));
    }
    if (data?.data?.mensesAt) {
      setMensesAt(new Date(data?.data?.mensesAt));
    }
  }, [data?.data]);
  const { t } = useTranslation();

  const edit = usePutUsersEdit({
    onSuccess: ({ data }) => {
      // queryClient.invalidateQueries(getUsersMe.key);
      Alert.alert(
        t("screen.my-info.title.success", "Votre informations a été modifiée."),
        "",
        [{ text: t("alert.button.ok", "Ok") }]
      );
    },
    onError: (e) => {
      console.log(e);
    },
    onSettled: () => {
      Keyboard.dismiss();
      queryClient.invalidateQueries(getUsersMe.key);
    },
  });

  const onSubmit = async (
    values: MyInfoFormValue,
    formikHelpers: FormikHelpers<MyInfoFormValue>
  ) => {
    let schema = yup.object().shape({
      weight: yup
        .number()
        .min(40)
        .max(150)
        .label(t("screen.my-info.weight.label", "Poids")),
      size: yup
        .number()
        .min(100)
        .max(200)
        .label(t("screen.my-info.size.label", "Taille")),
    });
    try {
      const isValid = await schema.validate({
        weight: Number(values.weight),
        size: Number(values.size),
      });
      edit.mutate({
        requestBody: {
          weight: Number(values.weight),
          size: Number(values.size),
          mensesDuration: Number(values.mensesDuration),
          birthDate: date,
          mensesAt: mensesAt,
          bloodType: values.bloodType,
        },
      });
    } catch (err: any) {
      Alert.alert(
        t("screen.alert.my-info.error.title", "Validation"),
        err.errors[0],
        [{ text: t("alert.button.ok", "Ok") }]
      );
    }
  };

  const handleShowPicker = (f: string) => {
    setField(f);
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        themeVariant: "dark",
        value: f == "birthDate" ? date : mensesAt,
        mode: "date",
        locale: i18n.language,
        minimumDate: "birthDate" ? undefined : new Date(),
        is24Hour: true,
        display: "spinner",
        onChange: (event, date) => handleDateOnChange(event, date, f),
      });
    } else {
      modalRef.current?.open();
    }
  };

  const handleDateOnChange = (
    event: any,
    selectedDate: Date,
    value?: string
  ) => {
    let valueField = Platform.OS === "android" ? value : field;

    if (valueField == "birthDate") {
      setDate(selectedDate);
      refForm.current.setFieldValue(
        "birthDate",
        dayjs(selectedDate).format("ll")
      );
    } else {
      setMensesAt(selectedDate);
      refForm.current.setFieldValue(
        "mensesAt",
        dayjs(selectedDate).format("ll")
      );
    }
  };

  if (isLoading) {
    return (
      <Screen backgroundColor="bleuClair">
        <BusyIndicator />
      </Screen>
    );
  }
  const user = data?.data;
  return (
    <Screen flex={1} backgroundColor="grayBackground">
      <Formik<MyInfoFormValue>
        onSubmit={onSubmit}
        innerRef={refForm}
        initialValues={{
          weight: String(user?.weight ? user?.weight : 0),
          size: String(user?.size ? user?.size : 0),
          bloodType: user?.bloodType ? user?.bloodType : "",
          birthDate: user?.birthDate
            ? dayjs(user?.birthDate).format("ll")
            : undefined,
          mensesDuration: String(
            user?.mensesDuration ? user?.mensesDuration : 0
          ),
          mensesAt: user?.mensesAt
            ? dayjs(user?.mensesAt).format("ll")
            : undefined,
        }}
      >
        {({
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          errors,
          dirty,
          values,
        }) => {
          return (
            <>
              <Card withShadow={false}>
                <HeaderFormSubmit
                  title={t("screen.my-info.title", "Informations")}
                />
                <CardLabelValue
                  containerProps={{
                    paddingHorizontal: "m",
                  }}
                  label={t(
                    "screen.my-info.birthday.label",
                    "Date de naissance"
                  )}
                  value={
                    values?.birthDate
                      ? values?.birthDate
                      : t("common.select.label", "Choisir")
                  }
                  onPress={() => {
                    handleShowPicker("birthDate");
                  }}
                />
                <Divider />

                <Box
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                  flexDirection="row"
                  paddingHorizontal="m"
                >
                  <Box flex={1}>
                    <Text variant="p2">
                      {t("screen.my-info.weight.label", "Poids")}
                    </Text>
                  </Box>

                  <Box
                    flex={1}
                    justifyContent="flex-end"
                    alignItems="center"
                    flexDirection="row"
                  >
                    <Input
                      autoCorrect={false}
                      placeholder="40"
                      maxLength={3}
                      variant="secondary"
                      value={values.weight}
                      keyboardType="numeric"
                      autoCapitalize="none"
                      onChangeText={handleChange("weight")}
                    />
                    <Text
                      mb={Platform.OS == "android" ? "xs" : "z"}
                      mt={Platform.OS == "ios" ? "xs" : "z"}
                      variant="p2"
                      fontWeight="bold"
                    >
                      {t("screen.myinfo.input.unit.kg", "Kg")}
                    </Text>
                  </Box>
                </Box>
                <Divider />

                <Box
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                  flexDirection="row"
                  paddingHorizontal="m"
                >
                  <Box flex={1}>
                    <Text variant="p2">
                      {t("screen.my-info.size.label", "Taille")}
                    </Text>
                  </Box>
                  <Box
                    flex={1}
                    justifyContent="flex-end"
                    alignItems="center"
                    flexDirection="row"
                  >
                    <Input
                      autoCorrect={false}
                      value={values.size}
                      isFullWidth
                      textAlign="right"
                      maxLength={3}
                      keyboardType="numeric"
                      variant="secondary"
                      autoCapitalize="none"
                      onChangeText={handleChange("size")}
                    />
                    <Text
                      mb={Platform.OS == "android" ? "xs" : "z"}
                      mt={Platform.OS == "ios" ? "xs" : "z"}
                      variant="p2"
                      fontWeight="bold"
                    >
                      {t("screen.my-info.input.size", "cm")}
                    </Text>
                  </Box>
                </Box>
                <Divider />
                <CardLabelValue
                  label={t(
                    "screen.my-info.blood-group.label",
                    "Groupe sanguin"
                  )}
                  onPress={() => navigation.navigate("bloodGroup")}
                  value={
                    values?.bloodType
                      ? values.bloodType
                      : t("common.select.label", "Choisir")
                  }
                />
              </Card>
              <Box py="s">
                <SettingsItemHeader
                  title={t("screen.my-info.rules.label", "Règles")}
                />
              </Box>
              <Card withShadow={false}>
                <CardLabelValue
                  onPress={() => handleShowPicker("mensesAt")}
                  label={"Date"}
                  value={
                    values.mensesAt
                      ? values.mensesAt
                      : t("common.select.label", "Choisir")
                  }
                />
                <Divider />

                <Box
                  alignItems="center"
                  flex={1}
                  flexDirection="row"
                  paddingHorizontal="m"
                >
                  <Box flex={2}>
                    <Text variant="p2">
                      {t(
                        "common.input.cycle-length.label",
                        "Durée de mes cycles"
                      )}
                    </Text>
                  </Box>
                  <Box
                    flex={1}
                    justifyContent="flex-end"
                    alignItems="center"
                    flexDirection="row"
                  >
                    <Input
                      autoCorrect={false}
                      value={values.mensesDuration}
                      placeholder="0"
                      isFullWidth
                      variant="secondary"
                      textAlign="right"
                      keyboardType="numeric"
                      borderWidth={0}
                      autoCapitalize="none"
                      onChangeText={handleChange("mensesDuration")}
                    />
                    <Text
                      mb={Platform.OS == "android" ? "xs" : "z"}
                      mt={Platform.OS == "ios" ? "xs" : "z"}
                      variant="p2"
                      fontWeight="bold"
                    >
                      {t("common.input.cycle-length.input", "jours")}
                    </Text>
                  </Box>
                </Box>
              </Card>
            </>
          );
        }}
      </Formik>

      <Portal>
        <Modalize
          ref={modalRef}
          scrollViewProps={{ showsVerticalScrollIndicator: false }}
          snapPoint={310}
          withHandle={false}
        >
          <Box>
            <DateTimePicker
              testID="dateTimePicker"
              themeVariant="light"
              value={field == "birthDate" ? date : mensesAt}
              mode={"date"}
              locale={i18n.language}
              is24Hour={true}
              display="spinner"
              onChange={handleDateOnChange}
            />
            <Button
              isFullWidth
              variant="primary"
              marginHorizontal={"m"}
              onPress={() => {
                let value = field == "birthDate" ? date : mensesAt;
                refForm?.current.setFieldValue(
                  field,
                  dayjs(value).format("ll")
                );
                modalRef.current?.close();
              }}
            >
              {t("common.button.save", "Enregistrer")}
            </Button>
          </Box>
        </Modalize>
      </Portal>
    </Screen>
  );
};
