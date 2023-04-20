import { useActionSheet } from "@expo/react-native-action-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { Formik, FormikHelpers } from "formik";
import { Box, Divider, Icon, Input, Pressable, Screen, Text } from "pearl-ui";
import React, { FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Linking } from "react-native";
import { useQueryClient } from "react-query";
import * as yup from "yup";

import { Avatar, BusyIndicator, Card, HeaderFormSubmit } from "~components";
import { useUpload } from "~hooks";
import { NavigatorParamList } from "~navigation";

import {
  getUsersMe,
  RequestError,
  useGetUsersMe,
  usePutUsersEdit,
} from "../api";
type MyProfileFormValue = {
  firstName: string;
  lastName: string;
  picture: string;
};
export const MyProfileScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "myProfile">
> = ({ navigation }) => {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useGetUsersMe();
  const refForm = useRef<any>(null);
  const { upload } = useUpload();
  const { t } = useTranslation();
  const [image, setImage] = useState("");
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const { showActionSheetWithOptions } = useActionSheet();
  const edit = usePutUsersEdit({
    onSuccess: async ({ data }) => {
      await refetch();
      queryClient.invalidateQueries(getUsersMe.key);
      Alert.alert(
        t("screen.my-profile.success.title", "Votre profile a été modifiée."),
        "",
        [{ text: t("alert.button.ok", "Ok") }]
      );
    },
    onError: (e) => {
      if (e instanceof RequestError) {
        Alert.alert(
          t("alert.title.error", "Erreur"),
          t(
            "alert.message.error.500",
            "Une erreur technique est survenue,merci de réessayer ultérieurement."
          ),
          [{ text: t("alert.button.ok", "Ok") }]
        );
      }
    },
  });
  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.cancelled) {
      setImage(result?.uri);
      refForm.current.setFieldValue("picture", result?.uri);
    }
  };
  const onSubmit = async (
    values: MyProfileFormValue,
    formikHelpers: FormikHelpers<MyProfileFormValue>
  ) => {
    let uploadedFile = null;
    let schema = yup.object().shape({
      firstName: yup
        .string()
        .min(3)
        .max(15)
        .lowercase()
        .trim()
        .label(t("screen.my-profile.firstname.label", "Prénom"))
        .required(),
      lastName: yup
        .string()
        .min(3)
        .max(15)
        .lowercase()
        .trim()
        .label(t("screen.my-profile.lastname.label", "Nom"))
        .required(),
    });
    if (image) {
      uploadedFile = await upload(values.picture);
    }
    try {
      await schema.validate({
        firstName: values.firstName,
        lastName: values.lastName,
      });
      formikHelpers.setSubmitting(true);

      edit.mutate({
        requestBody: {
          firstName: values.firstName,
          lastName: values.lastName,
          picture: uploadedFile?.id,
        },
      });
    } catch (err: any) {
      Alert.alert(
        t("alert.title.form-my-profile.error.title", "Validation"),
        err.errors[0],
        [{ text: t("alert.button.ok", "Ok") }]
      );
    }
  };
  const showActionsSheet = () => {
    showActionSheetWithOptions(
      {
        options: [
          t(
            "screen.settings.action-sheet.choose-picture.label",
            "Choisir dans la galerie photo"
          ),
          t(
            "screen.settings.action-sheet.take-picture.label",
            "Prendre une photo"
          ),
          t("common.button.cancel", "Annuler"),
        ],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 2,
      },
      async (buttonIndex) => {
        if (buttonIndex == 0) {
          await selectImage();
        } else if (buttonIndex == 1) {
          const { granted } = await askPermissionCamera();
          if (granted) {
            const result = await ImagePicker.launchCameraAsync();
            if (!result.cancelled) {
              setImage(result?.uri);
              refForm.current.setFieldValue("picture", result?.uri);
            }
          }
        }
      }
    );
  };
  if (isLoading) {
    return (
      <Screen backgroundColor="bleuClair">
        <BusyIndicator />
      </Screen>
    );
  }
  const askPermissionCamera = async () => {
    if (!response?.canAskAgain) {
      Alert.alert(
        t(
          "screen.settings.alert.ask-permission-camera.title",
          "Merci de vérifier l'autorisation à votre camera"
        ),
        "",
        [
          { text: t("common.button.cancel", "Annuler") },
          {
            text: t(
              "screen.settings.alert.ask-permission.button.settings",
              "Paramètres"
            ),
            onPress: () => {
              Linking.openSettings();
            },
          },
        ]
      );
    }
    return await requestPermission();
  };
  const user = data?.data;

  return (
    <Screen flex={1} backgroundColor="grayBackground">
      <Formik<MyProfileFormValue>
        onSubmit={onSubmit}
        innerRef={refForm}
        enableReinitialize
        initialValues={{
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          picture: user?.picture || "",
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
          <>
            <Card p="s" mb="s">
              <Box
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Text ml="s" variant="p2">
                  {t("screen.my-profile.avatar.label", "Photo de profil")}
                </Text>

                <Pressable onPress={() => showActionsSheet()}>
                  {image || data?.data.picture ? (
                    <Avatar url={image || data?.data?.picture} />
                  ) : (
                    <Box
                      alignItems="center"
                      justifyContent="center"
                      width={37}
                      height={37}
                      borderRadius="m"
                      bg="blueNavigation"
                    >
                      <Icon
                        iconFamily="FontAwesome5"
                        iconName="image"
                        size="l"
                        color="white"
                      />
                    </Box>
                  )}
                </Pressable>
              </Box>
            </Card>
            <Card>
              <HeaderFormSubmit
                title={t("screen.my-profile.title", "Mon profil")}
              />
              <Box flexDirection="row">
                <Box ml="m" justifyContent="center" flexDirection="column">
                  <Text variant="p2">
                    {t("screen.my-profile.firstname.label", "Prénom")}
                  </Text>
                </Box>
                <Box flex={1} flexDirection="column">
                  <Input
                    autoCorrect={false}
                    textAlign="right"
                    isFullWidth
                    value={values.firstName}
                    autoCapitalize="none"
                    onChangeText={handleChange("firstName")}
                  />
                </Box>
              </Box>
              <Divider />

              <Box flexDirection="row">
                <Box ml="m" justifyContent="center" flexDirection="column">
                  <Text variant="p2">{t("screen.my-profile.name", "Nom")}</Text>
                </Box>
                <Box flex={1} flexDirection="column">
                  <Input
                    textAlign="right"
                    isFullWidth
                    autoCorrect={false}
                    marginTop={"n"}
                    value={values.lastName}
                    borderWidth={0}
                    autoCapitalize="none"
                    onChangeText={handleChange("lastName")}
                  />
                </Box>
              </Box>
              <Divider />
              <Box flexDirection="row">
                <Box ml="m" justifyContent="center" flexDirection="column">
                  <Text variant="p2">
                    {t("screen.my-profile.email", "Email")}
                  </Text>
                </Box>
                <Box flex={1} flexDirection="column">
                  <Input
                    textAlign="right"
                    isFullWidth
                    pointerEvents="none"
                    marginTop={"n"}
                    editable={false}
                    value={data?.data?.email}
                    borderWidth={0}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </Box>
              </Box>
            </Card>
          </>
        )}
      </Formik>
    </Screen>
  );
};
