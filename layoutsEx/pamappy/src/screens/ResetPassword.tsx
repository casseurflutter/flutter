import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik, FormikHelpers } from "formik";
import { Box, Button, Divider, Icon, Input, Pressable, Screen } from "pearl-ui";
import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import * as yup from "yup";

import { RequestError } from "~api";
import { NavigatorParamList } from "~navigation";

import { usePostUsersChangePassword } from "../api/hooks";

type ResetPasswordValue = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const ResetPasswordScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "resetPassword">
> = ({ navigation }) => {
  const { t } = useTranslation();
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: t("screen.resetPassword.header.title"),
    });
  }, [navigation, t]);

  const update = usePostUsersChangePassword({
    onSuccess: async ({ data }) => {
      Alert.alert(
        t("screen.resetPassword.header.title"),
        t(
          "screen.resetPassword.alert.message",
          "Ton mot de passe a été changé"
        ),
        [{ text: t("alert.error.500.button.ok", "Ok") }]
      );
      navigation.goBack();
    },
    onError: (e) => {
      if (e instanceof RequestError) {
        if (e?.response?.data.message == "WRONG_PASWORD") {
          Alert.alert(
            t("alert.error.title", "Erreur"),
            t(
              "screen.resetPassword.error.WRONG_PASWORD",
              "Ton mot de passe actuel est incorrect"
            ),
            [{ text: t("alert.error.button.retry", "Réessayer") }]
          );
        } else if (e?.response?.data.message == "PASWORD_SAME") {
          Alert.alert(
            t("alert.error.title", "Erreur"),
            t(
              "screen.resetPassword.error.PASWORD_SAME",
              "Mot de passe ne peut pas être identique à l'ancien"
            ),
            [{ text: t("alert.error.button.retry", "Réessayer") }]
          );
        }
      } else {
        Alert.alert(
          t("alert.error.title", "Erreur"),
          t(
            "alert.error.500.message",
            "Une erreur technique est survenue,merci de réessayer ultérieurement."
          ),
          [{ text: t("alert.error.button.retry", "Réessayer") }]
        );
      }

      console.log(JSON.stringify(e));
    },
  });
  const onSubmit = async (
    values: ResetPasswordValue,
    formikHelpers: FormikHelpers<ResetPasswordValue>
  ) => {
    let schema = yup.object<any>({
      oldPassword: yup
        .string()
        .label(t("screen.resetPassword.old.label"))
        .trim()
        .required(),
      password: yup
        .string()
        .label(t("screen.resetPassword.password.label"))
        .trim()
        .required(),
      confirmPassword: yup
        .string()
        .trim()
        .label(t("screen.resetPassword.new.label"))
        .test(
          "passwords-match",
          t(
            "screen.resetPassword.password-match",
            "Le second mot de passe ne correspond pas à ton premier mot de passe"
          ),
          function (value) {
            return this.parent.password === value;
          }
        ),
    });
    try {
      await schema.validate({
        oldPassword: values.oldPassword,
        password: values.newPassword,
        confirmPassword: values.confirmPassword,
      });
      update.mutate({
        requestBody: {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
      });
    } catch (err) {
      Alert.alert(
        t("screen.alert.my-info.error.title", "Validation"),
        err.errors[0],
        [{ text: t("alert.button.ok", "Ok") }]
      );
    }
  };

  return (
    <Screen backgroundColor="grayBackground" flex={1}>
      <Formik<ResetPasswordValue>
        onSubmit={onSubmit}
        validateOnBlur
        initialValues={{
          oldPassword: "",
          confirmPassword: "",
          newPassword: "",
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
            <Input
              isFullWidth
              placeholder={t(
                "screen.resetPassword.old.placeholder",
                "Ancien mot de passe"
              )}
              borderBottomLeftRadius={"z"}
              borderBottomRightRadius={"z"}
              borderTopLeftRadius={"l"}
              borderTopRightRadius={"l"}
              variant={"form"}
              size="s"
              secureTextEntry={!showOld}
              rightIcon={
                values.oldPassword ? (
                  <Box mr="s">
                    <Pressable p="s" onPress={() => setShowOld(!showOld)}>
                      <Icon
                        color={"gray6"}
                        iconFamily="FontAwesome5"
                        size="m"
                        iconName={showOld ? "eye" : "eye-slash"}
                      />
                    </Pressable>
                  </Box>
                ) : undefined
              }
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={handleChange("oldPassword")}
              focusBorderColor={"transparent"}
              onBlur={handleBlur("oldPassword")}
              value={values.oldPassword}
            />
            <Divider />
            <Input
              isFullWidth
              variant={"form"}
              placeholder={t(
                "screen.resetPassword.new.placeholder",
                "Nouveau mot de passe"
              )}
              rightIcon={
                values.confirmPassword ? (
                  <Box mr="s">
                    <Pressable p="s" onPress={() => setShowNew(!showNew)}>
                      <Icon
                        color={"gray6"}
                        iconFamily="FontAwesome5"
                        size="m"
                        iconName={showNew ? "eye" : "eye-slash"}
                      />
                    </Pressable>
                  </Box>
                ) : undefined
              }
              borderTopLeftRadius={"z"}
              secureTextEntry={!showNew}
              borderBottomLeftRadius={"z"}
              borderBottomRightRadius={"z"}
              borderTopRightRadius={"z"}
              size="s"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={handleChange("confirmPassword")}
              focusBorderColor={"transparent"}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
            />
            <Divider />
            <Input
              isFullWidth
              variant={"form"}
              placeholder={t(
                "screen.resetPassword.confirmPasswod.placeholder",
                "Confirmer le nouveau mot de passe"
              )}
              rightIcon={
                values.newPassword ? (
                  <Box mr="s">
                    <Pressable
                      p="s"
                      onPress={() => setShowConfirm(!showConfirm)}
                    >
                      <Icon
                        color={"gray6"}
                        iconFamily="FontAwesome5"
                        size="m"
                        iconName={showConfirm ? "eye" : "eye-slash"}
                      />
                    </Pressable>
                  </Box>
                ) : undefined
              }
              secureTextEntry={!showConfirm}
              borderTopRightRadius={"z"}
              borderTopLeftRadius={"z"}
              borderBottomLeftRadius={"l"}
              size="s"
              borderBottomRightRadius={"l"}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={handleChange("newPassword")}
              focusBorderColor={"transparent"}
              onBlur={handleBlur("newPassword")}
              value={values.newPassword}
            />
            <Box alignItems="center">
              <Button
                onPress={() => handleSubmit()}
                isLoading={isSubmitting}
                isFullWidth
                marginHorizontal={"m"}
                variant={"secondary"}
                my={"m"}
              >
                {t("screen.resetPassword.button.send", "Envoyer")}
              </Button>
            </Box>
          </Box>
        )}
      </Formik>
    </Screen>
  );
};
