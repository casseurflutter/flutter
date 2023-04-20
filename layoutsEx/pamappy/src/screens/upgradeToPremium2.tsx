import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as WebBrowser from "expo-web-browser";
import { Formik, FormikHelpers } from "formik";
import { Box, Button, Input, Screen, Text, TextLink } from "pearl-ui";
import React, { FC, useEffect, useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Linking } from "react-native";
import Purchases from "react-native-purchases";
import * as yup from "yup";

import { BusyIndicator, P } from "~components";
import { HOST } from "~constants";
import { usePurchaseState, usePurchasingState } from "~hooks";
import { NavigatorParamList } from "~navigation";
import i18n from "../../i18n/i18n";

import { useGetUsersMe } from "../api/hooks";
import Birds from "../assets/birds.svg";
import Bottle from "../assets/Bottle.svg";
import Calendar from "../assets/calendar.svg";
import Client from "../assets/client.svg";
import Illustrations from "../assets/illustrations.svg";
type UpgradePremiumFormValue = {
  code: string;
};
export const UpgradeToPremium2: FC<
  NativeStackScreenProps<NavigatorParamList, "updateToPremium2">
> = ({ navigation, route }) => {
  const [code, setCode] = useState("");
  const [showInput, setShowInput] = useState(false);

  const [isPurchasing, setIsPurchasing] = usePurchasingState();
  const purchaseState = usePurchaseState();

  const { data, status, refetch } = useGetUsersMe();

  const { t } = useTranslation();
  useEffect(() => {
    navigation.setOptions({
      title: "Compte Premium",
    });
  }, [navigation, t]);
  const validationSchema = useMemo(() => {
    return yup.object<UpgradePremiumFormValue>({
      code: yup.string().required(),
    });
  }, []);

  const purchaseOffer = () => {
    setIsPurchasing(true);
    try {
      if (data?.data.gender == "female") {
        Purchases.purchaseProduct("solo_monthly_subscription");
      } else {
        Purchases.purchaseProduct("duo_monthly_subscription");
      }
    } catch (e) {
      console.log("purchase error", e);
    }
  };

  const onSubmit = async (
    values: UpgradePremiumFormValue,
    formikHelpers: FormikHelpers<UpgradePremiumFormValue>
  ) => {
    Linking.openURL(
      `https://apps.apple.com/redeem?ctx=offercodes&id=net.linksoftware.pamappy&code=${values.code}`
    );
    navigation.goBack();
  };

  const handlePurchase = () => {
    purchaseOffer();
    navigation.goBack();
  };

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

  if (status == "loading") {
    return (
      <Screen flex={1} backgroundColor="grayBackground">
        <BusyIndicator />
      </Screen>
    );
  }

  return (
    <Screen
      flex={1}
      backgroundColor={"concrete"}
      borderTopColor={"gray2"}
      borderTopWidth={1}
    >
      <Box my="m">
        <Box flexDirection="row">
          <Box flex={1}>
            <Box
              borderStyle="solid"
              borderLeftWidth={4}
              borderColor="vert"
              my="l"
            >
              <Text ml="m" variant="t2" fontWeight="medium">
                <Trans i18nKey={"screen.upgrade.premium-account"}>
                  Compte Premium
                </Trans>
              </Text>
            </Box>
            <Text variant="t2" color="vert" ml="l" fontWeight="bold">
              {purchaseState.currentOffering?.serverDescription} :
              {purchaseState.currentOffering?.monthly?.product.priceString} /
              <Trans i18nKey={"screen.upgrade.month"}>mois</Trans>
            </Text>
          </Box>

          <Box>
            <Birds width={160} height={250} fill="#4EC19F" />
            <Box position="absolute" top={30}>
              <Illustrations />
            </Box>
          </Box>
        </Box>

        <Box maxWidth={300} m="m">
          <Box flexDirection="row">
            <Calendar fill={"#F0F1F3"} width={32} height={32} />
            <P variant="p3" ml="m" color="gray9">
              <Trans i18nKey={"screen.upgrade.description"}>
                Visualisez tous vos rendez-vous et suivez vos périodes de règles
                sur l’agenda
              </Trans>
            </P>
          </Box>
          <Box my="l" flexDirection="row">
            <Client width={32} height={32} />
            <P numberOfLines={3} variant="p3" pr="s" ml="m" color="gray9">
              <Trans i18nKey={"screen.upgrade.description2"}>
                Accédez à la galerie photos pour enregistrer vos souvenirs
                directement dans l’app
              </Trans>
            </P>
          </Box>
          <Box flexDirection="row">
            <Bottle width={32} height={32} />
            <P variant="p3" ml="m" color="gray9">
              <Trans i18nKey={"screen.upgrade.description3"}>
                Enregistrez vos prises de médicaments et soyez notifiés des
                rappels de vos doses
              </Trans>
            </P>
          </Box>
        </Box>

        {showInput ? (
          <>
            <Box px="l">
              <Formik<UpgradePremiumFormValue>
                onSubmit={onSubmit}
                validateOnMount
                validationSchema={validationSchema}
                initialValues={{
                  code: "",
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
                        placeholder="Code promo"
                        onChangeText={handleChange("code")}
                        onBlur={handleBlur("code")}
                        value={values.code}
                      />

                      <Button
                        variant="primary"
                        onPress={handleSubmit}
                        backgroundColor="blueNavigation"
                        isFullWidth
                        isDisabled={isValid === false}
                        isLoading={isSubmitting}
                      >
                        {t("screen.upgrade.submit")}
                      </Button>
                      <TextLink
                        style={{
                          alignItems: "center",
                          fontWeight: "bold",
                        }}
                        onPress={() => setShowInput(false)}
                        variant="primary"
                      >
                        {t("screen.upgrade.cancel")}
                      </TextLink>
                    </Box>
                  </>
                )}
              </Formik>
            </Box>
          </>
        ) : (
          <Box>
            <Button
              variant="primary"
              backgroundColor="blueNavigation"
              onPress={handlePurchase}
              isFullWidth
              marginHorizontal={"m"}
            >
              {t("screen.upgrade.start-trial")}
            </Button>
            <TextLink
              my="s"
              style={{
                alignItems: "center",
                fontWeight: "bold",
              }}
              onPress={() => setShowInput(true)}
              variant="primary"
            >
              {t("screen.upgrade.enter-code")}
            </TextLink>
          </Box>
        )}

        <Box
          mt="l"
          flexDirection="row"
          alignContent="center"
          alignItems="center"
          justifyContent="center"
          marginBottom="m"
        >
          <TextLink
            onPress={() => WebBrowser.openBrowserAsync(linkTerms)}
            alignItems="center"
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
    </Screen>
  );
};
