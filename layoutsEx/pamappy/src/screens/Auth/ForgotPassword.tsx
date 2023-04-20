import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik, FormikHelpers } from "formik";
import { Box, Button, Input, Screen, Text } from "pearl-ui";
import React, { FC, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import * as yup from "yup";

import { usePostUsersForgotPassword } from "~api";
import { NavigatorParamList } from "~navigation";

type ForgotFormValue = {
  email: string;
};

export const ForgotPasswordScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "forgot">
> = ({ navigation }) => {
  const { t } = useTranslation();

  useEffect(() => {
    navigation.setOptions({
      title: t("screen.forgot.header.title", "Nouveau mot de passe"),
    });
  }, [navigation, t]);

  const forgot = usePostUsersForgotPassword({
    onSuccess: async ({ data }) => {
      Alert.alert(
        t("alert.forgot.success.title", "Mot de passe"),
        t(
          "alert.forgot.success.description",
          "Un message contenant les instructions de réinitialisation de votre mot de passe a bien été envoyé à votre adresse email."
        ),
        [{ text: t("alert.forgot.success.button.ok", "Ok") }]
      );

      navigation.replace("logIn");
    },
    onError: (e) => {
      console.log(JSON.stringify(e));

      Alert.alert(
        t("alert.error.title", "Erreur"),
        t(
          "alert.error.500.message",
          "Une erreur technique est survenue,merci de réessayer ultérieurement."
        ),
        [{ text: t("alert.error.500.button.ok", "Ok") }]
      );
    },
  });

  const onSubmit = async (
    values: ForgotFormValue,
    formikHelpers: FormikHelpers<ForgotFormValue>
  ) => {
    try {
      await forgot.mutate({
        requestBody: {
          email: values.email,
        },
      });
    } catch (error) {
      console.log("error", error);
    }
    
  };

  const validationSchema = useMemo(() => {
    return yup.object<ForgotFormValue>({
      email: yup
        .string()
        .email()
        .required(t("screen.forgot.errors.email.required")),
    });
  }, []);

  return (
    <Screen backgroundColor="grayBackground" flex={1}>
      <Formik<ForgotFormValue>
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnBlur
        initialValues={{
          email: "",
        }}
      >
        {({
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          errors,
          values,
        }) => (
          <Box>
            <Text color="gray8" variant="p1" paddingVertical={"s"}>
              {t(
                "screen.forgot.text.fill",
                "Entrez l’adresse email liée à votre compte"
              )}
            </Text>
            <Input
              isFullWidth
              placeholder={t("screen.forgot.email.placeholder", "Email")}
              borderRadius={"l"}
              variant={"form"}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={handleChange("email")}
              focusBorderColor={"transparent"}
              onBlur={handleBlur("email")}
              value={values.email}
              isInvalid={errors.email !== undefined}
            />

            <Box alignItems="center">
              <Button
                onPress={() => handleSubmit()}
                isLoading={forgot.isLoading}
                size="l"
                isFullWidth
                isDisabled={!isValid}
                marginHorizontal={"m"}
                marginTop={"m"}
                variant={"primary"}
              >
                {t("screen.forgot.button.continue", "CONTINUER")}
              </Button>
            </Box>
          </Box>
        )}
      </Formik>
    </Screen>
  );
};
