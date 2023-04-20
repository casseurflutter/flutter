import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Screen, Text, TextLink } from "pearl-ui";
import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

import { BusyIndicator } from "~components";
import { NavigatorParamList } from "~navigation";

import {
  useGetUsersMe,
  useGetUsersPendingInvitation,
  usePostUsersJoinPartner,
  usePostUsersResetPartner,
} from "../api/hooks";
import Bird from "../assets/icons/Bird";

function ShareStatus() {
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

  if (isLoading) return null;

  return data?.data.partner === undefined ? (
    <>
      <Box marginVertical={"m"}>
        <Bird fillColor="gray8" />
      </Box>

      <Text variant="p2" textAlign="center" color="gray8">
        {t(
          "screen.settings.share.info",
          "Tu n'as pas encore reçu d’invitation. Seule la personne porteuse peut inviter depuis son application mobile PaMappy"
        )}
      </Text>
    </>
  ) : (
    <>
      <Box borderRadius={"m"} p="m" alignItems="center" backgroundColor="gray8">
        <Text color="white" variant="p2">
          {t(
            "screen.settings.share-account.label",
            "Tu partages le compte PaMappy de"
          )}
        </Text>
        <Text
          color="white"
          variant="st3"
        >{`${data?.data?.partner?.firstName} ${data?.data?.partner?.lastName}`}</Text>
      </Box>
      <Box my="s" alignItems={"center"}>
        <TextLink variant="secondary" onPress={() => stopSharing()}>
          {t(
            "screen.share-with-partner.stop-share.link.label",
            "Arrêter le partage"
          )}
        </TextLink>
      </Box>
    </>
  );
}
export const ShareScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "share">
> = ({ navigation }) => {
  const { t } = useTranslation();

  const { data, isLoading, refetch } = useGetUsersPendingInvitation();
  useEffect(() => {
    navigation.setOptions({
      title: t("screen.settings.share.title", "Partage"),
    });
  }, [navigation, t]);

  const join = usePostUsersJoinPartner({
    onSuccess: () => {
      refetch();
    },
  });

  if (isLoading) {
    return (
      <Screen flex={1} backgroundColor="grayBackground">
        <BusyIndicator />
      </Screen>
    );
  }

  const handleAcceptInvitation = () => {
    join.mutate({
      requestBody: {
        carrierId: data?.data?._id,
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

  return (
    <Screen backgroundColor="grayBackground">
      <Box
        mx="s"
        alignContent="center"
        justifyContent="center"
        alignItems="center"
      >
        {data?.data ? (
          <>
            <Box borderRadius={"m"} p="m" alignItems="center">
              <Text variant="st3">{`${data?.data?.firstName} ${data?.data?.lastName}`}</Text>
              <Text variant="p2">
                {t(
                  "screen.settings.share.invitation.label",
                  "T'invites à partager son compte PaMappy"
                )}
              </Text>
            </Box>
            <Button
              isFullWidth
              marginHorizontal={"m"}
              variant={"primary"}
              my={"m"}
              onPress={handleAcceptInvitation}
            >
              {t("screen.login.button.accept", "Accepter")}
            </Button>
          </>
        ) : (
          <ShareStatus />
        )}
      </Box>
    </Screen>
  );
};
