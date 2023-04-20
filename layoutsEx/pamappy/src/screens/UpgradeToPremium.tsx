import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as WebBrowser from "expo-web-browser";
import { Box, Button, Text, TextLink } from "pearl-ui";
import React, { FC, useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";

import { P } from "~components";
import { NavigatorParamList } from "~navigation";

import Appointment from "../assets/appointment.svg";
import Diamond from "../assets/diamond.svg";
import DiamondColored from "../assets/diamond-colored.svg";
import Medication from "../assets/medication.svg";
import Picture from "../assets/picture.svg";
import Rectangle from "../assets/rect.svg";
import i18n from "../../i18n/i18n";
import { HOST } from "~constants";

export const UpgradeToPremium: FC<
  NativeStackScreenProps<NavigatorParamList, "updateToPremium">
> = ({ navigation, route }) => {
  const { t } = useTranslation();
  useEffect(() => {
    navigation.setOptions({
      title: t("screen.upgrade.title", "Passer au premium"),
    });
  }, [navigation, t]);

  let linkPrivacy =
    i18n.language === "fr"
      ? `${HOST}/fr/gdpr`
      : i18n.language === "en"
      ? `${HOST}/en/privacy`
      : `${HOST}/nl/privacy`;
  let linkTerms =
    i18n.language === "fr"
      ? `${HOST}/fr/cgu`
      : i18n.language === "en"
      ? `${HOST}/en/eula`
      : `${HOST}/nl/eula`;

  return (
    <Box
      flex={1}
      backgroundColor={"white"}
      borderTopColor={"gray2"}
      borderTopWidth={1}
    >
      <Box alignItems="center" my="m">
        <Diamond width={50} height={50} />
        <Text
          textAlign="center"
          variant="p1"
          fontWeight="medium"
          marginHorizontal={"s"}
        >
          {t(
            "screen.upgrade.subtitle",
            "Passer votre compte en Premium pour avoir accès à cette fonctionnalité"
          )}
        </Text>
      </Box>

      <Box p="l" borderRadius="l" m="m" bg="vert">
        <Box position="absolute" top={0} flex={1}>
          <Rectangle />
        </Box>
        <Box flexDirection="row">
          <DiamondColored width={50} height={50} />

          <Text pl="s" color="white" variant="t2" marginHorizontal={"s"}>
            PaMAppy Premium
          </Text>
        </Box>
        <Box my="m" maxWidth={300} p="s">
          <Box>
            <Box flexDirection="row">
              <Appointment fill={"#F0F1F3"} width={32} height={32} />
              <P variant="p3" ml="m" color="white">
                <Trans i18nKey={"screen.upgrade.description"}>
                  Visualisez tous vos rendez-vous et suivez vos périodes de
                  règles sur l’agenda
                </Trans>
              </P>
            </Box>
            <Box my="l" flexDirection="row">
              <Picture width={32} height={32} />
              <P numberOfLines={3} variant="p3" pr="s" ml="m" color="white">
                <Trans i18nKey={"screen.upgrade.description2"}>
                  Accédez à la galerie photos pour enregistrer vos souvenirs
                  directement dans l’app
                </Trans>
              </P>
            </Box>
            <Box flexDirection="row">
              <Medication width={32} height={32} />
              <P variant="p3" ml="m" color="white">
                <Trans i18nKey={"screen.upgrade.description3"}>
                  Enregistrez vos prises de médicaments et soyez notifiés des
                  rappels de vos doses
                </Trans>
              </P>
            </Box>
          </Box>
        </Box>
        <Button
          variant="upgrade"
          onPress={() => navigation.navigate("updateToPremium2")}
          isFullWidth
          marginHorizontal={"m"}
        >
          {t("button.upgrade", "Passer au Premium")}
        </Button>
      </Box>
      <Box
        justifyContent="flex-end"
        alignItems="center"
        flexDirection="row"
        alignContent="center"
        alignItems="center"
        justifyContent="center"
        marginBottom="m"
      >
        <TextLink
          my="m"
          onPress={() => WebBrowser.openBrowserAsync(linkTerms)}
          variant="default"
        >
          {t(
            "screen.terms-of-use.label",
            "Les conditions générales d’utilisation"
          )}
        </TextLink>
        <TextLink
          onPress={() => WebBrowser.openBrowserAsync(linkPrivacy)}
          variant="default"
        >
          {t("screen.privacy.label", "Politique de confidentialité")}
        </TextLink>
      </Box>
    </Box>
  );
};
