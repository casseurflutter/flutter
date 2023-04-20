import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik, FormikHelpers } from "formik";
import { Box, Button, Input, Screen, Text, TextLink } from "pearl-ui";
import React, { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import * as yup from "yup";

import {
  BusyIndicator,
  Card,
  CardLabelValue,
  Divider,
  SettingsItemHeader,
} from "~components";
import { NavigatorParamList } from "~navigation";

import {
  useGetUsersMe,
  usePostUsersInvitePartner,
  usePostUsersResetPartner,
} from "../api/hooks";
import Bird from "../assets/icons/Bird";

type ShareFormValue = {
  email: string;
};
export const ShareWithPartnerScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "shareWithPartner">
> = ({ navigation }) => {
  const { t } = useTranslation();
  const { data, isLoading, refetch } = useGetUsersMe();
  const resetShare = usePostUsersResetPartner({
    onSuccess: () => {
      refetch();
    },
    onError: (e) => {
      Alert.alert(
        t("alert.error.title", "Erreur"),
        t(
          "alert.error.500.message",
          "Une erreur technique est survenue,merci de réessayer ultérieurement."
        ),
        [{ text: t("alert.alert.error.button.retry", "Réessayer") }]
      );
    },
  });

  const refForm = useRef<any>(null);

  const invite = usePostUsersInvitePartner({
    onSuccess: () => {
      refetch();
      Alert.alert(
        t("screen.settings.share-with-partner.title", "Partage"),
        t(
          "screen.settings.share-with-partner.invitation-sent",
          "Invitation envoyée"
        )
      );
    },
    onError: (e) => {
      console.log("e", e.message);
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: t("screen.settings.share-with-partner.title", "Partage"),
    });
  }, [navigation, t]);
  const stopSharing = () => {
    Alert.alert(
      t("screen.alert.stop-sharing.title", "Arrêter le partage"),
      t(
        "screen.alert.stop-sharing.description",
        "Souhaites-tu réellement arrêter le partage avec ton partenaire ?"
      ),
      [
        { text: t("common.button.cancel", "Annuler") },

        {
          text: t("screen.alert.stop-sharing.button.label", "Arrêter"),
          onPress: () => {
            resetShare.mutate();
          },
        },
      ]
    );
  };

  const onSubmit = async (
    values: ShareFormValue,
    formikHelpers: FormikHelpers<ShareFormValue>
  ) => {
    let schema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required()
        .transform(function (value, originalvalue) {
          return this.isType(value) && value !== null ? value.trim() : value;
        })
        .label(t("screen.share-with-partner.email.label", "E-mail")),
    });
    try {
      const isValid = await schema.validate({
        email: values.email,
      });
      if (isValid) {
        invite.mutate({ requestBody: { email: values.email } });
      }
    } catch (err: any) {
      Alert.alert(
        t("screen.alert.title.form-my-profile.error.title", "Validation"),
        err.errors[0],
        [{ text: t("alert.button.ok", "Ok") }]
      );
    }
  };

  const resend = () => {
    Alert.alert(
      t("screen.alert.resend-sharing.title", "Invitation"),
      t(
        "screen.alert.resend-sharing.description",
        "Souhaites-tu réellement renvoyer une invitation à votre partenaire ?"
      ),
      [
        { text: t("common.button.cancel", "Annuler") },

        {
          text: t("screen.alert.invite.button.label", "Inviter"),
          onPress: () => {
            refForm.current.handleSubmit();
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <Screen flex={1} backgroundColor="bleuClair">
        <BusyIndicator />
      </Screen>
    );
  }

  if (data?.data?.partner) {
    return (
      <Screen flex={1} backgroundColor="grayBackground">
        <SettingsItemHeader
          containerProps={{
            marginVertical: "s",
          }}
          title={t(
            "screen.settings.shared-with-partner.subtitle",
            "Partagé avec"
          )}
        />
        <Card withShadow={false}>
          <CardLabelValue
            containerProps={{ marginVertical: "n" }}
            label={
              data?.data?.partner
                ? data?.data?.partner.email
                : t("screen.settings.share.label", "Mon partanaire")
            }
          />
        </Card>

        <Box alignItems={"center"} marginVertical="m">
          <TextLink variant="secondary" onPress={() => stopSharing()}>
            {t(
              "screen.share-with-partner.stop-share.link.label",
              "Arrêter le partage"
            )}
          </TextLink>
        </Box>
      </Screen>
    );
  }
  return (
    <Screen flex={1} backgroundColor="grayBackground">
      <SettingsItemHeader
        containerProps={{
          marginVertical: "s",
        }}
        title={t(
          "screen.settings.share-with-partner.subtitle",
          "Envoyer une invitation à"
        )}
      />

      <Formik<ShareFormValue>
        onSubmit={onSubmit}
        innerRef={refForm}
        initialValues={{
          email: data?.data.pendingPartenerEmail || "",
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
            <Input
              isFullWidth
              size="m"
              textAlign="left"
              autoCorrect={false}
              height={50}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              borderColor={"transparent"}
              onChangeText={handleChange("email")}
              focusBorderColor={"transparent"}
              onBlur={handleBlur("email")}
              value={values.email}
              isInvalid={errors.email !== undefined}
            />

            {data?.data.pendingPartenerEmail ? (
              <Box mt="m" alignItems="center">
                <TextLink onPress={() => resend()} variant="default">
                  {t("screen.share-with-partner.resend.link.label")}
                </TextLink>
                <Divider
                  isFullWidth
                  backgroundColor="gray8"
                  marginVertical="m"
                />
              </Box>
            ) : (
              <Button
                onPress={handleSubmit}
                isLoading={isSubmitting}
                isFullWidth
                isDisabled={!isValid}
                marginHorizontal={"s"}
                variant={"primary"}
                my={"s"}
              >
                {t(
                  "screen.settings.share-with-partner.button.send",
                  "Envoyer une invitation"
                )}
              </Button>
            )}
          </>
        )}
      </Formik>
      <Box
        mx="s"
        alignContent="center"
        justifyContent="center"
        alignItems="center"
      >
        <Box marginVertical={"l"}>
          <Bird fillColor="gray8" />
        </Box>

        <Text variant="p2" textAlign="center" paddingVertical="s" color="gray8">
          {t(
            "screen.settings.share-with-partner.info",
            "Précisez l’adresse email que ton partenaire a ou va utiliser pour créer son compte PaMappy."
          )}
        </Text>
        <Text variant="p2" textAlign="center" color="gray8">
          {t(
            "screen.settings.share-with-partner.info2",
            "Ton partenaire recevra un email informatif. Il devra accepter l’invitation depuis les réglages de l’application."
          )}
        </Text>
      </Box>
    </Screen>
  );
};
