import { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { Box, Button, Divider, Screen, Text } from "pearl-ui";
import React, { FC, useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Alert, Pressable, Text as TextNative } from "react-native";

import { NavigatorParamList } from "~navigation";

import { useGetMessagesId, usePutMessagesId } from "../api/hooks";
import { BusyIndicator, H3, H4, P } from "../components";
import { FONTS } from "../hooks/useFonts";

export const MessageDetailsScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "messageDetails">
> = ({ navigation, route }) => {
  const query = useGetMessagesId(route?.params?.id);
  const edit = usePutMessagesId({
    onSuccess: () => {
      query.refetch();
    },
    onError: () => {},
  });
  const { t } = useTranslation();
  useEffect(() => {
    navigation.setOptions({
      title: "Message",
    });
  }, [navigation, t]);
  const handleAccept = () => {
    Alert.alert(
      t("screen.message-details.alert.accept-appointement.title", "Accepter"),
      t(
        "screen.message-details.alert.accept-appointement.message",
        "Veux-tu vraiment accepter le rendez-vous ?"
      ),
      [
        { text: t("common.button.cancel", "Annuler") },

        {
          text: t(
            "screen.message-details.alert.accept-appointement.title",
            "Accepter"
          ),
          onPress: () => {
            edit.mutate({
              id: route?.params?.id,
              requestBody: {
                appointmentStatus: 1,
              },
            });
          },
        },
      ]
    );
  };
  const handleRefuse = () => {
    Alert.alert(
      t("screen.message-details.alert.refuse-appointement.title", "Refuser"),
      t(
        "screen.message-details.alert.refuse-appointement.message",
        "Veux-tu vraiment refuser le rendez-vous ?"
      ),
      [
        { text: t("common.button.cancel", "Annuler") },

        {
          text: t(
            "screen.message-details.alert.refuse-appointement.title",
            "Refuser"
          ),
          style: "destructive",
          onPress: () => {
            edit.mutate({
              id: route?.params?.id,
              requestBody: {
                appointmentStatus: 2,
              },
            });
          },
        },
      ]
    );
  };
  const Appointenement = (
    <Box my="m">
      <Text variant="t2" mb="s" color="blueNavigation">
        {t("screen.message-details.appointement.title", "Rendez-vous")}
      </Text>
      <Divider />
      <Box
        my="s"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
      >
        <H4 color="gray7">{dayjs().add(3, "day").format("LLL")}</H4>

        {query?.data?.data?.appointmentStatus == 0 ? (
          <Button onPress={() => handleAccept()} variant="success">
            {t("screen.message-details.appointement.button.accept", "Accepter")}
          </Button>
        ) : query?.data?.data?.appointmentStatus == 2 ? (
          <Text>
            {t("screen.message-details.appointement-refuse.label", "Refusé")}
          </Text>
        ) : (
          <Text>
            {t("screen.message-details.appointement-accepted.label", "Accepté")}
          </Text>
        )}
      </Box>
      <Divider />
      {query?.data?.data?.appointmentStatus == 0 ? (
        <>
          <TextNative
            style={{
              marginVertical: 10,
              color: "#626262",
              fontSize: 18,
              fontFamily: FONTS.SF_Pro_Rounded_Regular,
              fontWeight: "400",
              lineHeight: 25,
            }}
          >
            <Trans i18nKey={"screen.message-details.appointement.message"}>
              Tu peux refuser le rendez-vous. Nous te demanderons alors de
              contacter ton centre médical pour choisir une autre tanche
              horaire.
            </Trans>
            <Pressable onPress={() => handleRefuse()}>
              <TextNative
                style={{
                  color: "red",
                  fontSize: 18,
                  fontFamily: FONTS.SF_Pro_Rounded_Regular,
                  fontWeight: "400",
                }}
              >
                {t(
                  "screen.message-details.appointement.message.link",
                  "Refuser le rendez-vous."
                )}
              </TextNative>
            </Pressable>
          </TextNative>
          <P my="s">
            <Trans
              i18nKey={"screen.message-details.appointement-refuse.message"}
            >
              Contacte ton centre médical pour choisir une autre tanche horaire.
            </Trans>
          </P>
        </>
      ) : null}
    </Box>
  );
  const Document = (
    <Box my="s">
      <H3 variant="t2" pb="s" color="blueNavigation">
        Document
      </H3>
      <Divider />
      <Box
        py="s"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
      >
        <H4 color="gray7">Echographie</H4>
      </Box>
      <Divider />
      <P py="s">
        {t(
          "screen.message-details.appointement.message2",
          "Le document sera ajouté à ton espace document."
        )}
      </P>
    </Box>
  );
  const Medication = (
    <Box my="s">
      <H3 variant="t2" mb="s" color="blueNavigation">
        {t("screen.message-details.appointement.title2", "Médicament")}
      </H3>
      <Divider />
      <Box
        my="s"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
      >
        <H4 color="gray7">Doliprane</H4>
      </Box>
      <Divider />
      <P py="s">
        {t(
          "screen.message-details.appointement.message3",
          "Le médicament et sa posologie sera ajouté à ton espace médicament."
        )}
      </P>
    </Box>
  );
  if (query?.isLoading) {
    return <BusyIndicator />;
  }
  const message = query?.data?.data;
  return (
    <Screen>
      <Box>
        <Box>
          <Text variant="t2" color="blueNavigation">
            {message?.title}
          </Text>
          <H4 color="gray7">{dayjs(message?.date).format("lll")}</H4>
        </Box>
        <Divider my="s" />
        <P>{message?.content}</P>
        {message?.type == 1
          ? Appointenement
          : message?.type == 2
          ? Document
          : message?.type == 3
          ? Medication
          : null}
      </Box>
    </Screen>
  );
};
