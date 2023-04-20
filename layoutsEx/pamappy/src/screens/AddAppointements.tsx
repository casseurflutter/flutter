import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import * as Calendar from "expo-calendar";
import { Formik, FormikHelpers } from "formik";
import initials from "initials";
import {
  Box,
  Button,
  Divider,
  Icon,
  Input,
  Pressable,
  Screen,
  Text,
  TextLink,
} from "pearl-ui";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Keyboard, Linking, Platform } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { useQueryClient } from "react-query";
import { atom, useRecoilState } from "recoil";
import * as yup from "yup";

export async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.id;
}
import {
  BusyIndicator,
  Card,
  CardLabelSwitch,
  HeaderFormSubmit,
  InputPicker,
} from "~components";
import { NavigatorParamList } from "~navigation";

import i18n from "../../i18n/i18n";
import {
  useDeleteAppointmentsId,
  useGetAppointmentsId,
  useGetUsersMe,
  usePostAppointments,
  usePutAppointmentsId,
  usePutUsersEdit,
} from "../api/hooks";
import {
  getAppointmentsAll,
  getAppointmentsId,
  getUsersMe,
} from "../api/services";
import { types } from "./TypesAppointement";
export type AppointementType = {
  id: number;
  label: string;
};
export const appointementType = atom<AppointementType | undefined>({
  key: "appointementType", // unique ID (with respect to other atoms/selectors)
  default: undefined,
});

export const enablePermissionCalendar = () => {
  Alert.alert(
    i18n.t(
      "screen.settings.alert.ask-permission.title",
      "Merci de vérifier l'autorisation à votre calendrier"
    ),
    "",
    [
      { text: i18n.t("common.button.cancel", "Annuler") },
      {
        text: i18n.t(
          "screen.settings.alert.ask-permission.button.settings",
          "Paramètres"
        ),
        onPress: () => {
          Linking.openSettings();
        },
      },
    ]
  );
};
const AvatarText = ({ isDisabled, user, onSelect, value }: any) => {
  const [selected, setSelected] = useState<string>(value);
  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const handleSelectItem = (id: string) => {
    setSelected(id);
    onSelect(id);
  };
  return (
    <Box flexDirection="row">
      {[user?._id, user?.partner._id].map((id, key) => (
        <Box mx="xs" flexDirection="row" alignItems="center" key={key}>
          <Pressable
            width={35}
            isDisabled={isDisabled}
            height={35}
            onPress={() => handleSelectItem(id)}
            backgroundColor={"brand"}
            alignItems="center"
            borderRadius={"xl"}
            justifyContent="center"
          >
            <Text
              color="white"
              fontSize="s"
              fontWeight="bold"
              adjustsFontSizeToFit={true}
            >
              {initials(
                capitalizeFirstLetter(
                  id == user?._id
                    ? `${user.firstName} ${user.lastName}`
                    : `${user.partner.firstName} ${user.partner.lastName}`
                )
              )}
            </Text>
          </Pressable>
          <Icon
            color={selected === id ? "success" : "gray4"}
            size="l"
            iconFamily="Ionicons"
            iconName="checkmark"
          />
        </Box>
      ))}
    </Box>
  );
};
export const useCurrentAppointementState = () =>
  useRecoilState(appointementType);

type AppointementsFormValue = {
  title: string | undefined;
  note: string | "";
  date: Date;
  type: string | undefined;
  user: string;
  forUser: string;
  shared: boolean;
  anonimize: boolean;
  eventId: string;
};

