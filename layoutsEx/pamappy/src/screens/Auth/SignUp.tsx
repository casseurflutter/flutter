import { useActionSheet } from "@expo/react-native-action-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as WebBrowser from "expo-web-browser";
import { Formik, FormikHelpers } from "formik";
import { Box, Button, Input, Screen, Text, TextLink } from "pearl-ui";
import React, { FC, useEffect, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import * as yup from "yup";

import { RequestError, usePostAuthLogin, usePostAuthRegister } from "~api";
import { InputPicker, InputSwitch } from "~components";
import { useAuth } from "~hooks";
import { NavigatorParamList } from "~navigation";

export type SignupValue = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  gender?: "male" | "female";
  carrier?: boolean;
};
export const signUpAtom = atom<SignupValue | undefined>({
  key: "signUpAtom", // unique ID (with respect to other atoms/selectors)
  default: undefined,
});

export const useCurrentSignUpState = () => useRecoilState(signUpAtom);
export const useCurrentSignUpValue = () => useRecoilValue(signUpAtom);

export const SignUpScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "signUp">
> = ({ navigation }) => {
  const { t } = useTranslation();
  const [currentSignUpState, setCurrentSignUpState] = useCurrentSignUpState();

  useEffect(() => {
    navigation.setOptions({
      title: t("screen.signup.header.title", "Inscription"),
      headerBackVisible: false,
      headerRight: () => null,
    });
  }, [navigation]);

  type Step1FormValue = {
    email?: string;
    password?: string;
  };
  const onSubmit = async (
    values: Step1FormValue,
    formikHelpers: FormikHelpers<Step1FormValue>
  ) => {
    if (values.email && values.password) {
      formikHelpers.setSubmitting(true);

      setCurrentSignUpState((oldState) => ({
        ...oldState,
        email: values.email,
        password: values.password,
      }));
      navigation.navigate("signUpStep2");
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object<Step1FormValue>({
      email: yup.string().email().label("Email").required(),
      password: yup
        .string()
        .label(t("screen.login.password.placeholder", "Mot de passe"))
        .required(),
    });
  }, []);

  return (
    <Screen backgroundColor="grayBackground">
      <Formik<Step1FormValue>
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnBlur
        initialValues={{
          email: currentSignUpState?.email ?? "",
          password: currentSignUpState?.password ?? "",
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
          <Box flex={1}>
            <Input
              isFullWidth
              placeholder={t("screen.signup.email.placeholder", "Email")}
              borderBottomLeftRadius={"z"}
              borderBottomRightRadius={"z"}
              borderTopLeftRadius={"l"}
              borderTopRightRadius={"l"}
              variant={"form"}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={handleChange("email")}
              focusBorderColor={"transparent"}
              onBlur={handleBlur("email")}
              value={values.email}
              isInvalid={errors.email !== undefined}
            />
            <Input
              isFullWidth
              placeholder={t(
                "screen.signup.password.placeholder",
                "Mot de passe"
              )}
              borderTopLeftRadius={"z"}
              borderTopRightRadius={"z"}
              borderBottomLeftRadius={"l"}
              borderBottomRightRadius={"l"}
              focusBorderColor={"transparent"}
              marginTop={"n"}
              autoCapitalize="none"
              variant={"form"}
              secureTextEntry={true}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              isInvalid={errors.password !== undefined}
            />

            <Box alignItems="center">
              <Button
                onPress={() => handleSubmit()}
                isFullWidth
                isLoading={isSubmitting}
                isDisabled={!isValid}
                marginHorizontal={"m"}
                marginTop={"m"}
                variant="primary"
              >
                {t("screen.signup.button.continue", "CONTINUER")}
              </Button>

              <TextLink
                onPress={() => navigation.navigate("logIn")}
                variant="default"
              >
                {t(
                  "screen.signup.link.alread-signup",
                  "Déjà inscrit ? Connecte-toi !"
                )}
              </TextLink>
            </Box>
          </Box>
        )}
      </Formik>
    </Screen>
  );
};

