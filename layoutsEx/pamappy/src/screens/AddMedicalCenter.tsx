import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { Box, Button, Input, Screen, Text } from "pearl-ui";
import React, { FC, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Keyboard } from "react-native";
import { useQueryClient } from "react-query";
import * as yup from "yup";

import { NavigatorParamList } from "~navigation";

import { usePostMedicalCenters } from "../api/hooks";
import { getMedicalCentersAll } from "../api/services";

export const AddMedicalCenterScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "AddMedicalCenter">
> = ({ navigation }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const refForm = useRef<any>(null);
  let create = usePostMedicalCenters({
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
          "screen.alert-add-medical-center.success.title",
          "Ton centre médical a été ajouté"
        ),
        "",
        [
          {
            text: t("alert.error.500.button.ok", "Ok"),
            onPress: () => {
              refForm?.current?.resetForm();
            },
          },
        ]
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(getMedicalCentersAll.key);
    },
  });
  useEffect(() => {
    navigation.setOptions({
      title: t("screen.my-medical-contact.title", "Centre médical"),
    });
  }, [navigation, t]);
  const validationSchema = useMemo(() => {
    return yup.object<any>({
      name: yup
        .string()
        .required(t("screen.input-require-error", "Ce champ est obligatoire")),
      address: yup
        .string()
        .required(t("screen.input-require-error", "Ce champ est obligatoire")),
      receptionNumber: yup
        .string()
        .required(t("screen.input-require-error", "Ce champ est obligatoire")),
    });
  }, []);
  const onSubmit = (values: any, formikHelpers: any) => {
    create.mutate({
      requestBody: {
        name: values.name,
        address: values.address,
        receptionNumber: values.receptionNumber,
      },
    });
    Keyboard.dismiss();
  };
  return (
    <Screen p="m" flex={1} backgroundColor="grayBackground">
      <Formik<any>
        innerRef={refForm}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={{
          name: "",
          address: "",
          receptionNumber: "",
        }}
      >
        {({
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          errors,
          touched,
          dirty,
          values,
        }) => {
          return (
            <Box>
              <Input
                isFullWidth
                my="s"
                placeholder={t(
                  "screen.add-medical-center.placeholder.name",
                  "Medical center name"
                )}
                onChangeText={handleChange("name")}
                focusBorderColor={"transparent"}
                onBlur={handleBlur("name")}
                variant={"form"}
                autoCorrect={false}
                value={values.name}
                isInvalid={errors.name !== undefined}
              />
              {errors.name != undefined && touched.name ? (
                <Text color="danger" fontSize="xs">
                  {errors.name}
                </Text>
              ) : null}
              <Input
                isFullWidth
                placeholder={t(
                  "screen.add-medical-center.placeholder.address",
                  "Adresse du centre"
                )}
                placeholderTextColor={"gray5"}
                variant={"form"}
                autoCorrect={false}
                onChangeText={handleChange("address")}
                focusBorderColor={"transparent"}
                onBlur={handleBlur("address")}
                multiline
                numberOfLines={5}
                minHeight={100}
                value={values.address}
              />
              {errors.address != undefined && touched.address ? (
                <Text color="danger" fontSize="xs">
                  {errors.address}
                </Text>
              ) : null}
              <Input
                isFullWidth
                my="s"
                keyboardType="numeric"
                placeholder={t(
                  "screen.add-medical-center.placeholder.phone",
                  "Numéro de téléphone"
                )}
                onChangeText={handleChange("receptionNumber")}
                focusBorderColor={"transparent"}
                onBlur={handleBlur("receptionNumber")}
                variant={"form"}
                value={values.receptionNumber}
                isInvalid={errors.receptionNumber !== undefined}
              />
              {errors.receptionNumber != undefined &&
              touched.receptionNumber ? (
                <Text color="danger" fontSize="xs">
                  {errors.receptionNumber}
                </Text>
              ) : null}
              <Button
                isFullWidth
                variant="primary"
                marginHorizontal={"m"}
                onPress={handleSubmit}
              >
                Enregistrer
              </Button>
            </Box>
          );
        }}
      </Formik>
    </Screen>
  );
};
