import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { Formik, FormikHelpers } from "formik";
import { Box, Button, Divider, Input, Screen, TextLink } from "pearl-ui";
import React, { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import * as yup from "yup";
import i18n from "../../../i18n/i18n";
import { HOST } from "~constants";

import {
  RequestError,
  usePostAuthItsmeAuthenticate,
  usePostAuthLogin,
} from "~api";
import { NavigatorParamList } from "~navigation";

import { useAuth } from "../../hooks/useAuth";

WebBrowser.maybeCompleteAuthSession();

const useProxy = true;

const redirectUri = makeRedirectUri({
  useProxy,
});

type LogInFormValue = {
  email: string;
  password: string;
};

export const LogInScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "logIn">
> = ({ navigation }) => {
  const discovery = {
    authorizationEndpoint: "https://e2emerchant.itsme.be/oidc/authorization",
    tokenEndpoint: "https://e2emerchant.itsme.be/oidc/token",
    userInfoEndpoint: "https://e2emerchant.itsme.be/oidc/userinfo",
  };

  const [busy, setBusy] = useState(false);

  // Create and load an auth request
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "E09DRTM0fW",
      scopes: [
        "profile",
        "email",
        // "service:VDEXPERTSB_SHAREDATA",
        "service:VDEXPERTSB_LOGIN",
        "openid",
      ],
      redirectUri,
    },
    discovery
  );

  const initAuth = () => {
    setBusy(true);
    promptAsync({ useProxy });
  };

  const signupWithItsme = usePostAuthItsmeAuthenticate({
    onSuccess: async ({ data }) => {
      setBusy(false);
    },
    onError: (e) => {
      if ((e as RequestError).response?.status === 500) {
        Alert.alert(
          t("alert.title.error", "Erreur"),
          t(
            "alert.message.error.500",
            "Une erreur technique est survenue,merci de réessayer ultérieurement."
          ),
          [{ text: t("alert.button.ok", "Ok") }]
        );
      }
      console.log((e as RequestError).response?.data);
      setBusy(false);
    },
  });

  React.useEffect(() => {
    if (response && response.type === "success") {
      const { code, state } = response.params;
      signupWithItsme.mutate({
        requestBody: {
          code,
          state,
          redirectUri,
        },
      });
    }
  }, [response]);

  const { saveToken } = useAuth();

  const { t } = useTranslation();
  useEffect(() => {
    navigation.setOptions({
      title: t("screen.login.header.title", "Connexion"),
    });
  }, [navigation, t]);

  const login = usePostAuthLogin({
    onSuccess: async ({ data }) => {
      await saveToken(data?.access_token);
      // await Analytics.logEvent("login");

      navigation.replace("main");
    },
    onError: (e) => {
      console.log("e", e);
      if (e instanceof RequestError) {
        if (e.response?.status === 401 || e.response?.status === 404) {
          Alert.alert(
            t("alert.error.title", "Erreur"),
            t("screen.login.alert.error.password", "Mot de passe incorrect."),
            [{ text: t("alert.error.401-404.button.ok", "Ok") }]
          );
        }
      } else {
        Alert.alert(
          t("alert.error.title", "Erreur"),
          t(
            "alert.error.500.message",
            "Une erreur technique est survenue,merci de réessayer ultérieurement."
          ),
          [{ text: t("alert.error.500.button.ok", "Ok") }]
        );
      }
    },
  });

  const onSubmit = async (
    values: LogInFormValue,
    formikHelpers: FormikHelpers<LogInFormValue>
  ) => {
    if (values.email && values.password) {
      await login.mutate({
        requestBody: {
          email: values.email,
          password: values.password,
        },
      });
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object<LogInFormValue>({
      email: yup
        .string()
        .email()
        .label(t("screen.login.email.placeholder"))
        .required(),
      password: yup
        .string()
        .label(t("screen.login.password.placeholder", "Mot de passe"))
        .required(),
    });
  }, []);

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
    <Screen backgroundColor="grayBackground" flex={1}>
      <Spinner visible={busy} />
      <Formik<LogInFormValue>
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnBlur
        initialValues={{
          email: "",
          password: "",
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
              placeholder={"Email"}
              borderBottomLeftRadius={"z"}
              borderBottomRightRadius={"z"}
              borderTopLeftRadius={"l"}
              borderTopRightRadius={"l"}
              variant={"form"}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={handleChange("email")}
              focusBorderColor={"transparent"}
              onBlur={handleBlur("email")}
              value={values.email}
              isInvalid={errors.email !== undefined}
            />

            <Input
              isFullWidth
              variant={"form"}
              placeholder={t(
                "screen.login.password.placeholder",
                "Mot de passe"
              )}
              borderTopLeftRadius={"z"}
              borderTopRightRadius={"z"}
              borderBottomLeftRadius={"l"}
              borderBottomRightRadius={"l"}
              marginTop={"n"}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              onChangeText={handleChange("password")}
              focusBorderColor={"transparent"}
              onBlur={handleBlur("password")}
              value={values.password}
              isInvalid={errors.password !== undefined}
            />

            <Box alignItems="center">
              <Button
                onPress={() => handleSubmit()}
                isLoading={isSubmitting}
                isFullWidth
                isDisabled={!isValid}
                marginHorizontal={"m"}
                variant={"primary"}
                my={"m"}
              >
                {t("screen.login.button.continue", "CONTINUER")}
              </Button>

              <TextLink
                onPress={() => navigation.navigate("forgot")}
                variant="default"
              >
                {t("screen.login.link.forgot", "Mot de passe perdu ?")}
              </TextLink>

              <Divider my="m" />
              <TextLink
                onPress={() => navigation.navigate("signUp")}
                variant="default"
              >
                {t(
                  "screen.login.link.signup",
                  "Pas encore inscrit ? Créez un compte."
                )}
              </TextLink>
            </Box>
          </Box>
        )}
      </Formik>
      <Box flex={1} justifyContent="flex-end" alignItems="center">
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
    </Screen>
  );
};