export const SignUpStep2Screen: FC<
  NativeStackScreenProps<NavigatorParamList, "signUpStep2">
> = ({ navigation }) => {
  const { t } = useTranslation();

  const [currentSignUpState, setCurrentSignUpState] = useCurrentSignUpState();

  useEffect(() => {
    navigation.setOptions({
      title: t("screen.signup.header.title", "Inscription"),
    });
  }, [navigation, t]);

  type Step2FormValue = {
    firstName?: string;
    lastName?: string;
  };
  const onSubmit = async (
    values: Step2FormValue,
    formikHelpers: FormikHelpers<Step2FormValue>
  ) => {
    if (values.firstName && values.lastName) {
      formikHelpers.setSubmitting(true);

      setCurrentSignUpState((oldState) => ({
        ...oldState,
        firstName: values.firstName,
        lastName: values.lastName,
      }));

      navigation.navigate("signUpStep3");
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object<Step2FormValue>({
      firstName: yup
        .string()
        .label(t("screen.signup2.firstname.label", "Nom"))
        .required(),
      lastName: yup
        .string()
        .label(t("screen.signup2.lastname.label", "Prénom"))
        .required(),
    });
  }, []);

  return (
    <Screen backgroundColor="grayBackground">
      <Formik<Step2FormValue>
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnBlur
        initialValues={{
          firstName: currentSignUpState?.firstName ?? "",
          lastName: currentSignUpState?.lastName ?? "",
        }}
      >
        {({
          isValid,
          handleChange,
          isSubmitting,
          handleBlur,
          handleSubmit,
          errors,
          values,
        }) => (
          <Box flex={1}>
            <Input
              isFullWidth
              placeholder={t("screen.signup2.firstname.label", "Nom")}
              borderBottomLeftRadius={"z"}
              borderBottomRightRadius={"z"}
              borderTopLeftRadius={"l"}
              borderTopRightRadius={"l"}
              onChangeText={handleChange("firstName")}
              focusBorderColor={"transparent"}
              onBlur={handleBlur("firstName")}
              variant={"form"}
              value={values.firstName}
              isInvalid={errors.firstName !== undefined}
            />
            <Input
              isFullWidth
              placeholder={t("screen.signup2.lastname.label", "Prénom")}
              borderTopLeftRadius={"z"}
              borderTopRightRadius={"z"}
              borderBottomLeftRadius={"l"}
              borderBottomRightRadius={"l"}
              focusBorderColor={"transparent"}
              marginTop={"n"}
              variant={"form"}
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
              isInvalid={errors.lastName !== undefined}
            />
            <Box alignItems="center">
              <Button
                onPress={() => handleSubmit()}
                size="l"
                isLoading={isSubmitting}
                isDisabled={!isValid}
                isFullWidth
                variant={"primary"}
                marginHorizontal={"l"}
                marginTop={"m"}
              >
                {t("screen.signup.button.continue", "CONTINUER")}
              </Button>
            </Box>
          </Box>
        )}
      </Formik>
    </Screen>
  );
};

export const SignUpStep3Screen: FC<
  NativeStackScreenProps<NavigatorParamList, "signUpStep3">