export const AddAppointementsScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "addAppointements">
> = ({ navigation, route }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<any>("");
  const refForm = useRef<any>(null);
  const modalRef = useRef<Modalize>(null);
  const queryClient = useQueryClient();
  const [type, setType] = useCurrentAppointementState();
  const isEditable = route?.params?.id != undefined;
  const { data, isLoading } = useGetUsersMe();
  const [response, requestPermission] = Calendar.useCalendarPermissions();
  const { t } = useTranslation();
  const create = usePostAppointments({
    onSuccess: async (data) => {
      navigation.goBack();
    },
    onError: (e) => {
      Alert.alert(
        t("alert.error.title", "Erreur"),
        t(
          "alert.error.500.message",
          "Une erreur technique est survenue,merci de réessayer ultérieurement."
        ),
        [
          {
            text: t("alert.error.500.button.ok", "Ok"),
            onPress: () => {
              Keyboard.dismiss();
            },
          },
        ]
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(getAppointmentsAll.key);
    },
  });
  const edit = usePutUsersEdit({
    onSuccess: () => {},
    onError: (e) => {
      console.log(e);
    },
    onSettled: () => {
      queryClient.invalidateQueries(getUsersMe.key);
    },
  });
  const update = usePutAppointmentsId({
    onSuccess: () => {
      Alert.alert(
        t("screen.my-info.title.success", "Votre informations a été modifiée."),
        "",
        [
          {
            text: t("alert.button.ok", "Ok"),
            onPress: () => {
              Keyboard.dismiss();
              navigation.goBack();
            },
          },
        ]
      );
    },
    onError: (e) => {
      Alert.alert(
        t("alert.error.title", "Erreur"),
        t(
          "alert.error.500.message",
          "Une erreur technique est survenue,merci de réessayer ultérieurement."
        ),
        [{ text: t("alert.error.500.button.ok", "Ok") }]
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(getAppointmentsAll.key);
      queryClient.invalidateQueries(getAppointmentsId.key);
    },
  });
  const query = useGetAppointmentsId(route?.params?.id, {
    onError: (err) => {},
    enabled: isEditable,
  });
  const getDefaultCalendarAndroid = async () => {
    try {
      let Calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT
      );
      return Calendars[0].id;
    } catch (error) {
      console.log("Error getDefaultCalendarAndroid", error);
    }
  };
  async function createEvent() {
    const values = refForm?.current?.values;
    const title = values.anonimize ? "Occupé" : values.title;
    try {
      let event_id = await Calendar.createEventAsync(values.calendarId, {
        title: title,
        startDate: dayjs(values.date).toISOString(),
        endDate: dayjs(values.date).add(1, "hour").toISOString(),
        notes: values.note,
      });
      return event_id;
    } catch (err) {
      console.log("Error create event ", err);
    }
  }
  async function updateEvent() {
    const values = refForm?.current?.values;
    const title = values.anonimize ? "Occupé" : values.title;

    try {
      await Calendar.updateEventAsync(values.eventId, {
        title: title,
        startDate: dayjs(values.date).toISOString(),
        endDate: dayjs(values.date).add(1, "hour").toISOString(),
        notes: values.note,
      });
    } catch (error) {
      console.log("Error update event", error);
    }
  }

  async function deleteEvent() {
    const values = refForm?.current?.values;
    try {
      await Calendar.deleteEventAsync(values.eventId);
    } catch (error) {
      console.log("Error deleteEvent", error);
    }
  }
  const onDelete = useDeleteAppointmentsId({
    onSuccess: async () => {
      navigation.goBack();
    },
    onError: (e) => {
      Alert.alert(
        t("alert.error.title", "Erreur"),
        t(
          "alert.error.500.message",
          "Une erreur technique est survenue,merci de réessayer ultérieurement."
        ),
        [{ text: t("alert.error.500.button.ok", "Ok") }]
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(getAppointmentsAll.key);
    },
  });

  useEffect(() => {
    if (query?.data?.data) {
      setDate(new Date(query?.data?.data.date));
    }
    if (type !== undefined) {
      refForm?.current?.setFieldValue("type", type?.label);
    }
  }, [query?.data?.data, type]);

  const onDeleteAppointement = () => {
    Alert.alert(
      t("screen.add-appointment.alert.title", "Supprimer"),
      t(
        "screen.add-appointment.alert.message",
        "Veux-tu vraiment supprimer le rendez-vous ?"
      ),
      [
        { text: t("common.button.cancel", "Annuler") },

        {
          text: t("screen.alert.delete-account.button.label", "SUPPRIMER"),
          style: "destructive",
          onPress: async () => {
            await deleteEvent();
            onDelete.mutate({
              id: route?.params.id,
            });
          },
        },
      ]
    );
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
    return response;
  };
  const onSubmit = async (
    values: AppointementsFormValue,
    formikHelpers: FormikHelpers<any>
  ) => {
    let typeValue = type ? type?.id : query?.data?.data.type;
    let forUser = values.forUser ? values.forUser : null;
    let eventId = values?.eventId ? values?.eventId : null;
    try {
      if (values.shared) {
        if (isEditable) {
          await updateEvent();
        } else {
          eventId = await createEvent();
        }
      }
      if (!isEditable) {
        create.mutate({
          requestBody: {
            date: values.date,
            title: values?.title,
            type: typeValue,
            note: values.note,
            forUser: forUser,
            shared: values.shared,
            calendarId: eventId,
            anonimize: values.anonimize,
          },
        });
      } else {
        update.mutate({
          id: route?.params?.id,
          requestBody: {
            date: values.date,
            title: values?.title,
            type: typeValue,
            forUser: forUser,
            note: values.note,
            shared: values.shared,
            calendarId: eventId,
            anonimize: values.anonimize,
          },
        });
      }
    } catch (err: any) {
      Alert.alert(
        t("screen.alert.my-info.error.title", "Validation"),
        err.errors[0],
        [{ text: t("alert.button.ok", "Ok") }]
      );
    }
  };

  const onSave = () => {
    let newDate: any = dayjs(date)
      .set("hour", dayjs(date).hour())
      .set("minute", dayjs(date).minute());
    refForm.current.setFieldValue("date", newDate);
    modalRef.current?.close();
  };
  const allowOwnerEdit: boolean = query?.data?.data?.user === data?.data?._id;

  const handleShowDatePicker = (mode) => {
    setMode(mode);
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: date,
        mode: mode,
        is24Hour: true,
        display: "spinner",
        onChange: handleDateTimeChanged,
      });
    } else {
      modalRef.current?.open();
    }
  };
  const getDefaultCalendar = async () => {
    let calendarId: string;
    if (Platform.OS === "android") {
      calendarId = await getDefaultCalendarAndroid();
    } else {
      calendarId = await getDefaultCalendarSource();
    }
    return calendarId;
  };
  const handlePermissionCalendar = async (value: boolean) => {
    let calendarId = null;
    if (!response?.granted) {
      let response = await askPermissionCalendar();
      if (response.granted) {
        calendarId = await getDefaultCalendar();
        refForm.current.setFieldValue("calendarId", calendarId);
      }
      refForm.current.setFieldValue("shared", value);
    } else {
      if (!refForm.current?.calendarId) {
        calendarId = await getDefaultCalendar();
        refForm.current.setFieldValue("calendarId", calendarId);
      }
      refForm.current.setFieldValue("shared", value);
    }
  };
  const handleDateTimeChanged = (event, newDate) => {
    if (Platform.OS === "android" && event.type == "dismissed") return;

    refForm.current.setFieldValue("date", newDate);
    setDate(newDate);
  };
  const validationSchema = useMemo(() => {
    return yup.object<any>({
      title: yup
        .string()
        .required(t("screen.input-require-error", "Ce champ est obligatoire")),
      type: yup
        .string()
        .required(t("screen.input-require-error", "Ce champ est obligatoire")),
    });
  }, []);
  if (query.isLoading) {
    return <BusyIndicator />;
  }
  return (
    <Screen flex={1} backgroundColor="grayBackground">
      <Formik<AppointementsFormValue>
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        innerRef={refForm}
        initialValues={{
          note: query.data?.data?.note ? query.data?.data?.note : "",
          forUser: query.data?.data?.forUser ? query.data?.data?.forUser : null,
          type:
            type !== undefined
              ? type?.label
              : query?.data?.data.type !== undefined
              ? t(`${types[query?.data?.data.type].key}`)
              : "",
          title: query.data?.data ? query.data?.data.title : "",
          date: query.data?.data ? query.data?.data.date : dayjs(),
          shared: query.data?.data?.shared,
          eventId: query.data?.data?.calendarId,
          calendarId: data?.data.calendarId,
          anonimize: query.data?.data?.anonimize ? true : false,
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
          } = props;
          return (
            <>
              <HeaderFormSubmit
                title={t("screen.appointements.title", "Rendez-vous")}
              />
              <Card
                paddingHorizontal="s"
                paddingVertical="s"
                withShadow={false}
              >
                {data?.data?.partner ? (
                  <>
                    <Box
                      my="s"
                      paddingHorizontal="s"
                      justifyContent="space-between"
                      flexDirection="row"
                    >
                      <Text variant="p2">
                        {t(
                          "screen.add-appointement.for.label",
                          "Rendez-vous pour"
                        )}
                      </Text>

                      <AvatarText
                        isDisabled={query?.data?.data && !allowOwnerEdit}
                        value={values?.forUser}
                        onSelect={(value: string) => {
                          refForm.current?.setFieldValue("forUser", value);
                        }}
                        user={data?.data}
                      />
                    </Box>
                    <Divider />
                  </>
                ) : null}

                <Input
                  autoCorrect={false}
                  isFullWidth
                  isDisabled={query?.data?.data && !allowOwnerEdit}
                  clearButtonMode="while-editing"
                  paddingHorizontal="n"
                  my="n"
                  placeholder={t(
                    "screen.add-appointement.title.placeholder",
                    "Titre"
                  )}
                  justifyContent="center"
                  alignItems="center"
                  borderWidth={0}
                  value={values.title}
                  onChangeText={handleChange("title")}
                />
                {errors.title != undefined && touched.title ? (
                  <Text mx="s" color="danger" fontSize="xs">
                    {errors.title}
                  </Text>
                ) : null}

                <Divider />

                <InputPicker
                  isDisabled={query?.data?.data && !allowOwnerEdit}
                  variant="p2"
                  containerProps={{
                    paddingHorizontal: "s",
                    paddingVertical: "s",
                  }}
                  label={"Type"}
                  value={values.type}
                  onPress={() => {
                    if (route?.params?.id) {
                      navigation.navigate("typesAppointement", {
                        typeId: query?.data?.data.type,
                      });
                    } else {
                      navigation.navigate("typesAppointement");
                    }
                  }}
                ></InputPicker>
                {errors.type != undefined && touched.type ? (
                  <Text mx="s" color="danger" fontSize="xs">
                    {errors.type}
                  </Text>
                ) : null}
                <Divider />

                <InputPicker
                  variant="p2"
                  isDisabled={query?.data?.data && !allowOwnerEdit}
                  containerProps={{
                    paddingHorizontal: "s",
                    paddingVertical: "s",
                  }}
                  label={"Date"}
                  value={dayjs(values.date).locale(i18n.language).format("ll")}
                  onPress={() => {
                    handleShowDatePicker("date");
                  }}
                />
                {errors.date != undefined && touched.date ? (
                  <Text mx="s" color="danger" fontSize="xs">
                    {errors.date}
                  </Text>
                ) : null}
                <Divider />

                <InputPicker
                  variant="p2"
                  isDisabled={query?.data?.data && !allowOwnerEdit}
                  containerProps={{
                    paddingHorizontal: "s",
                    paddingVertical: "s",
                  }}
                  label={t("screen.add-appointement.hour.select", "Heure")}
                  value={dayjs(values.date).format("HH:mm")}
                  onPress={() => {
                    handleShowDatePicker("time");
                  }}
                />
              </Card>
              <Card marginVertical="s" withShadow={false}>
                <Input
                  autoCorrect={false}
                  isDisabled={query?.data?.data && !allowOwnerEdit}
                  isFullWidth
                  placeholder={"Notes"}
                  height={100}
                  multiline
                  clearButtonMode="while-editing"
                  value={values.note}
                  borderWidth={0}
                  padding={0}
                  autoCapitalize="none"
                  onChangeText={handleChange("note")}
                />
              </Card>
              <Card
                paddingVertical="s"
                paddingHorizontal="m"
                withShadow={false}
              >
                <CardLabelSwitch
                  disabled={query?.data?.data && !allowOwnerEdit}
                  value={values?.shared}
                  label={t(
                    "screen.add-appointment.to-my-calendar.label",
                    "Rendez-vous"
                  )}
                  toggleSwitch={(value) => {
                    handlePermissionCalendar(value);
                  }}
                />
                {values?.shared && (
                  <CardLabelSwitch
                    value={values.anonimize}
                    label={t(
                      "screen.add-appointment.anonymize.label",
                      "Anonymiser"
                    )}
                    toggleSwitch={(value) =>
                      refForm.current.setFieldValue("anonimize", value)
                    }
                  />
                )}
              </Card>
            </>
          );
        }}
      </Formik>

      {query.data?.data && allowOwnerEdit ? (
        <Box justifyContent="center" flexDirection="row">
          <TextLink
            variant="danger"
            onPress={onDeleteAppointement}
            alignItems="center"
          >
            {t(
              "screen.add-appointment.link.delete",
              "Supprimer le rendez-vous"
            )}
          </TextLink>
        </Box>
      ) : null}

      <Portal>
        <Modalize
          ref={modalRef}
          scrollViewProps={{ showsVerticalScrollIndicator: false }}
          snapPoint={310}
          withHandle={false}
        >
          <Box>
            <DateTimePicker
              testID="dateTimePicker"
              themeVariant="light"
              value={date}
              mode={mode}
              locale={i18n.language}
              is24Hour={true}
              display="spinner"
              onChange={handleDateTimeChanged}
            />
            <Button
              isFullWidth
              variant="primary"
              marginHorizontal={"m"}
              onPress={onSave}
            >
              {t("button.save", "Enregistrer")}
            </Button>
          </Box>
        </Modalize>
      </Portal>
    </Screen>
  );
};
