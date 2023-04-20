import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Divider, Screen, TextLink } from "pearl-ui";
import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Pressable } from "react-native";

import {
  BusyIndicator,
  Card,
  CardLabelSwitch,
  CardLabelValue,
  SettingsItemHeader,
} from "~components";
import { NavigatorParamList } from "~navigation";

import { useGetUsersMe, usePutUsersEdit } from "../api/hooks";

export const ShareOptionsScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "shareOptions">
> = ({ navigation }) => {
  const { t } = useTranslation();
  const { data, isLoading, refetch } = useGetUsersMe();
  const [option, setOptions] = useState({
    shareAppointments: false,
    shareDocuments: false,
    shareMedications: false,
    shareNotes: false,
    sharePhotos: false,
  });

  const edit = usePutUsersEdit({
    onSuccess: async ({ data }) => {
      Alert.alert(
        t("screen.my-info.title.success", "Votre informations a été modifiée."),
        "",
        [{ text: t("alert.button.ok", "Ok") }]
      );
      refetch();
    },
    onError: (e) => {
      console.log(e);
    },
  });
  useEffect(() => {
    if (data?.data) {
      setOptions({
        shareAppointments: data?.data?.shareAppointments,
        shareDocuments: data?.data?.shareDocuments,
        shareMedications: data?.data?.shareMedications,
        shareNotes: data?.data?.shareNotes,
        sharePhotos: data?.data?.sharePhotos,
      });
    }
  }, [data?.data]);
  useEffect(() => {
    navigation.setOptions({
      title: t("screen.settings.share.title", "Partage"),
      headerRight: () =>
        data?.data?.partner ? (
          <TextLink variant="save" onPress={() => onSave()}>
            {t("button.save", "Enregistrer")}
          </TextLink>
        ) : null,
    });
  }, [navigation, t, data, option]);
  if (isLoading) {
    return (
      <Screen flex={1} backgroundColor="bleuClair">
        <BusyIndicator />
      </Screen>
    );
  }
  const onSave = async () => {
    try {
      await edit.mutate({
        requestBody: {
          shareAppointments: option?.shareAppointments,
          shareDocuments: option?.shareDocuments,
          shareMedications: option?.shareMedications,
          shareNotes: option?.shareNotes,
          sharePhotos: option?.sharePhotos,
        },
      });
    } catch (err: any) {
      console.log("err", err);
    }
  };
  return (
    <Screen flex={1} backgroundColor="grayBackground">
      <SettingsItemHeader
        containerProps={{
          marginBottom: "s",
        }}
        title={t("screen.settings.share.subtitle", "Partage")}
      />
      <Card withShadow={false}>
        <Pressable onPress={() => navigation.navigate("shareWithPartner")}>
          <CardLabelValue
            containerProps={{ marginVertical: "n" }}
            showChevron
            label={
              data?.data?.partner
                ? data?.data?.partner.email
                : t("screen.settings.share.label", "Mon partanaire")
            }
          />
        </Pressable>
      </Card>
      {data?.data?.partner ? (
        <>
          <SettingsItemHeader
            containerProps={{
              marginVertical: "s",
            }}
            title={t(
              "screen.settings.share-option.title",
              "Options de partage"
            )}
          />
          <Card withShadow={false}>
            <CardLabelSwitch
              value={option.shareAppointments}
              containerProps={{ paddingHorizontal: "m" }}
              label={t(
                "screen.settings.share-option.label.appointment",
                "Rendez-vous"
              )}
              toggleSwitch={(value) =>
                setOptions({ ...option, shareAppointments: value })
              }
            />
            <Divider />
            <CardLabelSwitch
              value={option.shareDocuments}
              containerProps={{ paddingHorizontal: "m" }}
              label={t(
                "screen.settings.share-option.label.document",
                "Document"
              )}
              toggleSwitch={(value) =>
                setOptions({ ...option, shareDocuments: value })
              }
            />

            <Divider />
            <CardLabelSwitch
              value={option.shareMedications}
              containerProps={{ paddingHorizontal: "m" }}
              label={t(
                "screen.settings.share-option.label.medication",
                "Médicaments"
              )}
              toggleSwitch={(value) =>
                setOptions({ ...option, shareMedications: value })
              }
            />
            <Divider />
            <CardLabelSwitch
              value={option.shareNotes}
              containerProps={{ paddingHorizontal: "m" }}
              label={t("screen.settings.share-option.label.notes", "Notes")}
              toggleSwitch={(value) =>
                setOptions({ ...option, shareNotes: value })
              }
            />
            <Divider />
            <CardLabelSwitch
              value={option.sharePhotos}
              containerProps={{ paddingHorizontal: "m" }}
              label={t("screen.settings.share-option.label.photos", "Photos")}
              toggleSwitch={(value) =>
                setOptions({ ...option, sharePhotos: value })
              }
            />
          </Card>
        </>
      ) : null}
    </Screen>
  );
};