> = ({ navigation }) => {
  const [currentSignUpState, setCurrentSignUpState] = useCurrentSignUpState();
  const { t } = useTranslation();
  const { saveToken } = useAuth();

  const login = usePostAuthLogin({
    onSuccess: async ({ data }) => {
      await saveToken(data?.access_token);
      navigation.replace("main");
      if (data?.user?.gender == "female") {
        Alert.alert(
          t("alert.signup.success.title", "Mon profil"),
          t(
            "alert.signup.success.description",
            "Ton compte a bien été créé. Complète ton profil afin de personaliser ton expérience."
          ),
          [
            { text: t("alert.signup.success.button.later", "Plus tard") },
            {
              text: t("alert.signup.success.button.complete", "Compléter"),
              onPress: () => {
                navigation.navigate("myInformations");
              },
            },
          ]
        );
      }
    },
    onError: (e) => {
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
  useEffect(() => {
    navigation.setOptions({
      title: t("screen.signup.header.title", "Inscription"),
    });
  }, [navigation, t]);

  const { showActionSheetWithOptions } = useActionSheet();

  const handleShowGenderActionSheet = () => {
    showActionSheetWithOptions(
      {
        options: [
          t("screen.signup.wish-to-carry.label", "Je souhaite porter"),
          t(
            "screen.signup.wish-not-to-carry.label",
            "Je ne souhaite pas porter"
          ),
        ],
      },
      (buttonIndex) => {
        setCurrentSignUpState({
          ...currentSignUpState,
          gender: buttonIndex === 1 ? "male" : "female",
        });
      }
    );
  };
  const register = usePostAuthRegister({
    onSuccess: async ({ data }) => {
      await login.mutate({
        requestBody: {
          email: currentSignUpState?.email,
          password: currentSignUpState?.password,
        },
      });
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
      } else if ((e as RequestError).response?.status === 401) {
        Alert.alert(
          t("alert.title.error", "Erreur"),
          t(
            "alert.message.error.email-used",
            "Cette adresse email est déjà utilisée."
          ),
          [
            {
              text: t("alert.button.ok", "Ok"),
              onPress: () => {
                navigation.navigate("signUp");
              },
            },
          ]
        );
      }
      console.log((e as RequestError).response?.data);
    },
  });

  const onSubmit = async () => {
    await register.mutate({
      requestBody: {
        email: currentSignUpState?.email,
        password: currentSignUpState?.password,
        firstName: currentSignUpState?.firstName,
        lastName: currentSignUpState?.lastName,
        gender: currentSignUpState?.gender,
        carrier:
          currentSignUpState?.gender == "female"
            ? currentSignUpState?.carrier
            : false,
      },
    });
  };

  return (
    <Screen backgroundColor="grayBackground">
      <InputPicker
        label={t("screen.signup.account.label", "Compte")}
        value={
          currentSignUpState?.gender
            ? currentSignUpState?.gender == "male"
              ? t(
                  "screen.signup.wish-not-to-carry.label",
                  "Je ne souhaite pas porter"
                )
              : t("screen.signup.wish-to-carry.label", "Je souhaite porter")
            : null
        }
        containerProps={{ marginBottom: "s" }}
        onPress={handleShowGenderActionSheet}
      />
      {currentSignUpState?.gender == "female" ? (
        <>
          <InputSwitch
            label={t(
              "screen.signup.carrier.label",
              "JE SUIS LA PORTEUSE DU BEBE"
            )}
            onValueChange={() =>
              setCurrentSignUpState({
                ...currentSignUpState,
                carrier: !currentSignUpState?.carrier,
              })
            }
            value={currentSignUpState?.carrier}
            containerProps={{ marginBottom: "s" }}
          />
        </>
      ) : null}

      <Text variant="p2" textAlign="center" color={"gray8"}>
        <Trans i18nKey="screen.signup.privary.placeholder">
          En créant un compte PaMappy, tu acceptes
        </Trans>
      </Text>
      <Box mb="m" alignItems="center">
        <TextLink
          my="m"
          onPress={() =>
            WebBrowser.openBrowserAsync(
              "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
            )
          }
          variant="default"
        >
          {t(
            "screen.terms-of-use.label",
            "Les conditions générales d’utilisation"
          )}
        </TextLink>
        <TextLink
          onPress={() =>
            WebBrowser.openBrowserAsync(
              "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
            )
          }
          variant="default"
        >
          {t("screen.privacy.label", "Politique de confidentialité")}
        </TextLink>
      </Box>

      <Box alignItems="center">
        <Button
          onPress={onSubmit}
          size="l"
          isFullWidth
          marginHorizontal={"l"}
          variant={"primary"}
          marginTop={"s"}
        >
          {t("screen.signup.button.continue", "CONTINUER")}
        </Button>
      </Box>
    </Screen>
  );
};