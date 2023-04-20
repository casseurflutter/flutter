import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { Box, Divider, Input, Screen, Text, TextLink } from "pearl-ui";
import React, { FC, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Keyboard } from "react-native";
import { useQueryClient } from "react-query";
import * as yup from "yup";

import { BusyIndicator, RowItem } from "~components";
import { NavigatorParamList } from "~navigation";

import { useGetTreatmentsAll, usePostTreatments } from "../../api/hooks";
import { getTreatmentsAll } from "../../api/services";
import { useCurrentMedicationState } from "./AddMedication";
export const ChoiceMedicationScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "choiceMedication">
> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [value, setValue] = useCurrentMedicationState();
  const refForm = useRef<any>(null);
  const { data, isLoading } = useGetTreatmentsAll();
  const create = usePostTreatments({
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
    onSuccess: () => {
      Alert.alert(
        t(
          "screen.alert-add-medication.success.title",
          "Ton médicament a été ajouté."
        ),
        "",
        [
          {
            text: t("alert.error.500.button.ok", "Ok"),
            onPress: () => {
              refForm?.current?.resetForm();
              Keyboard.dismiss();
            },
          },
        ]
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(getTreatmentsAll.key);
    },
  });
  const handleSelectItem = (item: any) => {
    setValue({
      ...value,
      choice: item,
    });
  };

  useEffect(() => {
    navigation.setOptions({
      title: t("screen.add-medication.choice.label", "Choix du médicament"),
      headerStyle: {
        backgroundColor: "#2FB0ED",
      },

      headerTintColor: "white",
    });
  }, [navigation, t]);
  let selectedId = value?.choice ? value?.choice._id : route?.params?.id;
  const validationSchema = useMemo(() => {
    return yup.object<any>({
      name: yup
        .string()
        .required(t("screen.input-require-error", "Ce champ est obligatoire")),
    });
  }, []);
  const onSubmit = (values: any, formikHelpers: any) => {
    create.mutate({
      requestBody: {
        name: values.name,
      },
    });
  };
  if (isLoading) {
    return (
      <Screen flex={1} backgroundColor="grayBackground">
        <BusyIndicator />
      </Screen>
    );
  }
console.log("id", route?.params?.id);
  return (
    <Screen backgroundColor="athensGray" flex={1}>
      <Formik<any>
        onSubmit={onSubmit}
        innerRef={refForm}
        validationSchema={validationSchema}
        initialValues={{
          name: "",
        }}
      >
        {({
          isSubmitting,
          handleChange,
          handleBlur,
          touched,
          handleSubmit,
          isValid,
          errors,
          values,
        }) => (
          <>
            <Box justifyContent="center" my="l">
              <Input
                isFullWidth
                autoCorrect={false}
                marginTop={"n"}
                h={50}
                value={values.name}
                borderWidth={0}
                placeholder="Nom du médicament"
                placeholderTextColor="gris"
                autoCapitalize="none"
                onChangeText={handleChange("name")}
              />
              {errors.name != undefined && touched.name ? (
                <Text color="danger" fontSize="xs">
                  {errors.name}
                </Text>
              ) : null}
              <TextLink
                alignItems="center"
                onPress={() => handleSubmit()}
                variant="button"
              >
                Ajouter
              </TextLink>
            </Box>
          </>
        )}
      </Formik>
      <Box borderRadius={"l"} bg="white">
        {data?.data.map((item, index, arr) => (
          <Box key={index}>
            <RowItem
              onPress={() => handleSelectItem(item)}
              value={item?.name}
              selected={item?._id === selectedId}
              iconPrefix
            />
            {index != arr.length - 1 ? <Divider /> : null}
          </Box>
        ))}
      </Box>
    </Screen>
  );
};
