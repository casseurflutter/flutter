import { useActionSheet } from "@expo/react-native-action-sheet";
import { CommonActions } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Calendar from "expo-calendar";
import * as MailComposer from "expo-mail-composer";
import * as WebBrowser from "expo-web-browser";
import { Divider, Screen } from "pearl-ui";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Linking } from "react-native";
import Toast from "react-native-root-toast";
import { useQueryClient } from "react-query";

import {
  BusyIndicator,
  Card,
  SettingsItemHeader,
  SettingsItemTextValue,
} from "~components";
import { FAQ_LINK } from "~constants";
import { NavigatorParamList } from "~navigation";

import i18n, { changeLanguage } from "../../i18n/i18n";
import {
  useGetUsersMe,
  usePostUsersSendAccountData,
  usePutUsersEdit,
} from "../api/hooks";
import { getUsersMe } from "../api/services";
import { OptionSheet } from "../components/OptionSheet";
import { useAuth } from "../hooks/useAuth";
import { usePurchaseState } from "../hooks/usePurchase";

export const SettingsScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "settings">
> = ({ navigation }) => {
  const { logout } = useAuth();
  const { t } = useTranslation();
  const { data, isLoading, refetch } = useGetUsersMe();
  const sendAccountData = usePostUsersSendAccountData();
  const supportedLanguages = ["fr", "en"];
  const queryClient = useQueryClient();
  const { showActionSheetWithOptions } = useActionSheet();

  const purchaseState = usePurchaseState();
  const [response, requestPermission] = Calendar.useCalendarPermissions();
  const edit = usePutUsersEdit({
    onSuccess: () => {},
    onError: (e) => {
      console.log(e);
    },
    onSettled: () => {
      queryClient.invalidateQueries(getUsersMe.key);
    },
  });
  const [calendars, setCalendars] = useState<any>([]);
  useEffect(() => {
    navigation.setOptions({
      title: t("screen.settings.title", "Réglages"),
    });
  }, [navigation, t]);
  useEffect(() => {
    (async () => {
      if (response?.status == Calendar.PermissionStatus.GRANTED) {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );

        setCalendars(
          calendars.filter((calendar) => calendar.allowsModifications)
        );
      }
    })();
  }, [response]);
  const handleLogout = useCallback(() => {
    Alert.alert(
      t(
        "screen.settings.alert.logout.title",
        "Es-tu sûr(e) de vouloir te déconnecter ?"
      ),
      "",
      [
        {
          text: t("common.cancel", "Annuler"),
          style: "cancel",
        },
        {
          text: t(
            "screen.settings.alert.logout.button.confirm",
            "Me déconnecter"
          ),
          style: "destructive",
          onPress: () => {
            logout();

            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{ name: "loading" }],
              })
            );
          },
        },
      ]
    );
  }, [logout, navigation, t]);

  const handleRequestAccountInfo = useCallback(() => {
    Alert.alert(
      t(
        "screen.settings.alert.request-my-data.title",
        "Demander les informations de mon compte"
      ),
      t(
        "screen.settings.alert.request-my-data.description",
        "Les informations de ton compte te seront envoyées par email sous peu."
      )
    );
    sendAccountData.mutate();
  }, [t, sendAccountData]);

  const handleChangeLanguague = (v: string) => {
    changeLanguage(v);
    edit.mutate({
      requestBody: {
        locale: v,
      },
    });
  };

  const handleSelectCalendar = async () => {
    if (response?.granted && calendars.length > 0) {
      showActionSheetWithOptions(
        {
          options: [
            t("common.button.cancel", "Annuler"),
            ...calendars.map((item: any) => item.title),
          ],
          cancelButtonIndex: 0,
          destructiveButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex != 0) {
            edit.mutate({
              requestBody: {
                calendarId: calendars[buttonIndex - 1].id,
              },
            });
            Toast.show(
              t(
                "screen.settings.toast-sync.title",
                "Ton calendrier est désormais synchronisée"
              ),
              {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 5,
              }
            );
          } else {
            edit.mutate({
              requestBody: {
                calendarId: null,
              },
            });
          }
        }
      );
    } else {
      await askPermissionCalendar();
    }
  };

  const askPermissionCalendar = async () => {
    let response = await requestPermission();
    if (!response?.canAskAgain) {
      Alert.alert(
        t(
          "screen.settings.alert.ask-permission.title",
          "Merci de vérifier l'autorisation à votre calendrier"
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
  };

  const handleOpenAskQuestion = () => {
    MailComposer.composeAsync({
      bccRecipients: ["contact@pamappy.be"],
    });
  };
  const handleOpenSendFeedBack = () => {
    MailComposer.composeAsync({
      subject: "Feedback",
      bccRecipients: ["contact@pamappy.be"],
    });
  };

  const handleOpenSettings = () => {
    if (purchaseState?.customerInfo?.managementURL) {
      Linking.openURL(purchaseState.customerInfo.managementURL);
    }
  };

  if (isLoading) {
    return (
      <Screen flex={1} backgroundColor="grayBackground">
        <BusyIndicator />
      </Screen>
    );
  }

  const calendar =
    data?.data?.calendarId &&
    calendars.some((item: any) => item.id === data?.data?.calendarId)
      ? calendars.find((item: any) => item.id === data?.data?.calendarId).title
      : t("common.select.label", "Choisir");
  return (
    <Screen flex={1} backgroundColor="grayBackground">
      <SettingsItemHeader
        title={t("screen.settings.header1.title", "Mes informations")}
      />

      <Card mt="s" mb="m">
        <SettingsItemTextValue
          showChevron
          onPress={() => navigation.navigate("myProfile")}
          title={t("screen.settings.my-profil.label", "Mon profil")}
        />

        {data?.data?.gender == "female" ? (
          <>
            <Divider />

            <SettingsItemTextValue
              showChevron
              onPress={() => navigation.navigate("myInformations")}
              title={t(
                "screen.settings.personal-info",
                "Mes informations personnelles"
              )}
            />
            <Divider />

            <SettingsItemTextValue
              showChevron
              onPress={() => navigation.navigate("myMedicalCenter")}
              title={t(
                "screen.settings.my-medical-center.label",
                "Mon centre médical"
              )}
            />
            <Divider />

            <SettingsItemTextValue
              showChevron
              onPress={() => navigation.navigate("myMeals")}
              title={t("screen.settings.my-meals.label", "Mes repas")}
            />
          </>
        ) : null}

        <Divider />
        {data && data.data.isPremium ? (
          <SettingsItemTextValue
            onPress={handleOpenSettings}
            titleProps={{
              color: "orange",
            }}
            title={t("screen.settings.premium", "Abonnement {{type}}", {
              type:
                i18n.language == "fr"
                  ? data.data.subscriptionType
                  : `${
                      data.data.subscriptionType.charAt(0).toUpperCase() +
                      data.data.subscriptionType.slice(1)
                    }`,
            })}
          />
        ) : (
          <SettingsItemTextValue
            showChevron
            titleProps={{
              color: "orange",
            }}
            onPress={() => navigation.navigate("updateToPremium2")}
            title={t(
              "screen.settings.upgrade.title",
              "Passer à l’abonnement Premium"
            )}
          />
        )}
      </Card>

      <SettingsItemHeader
        title={t("screen.settings.header2.title", "Partage et langue")}
      />
      <Card mt="s" mb="m">
        {data?.data?.gender == "female" ? (
          <SettingsItemTextValue
            onPress={() => navigation.navigate("shareOptions")}
            showChevron={false}
            value={t("common.select.label", "Choisir")}
            title={t(
              "screen.settings.share-with-partner.label",
              "Partager avec mon partenaire"
            )}
          />
        ) : (
          <SettingsItemTextValue
            onPress={() => navigation.navigate("share")}
            showChevron={true}
            title={t("screen.settings.share", "Partager")}
          />
        )}

        <Divider />

        <SettingsItemTextValue
          value={calendar}
          TextProps={{
            w: 120,
            backgroundColor: "pink",
            alignSelf: "flex-end",

            numberOfLines: 1,
          }}
          onPress={handleSelectCalendar}
          title={t(
            "screen.settings.synchronize-my-calendar.label",
            "Synchroniser mon agenda"
          )}
        />
        <Divider />
        <OptionSheet
          editable
          items={supportedLanguages.map((lang) => ({
            label: t(`${lang}`),
            value: lang,
          }))}
          onSelected={(lang: any) => handleChangeLanguague(lang.value)}
          value={i18n.language}
        >
          <SettingsItemTextValue
            title={t(
              "screen.settings.select-language.select",
              "Choix de langue"
            )}
            value={t(`${i18n.language}`)}
          />
        </OptionSheet>
      </Card>
      <SettingsItemHeader
        title={t("screen.settings.header3.title", "Centre d’aide")}
      />
      <Card mt="s" mb="m">
        <SettingsItemTextValue
          showChevron
          onPress={() =>
            WebBrowser.openBrowserAsync(`${FAQ_LINK}/${i18n.language}/faq`)
          }
          title={t("screen.settings.faq.label", "FAQ")}
        />
        <Divider />
        <SettingsItemTextValue
          onPress={handleOpenAskQuestion}
          showChevron
          title={t("screen.settings.ask-question.label", "Poser une question")}
        />
        <Divider />
        <SettingsItemTextValue
          onPress={handleOpenSendFeedBack}
          showChevron
          title={t("screen.settings.feedback.label", "Envoyer un feedback")}
        />
      </Card>
      <SettingsItemHeader
        title={t("screen.settings.header4.title", "Compte et confidentialité")}
      />
      <Card mt="s" mb="m">
        <SettingsItemTextValue
          onPress={handleLogout}
          showChevron
          title={t("screen.settings.logout.label", "Me déconnecter")}
        />

        <Divider />
        <SettingsItemTextValue
          onPress={() => navigation.navigate("resetPassword")}
          showChevron
          title={t(
            "screen.settings.reset-password.label",
            "Réinitialiser mon mot de passe"
          )}
        />
        <Divider />
        <SettingsItemTextValue
          onPress={handleRequestAccountInfo}
          showChevron
          title={t(
            "screen.settings.ask-info-account.label",
            "Demander les informations de mon compte"
          )}
        />
        <Divider />
        <SettingsItemTextValue
          onPress={() => navigation.navigate("deleteMyAccount")}
          showChevron
          title={t(
            "screen.settings.delete-account.label",
            "Supprimer mon compte"
          )}
        />
      </Card>
    </Screen>
  );
};
