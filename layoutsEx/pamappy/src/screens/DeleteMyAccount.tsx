import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik, FormikHelpers } from "formik";
import { Box, Button, Input, Screen, Text } from "pearl-ui";
import React, { FC, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import * as yup from "yup";

import { useAuth } from "~hooks";
import { NavigatorParamList } from "~navigation";

import { usePostAuthDeleteAccount } from "../api/hooks";

type DeleteFormValue = {
  confirmation: string;
};
export const DeleteMyAccountScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "deleteMyAccount">
> = ({ navigation }) => {
  const { t } = useTranslation();
  const { logout } = useAuth();

  const deleteAccount = usePostAuthDeleteAccount({
    onSuccess: () => {
      logout();
      navigation.navigate("logIn");
    },
    onError: (e) => {
      console.log(JSON.stringify(e));
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: t("screen.delete-account.title", "Supprimer mon compte"),
    });
  }, [navigation]);

  const handleDeleteAccount = () => {
    Alert.alert(
      t("screen.alert.delete-account.title", "Supprimer mon compte"),
      t(
        "screen.alert.delete-account.description",
        "Souhaites-tu vraiment supprimer ton compte ?"
      ),
      [
        { text: t("common.button.cancel", "Annuler") },

        {
          text: t("screen.alert.delete-account.button.label", "SUPPRIMER"),
          style: "destructive",
          onPress: () => {
            deleteAccount.mutate();
          },
        },
      ]
    );
  };

  const validationSchema = useMemo(() => {
    return yup.object<DeleteFormValue>({
      confirmation: yup
        .string()
        .lowercase()
        .matches(/(supprimer|delete)/)
        .required(),
    });
  }, []);

  const onSubmit = async (
    values: DeleteFormValue,
    formikHelpers: FormikHelpers<DeleteFormValue>
  ) => {
    formikHelpers.setSubmitting(true);

    await deleteAccount.mutateAsync();
    logout();
  };

  return (
    <Screen flex={1} backgroundColor="bleuClair">
      <Box>
        <Text color="white">
          {t(
            "screen.delete-account.info.title",
            "La suppression de ton compte va ::"
          )}
        </Text>
        <Box mx="m" alignItems="center" flexDirection="row">
          <Text color={"white"} marginRight="s">
            {"\u2022"}
          </Text>

          <Text color="white">
            {t(
              "screen.delete-account.info",
              "Supprimer mes informations personelles"
            )}
          </Text>
        </Box>

        <Box mx="m" alignItems="center" flexDirection="row">
          <Text color={"white"} marginRight="s">
            {"\u2022"}
          </Text>

          <Text color="white">
            {t("screen.delete-account.info2", "Supprimer ton compte PaMappy")}
          </Text>
        </Box>
      </Box>
      <Text my="m" color="white">
        {t(
          "screen.alert.delete-account.input.label",
          "Ecris SUPPRIMER ci-dessous afin de confirmer la suppression de tes informations personnelles."
        )}
      </Text>
      <Formik<DeleteFormValue>
        onSubmit={onSubmit}
        validateOnMount
        validationSchema={validationSchema}
        initialValues={{
          confirmation: "",
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
        }: any) => (
          <>
            <Box>
              <Input
                borderRadius="l"
                isFullWidth
                height={60}
                autoCorrect={false}
                onChangeText={handleChange("confirmation")}
                onBlur={handleBlur("confirmation")}
                value={values.confirmation}
              />

              <Button
                variant="danger"
                onPress={handleDeleteAccount}
                isFullWidth
                isDisabled={isValid === false}
                isLoading={isSubmitting || deleteAccount.isLoading}
              >
                {t("screen.delete-account.button.label", "SUPPRIMER")}
              </Button>
            </Box>
          </>
        )}
      </Formik>
    </Screen>
  );
};
