import { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { Formik, FormikHelpers, useFormikContext } from "formik";
import { t } from "i18next";
import _ from "lodash";
import { Box, Divider, Screen, Text, TextLink } from "pearl-ui";
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Alert, Keyboard, Linking, Pressable } from "react-native";
import OneSignal from "react-native-onesignal";
import { useQueryClient } from "react-query";
import { atom, useRecoilState } from "recoil";
import * as yup from "yup";

import {
  BusyIndicator,
  Card,
  CardLabelSwitch,
  CardLabelValue,
  Input,
} from "~components";
import { NavigatorParamList } from "~navigation";
import { getDefaultCalendar } from "~utils";

import {
  useDeleteMedicationsId,
  useGetMedicationsId,
  useGetUsersMe,
  usePostMedications,
  usePutMedicationsId,
  usePutUsersEdit,
} from "../../api/hooks";
import { getMedicationsAll, getUsersMe } from "../../api/services";
import * as Calendar from "../../utils/calendar";
import { periodicity } from "./DateMedication";
import { types } from "./TypeMedication";

export type Medication = {
  choice: {
    id: string;
    name: string;
  };
  type: number;
  startDate: string;
  endDate: string;
  dateRange: {
    [date: string]: {
      color: string;
      selected: boolean;
      startingDay: boolean;
      endingDay?: boolean;
    };
  };
  timeOfDay: {
    id: number;
    name: string;
    time: {
      hour: number;
      minute: number;
    };
  };
  quantity: string;
  periodicity: number;
};
export const medications = atom<Medication | undefined>({
  key: "medication", // unique ID (with respect to other atoms/selectors)
  default: undefined,
});

const AutoSave = ({ debounceMs = 1000 }) => {
  const formik = useFormikContext();
  const debouncedSubmit = useCallback(
    _.debounce(formik.submitForm, debounceMs),
    [formik.submitForm, debounceMs]
  );

  useEffect(() => {
    formik.dirty && debouncedSubmit();
  }, [debouncedSubmit, formik.dirty, formik.values]);

  return null;
};

export const useCurrentMedicationState = () => useRecoilState(medications);

export const AddMedicationScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "addMedication">
> = ({ navigation, route }) => {
  const refForm = useRef(null);
  const [medication, setMedication] = useRecoilState(medications);
  const [autoSave, setAutoSave] = useState(false);
  const [response, requestPermission] = Calendar.useCalendarPermissions();
  const { data } = useGetUsersMe();

  const queryClient = useQueryClient();
  const isEditable = route?.params?.id != undefined;
  const edit = usePutUsersEdit({
    onSuccess: () => {},
    onError: (e) => {
      console.log(e);
    },
    onSettled: () => {
      queryClient.invalidateQueries(getUsersMe.key);
    },
  });
  const create = usePostMedications({
    onSuccess: (data) => {
      Alert.alert(
        t(
          "screen.alert-add-medication.success.title",
          "Ton médicament a été ajouté."
        ),
        "",
        [
          {
            text: "Ok",
            onPress: () => {
              navigation.setParams({
                id: data?.data?._id,
              });
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
      setMedication(undefined);
      queryClient.invalidateQueries(getMedicationsAll.key);
    },
  });
  const update = usePutMedicationsId({
    onSuccess: (data) => {
      Alert.alert(
        t(
          "screen.alert-update-medication.success.title",
          "Ton médicament a été modifiée"
        ),
        "",
        [
          {
            text: "Ok",
            onPress: () => {
              Keyboard.dismiss();
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
      queryClient.invalidateQueries(getMedicationsAll.key);
    },
  });
  const onDelete = useDeleteMedicationsId({
    onSuccess: () => {
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
      queryClient.invalidateQueries(getMedicationsAll.key);
    },
  });

  const query = useGetMedicationsId(route?.params?.id, {
    onError: (err) => {
      console.log("err", err);
    },
    enabled: isEditable,
  });

  useEffect(() => {
    return () => {
      setMedication(undefined);
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: t("screen.medication.title", "Médicament"),
      headerStyle: {
        backgroundColor: "#2FB0ED",
      },
      headerTintColor: "white",
    });
    if (query?.data?.data || medication) {
      if (medication?.choice || query?.data?.data.choice) {
        refForm?.current?.setFieldValue(
          "choice",
          medication?.choice
            ? medication?.choice.name
            : query?.data?.data.choice?.name
        );
      }
      if (medication?.type || query?.data?.data.type) {
        let idMedication: number = medication?.type
          ? medication?.type
          : query?.data?.data.type;
        refForm?.current?.setFieldValue(
          "type",
          t(types.find((item) => item.id == idMedication)?.name)
        );
      }
      if (medication?.periodicity) {
        refForm?.current?.setFieldValue(
          "periodicity",
          medication?.periodicity
            ? medication?.periodicity
            : query?.data?.data.periodicity
        );
      }
      if (medication?.timeOfDay || query?.data?.data.timeOfDay) {
        refForm?.current?.setFieldValue(
          "timeOfDay",
          medication?.timeOfDay
            ? medication?.timeOfDay
            : query?.data?.data.timeOfDay
        );
        refForm?.current?.setFieldValue(
          "quantity",
          medication?.quantity
            ? medication?.quantity
            : query?.data?.data.quantity
        );
      }

      if (medication?.dateRange || query?.data?.data.dateRange) {
        let period = medication?.periodicity || query?.data?.data.periodicity;
        let dataRanges = medication?.dateRange || query?.data?.data.dateRange;

        if (period == 2 || period == 3) {
          refForm?.current?.setFieldValue(
            "startDate",
            t(periodicity[period - 1].name)
          );
          refForm?.current?.setFieldValue("dateRange", dataRanges);
          refForm?.current?.setFieldValue("endDate", null);
        } else {
          if (Object.keys(dataRanges).length == 1) {
            refForm?.current?.setFieldValue(
              "startDate",
              dayjs(Object.keys(dataRanges)[0]).format("DD/MM/YYYY")
            );
            refForm?.current?.setFieldValue("endDate", null);
          } else {
            refForm?.current?.setFieldValue(
              "startDate",
              dayjs(Object.keys(dataRanges)[0]).format("DD/MM/YYYY")
            );
            refForm?.current?.setFieldValue(
              "endDate",
              dayjs(Object.keys(dataRanges)[1]).format("DD/MM/YYYY")
            );
          }
          refForm?.current?.setFieldValue("dateRange", dataRanges);
        }
      }
    }
  }, [medication, query]);
  async function createNotification() {
    const values = refForm?.current?.values;
    const { userId } = await OneSignal.getDeviceState();
    let date =
      values.periodicity == 1
        ? dayjs(values.startDate, "DD/MM/YYYY").toISOString()
        : Object.keys(values.dateRange)[0];

    const notificationObj = {
      contents: { en: values.title },
      include_player_ids: [userId],
      send_after: date,
    };

    const jsonString = JSON.stringify(notificationObj);

    OneSignal.postNotification(
      jsonString,
      (success) => {
        console.log("Success:", success);
      },
      (error) => {
        console.log("Error:", error);
      }
    );
  }
  async function createEvent() {
    const values = refForm?.current?.values;
    let period = medication?.periodicity || query?.data?.data.periodicity;
    const title = values.anonimize ? "Occupé" : values.title;
    let dates = Object.keys(values.dateRange).sort();

    let recurrenceRule = {
      interval: 1,
      frequency:
        period === 1
          ? Calendar.Frequency.DAILY
          : period === 2
          ? Calendar.Frequency.WEEKLY
          : Calendar.Frequency.MONTHLY,
    };
    let startDate = dayjs(dates[0])
      .set("hour", values.timeOfDay?.time?.hour)
      .set("minute", values.timeOfDay?.time?.minute)
      .toISOString();
    let endDate = dayjs(dates.slice(-1)[0])
      .set("hour", values.timeOfDay?.time?.hour)
      .set("minute", values.timeOfDay?.time?.minute)
      .toISOString();
    if (period === 3) {
      recurrenceRule.daysOfTheMonth = [dayjs(dates[0]).format("DD")];
    }
    if (period === 1) {
      recurrenceRule.endDate = endDate;
    }

    try {
      let event_id = await Calendar.createEventAsync(values.calendarId, {
        title: title,
        startDate: startDate,
        endDate: startDate,
        allDay: false,
        notes: values.note,
        recurrenceRule: recurrenceRule,
      });
      return event_id;
    } catch (err) {
      console.log("Error while creating an event", err);
    }
  }
  async function updateEvent() {
    const values = refForm?.current?.values;
    const title = values.anonimize ? "Occupé" : values.title;
    let period = medication?.periodicity || query?.data?.data.periodicity;
    let dates = Object.keys(values.dateRange).sort();
    let recurrenceRule = {
      interval: 1,
      frequency:
        period === 1
          ? Calendar.Frequency.DAILY
          : period === 2
          ? Calendar.Frequency.WEEKLY
          : Calendar.Frequency.MONTHLY,
    };
    let startDate = dayjs(dates[0])
      .set("hour", values.timeOfDay?.time?.hour)
      .set("minute", values.timeOfDay?.time?.minute)
      .toISOString();
    let endDate = dayjs(dates.slice(-1)[0])
      .set("hour", values.timeOfDay?.time?.hour)
      .set("minute", values.timeOfDay?.time?.minute)
      .toISOString();
    if (period === 3) {
      recurrenceRule.daysOfTheMonth = [dayjs(dates[0]).format("DD")];
    }
    if (period === 1) {
      recurrenceRule.endDate = endDate;
    }

      try {
        await Calendar.updateEventAsync(
          values.eventId,
          {
            title: title,
            startDate: startDate,
            endDate: startDate,
            notes: values.note,
            allDay: false,
            recurrenceRule: recurrenceRule,
          },
          {
            futureEvents: true,
          }
        );
      } catch (error) {
        console.log("err", error);
      }
  }
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
  const createOrUpdateMedication = async (values: any) => {
    let eventId = null;
    const choice = medication?.choice
      ? medication?.choice._id
      : query?.data?.data.choice._id;
    const type = medication?.type ? medication?.type : query?.data?.data.type;
    try {
      if (values.shared) {
        if (values?.eventId) {
          await updateEvent();
        } else {
          eventId = await createEvent();
        }
      }
      createNotification();
      if (!isEditable) {
        create.mutate({
          requestBody: {
            choice: choice,
            title: values?.title,
            type: type,
            dateRange: values?.dateRange,
            periodicity: values.periodicity,
            timeOfDay: values.timeOfDay,
            quantity: values.quantity,
            alarm: values.alarm,
            code: values.code,
            calendarId: eventId,
            note: values.note,
            shared: values.shared,
            anonimize: values.anonimize,
          },
        });
      } else {
        update.mutate({
          id: route?.params?.id,
          requestBody: {
            choice: choice,
            title: values?.title,
            type: type,
            dateRange: values?.dateRange,
            periodicity: values.periodicity,
            timeOfDay: values.timeOfDay,
            quantity: values.quantity,
            alarm: values.alarm,
            code: values.code,
            calendarId: values?.eventId,
            note: values.note,
            shared: values.shared,
            anonimize: values.anonimize,
          },
        });
      }
    } catch (err: any) {
      if (err.errors.length > 0) {
        Alert.alert(
          t("screen.alert.my-info.error.title", "Validation"),
          err.errors[0],
          [{ text: t("alert.button.ok", "Ok") }]
        );
      }
    }
  };

  const onSubmit = async (values: any, formikHelpers: FormikHelpers<any>) => {
    if (!autoSave && route?.params?.id) {
      setAutoSave(true);
    } else {
      await createOrUpdateMedication(values);
    }
  };
  async function deleteEvent() {
    try {
      await Calendar.deleteEventAsync(refForm?.current?.values.eventId, {
        futureEvents: true,
      });
    } catch (error) {
      console.log("Error deleteEvent ", error);
    }
  }
  const handleDelete = () => {
    Alert.alert(
      t("screen.add-appointment.alert.title", "Supprimer"),
      t(
        "screen.add-medication.alert.message",
        "Souhaitez-tu réellement supprimer le médicament ?"
      ),
      [
        { text: t("common.button.cancel", "Annuler") },

        {
          text: t("screen.alert.delete-account.button.label", "SUPPRIMER"),
          style: "destructive",
          onPress: async () => {
            if (refForm?.current?.values?.calendarId) {
              await deleteEvent();
            }
            onDelete.mutate({
              id: route?.params.id,
            });
          },
        },
      ]
    );
  };
  const validationSchema = useMemo(() => {
    return yup.object<any>({
      title: yup
        .string()
        .required(t("screen.input-require-error", "Ce champ est obligatoire")),
      choice: yup
        .string()
        .required(t("screen.input-require-error", "Ce champ est obligatoire")),
      type: yup
        .string()
        .required(t("screen.input-require-error", "Ce champ est obligatoire")),
      dateRange: yup
        .object()
        .label("Date")
        .required(t("screen.input-require-error", "Ce champ est obligatoire")),
      timeOfDay: yup
        .object()
        .required(t("screen.input-require-error", "Ce champ est obligatoire")),
    });
  }, []);
  if (query.isLoading || query.isFetching) {
    return (
      <Screen backgroundColor="bleuClair">
        <BusyIndicator />
      </Screen>
    );
  }

  type MedicationFormValue = {
    choice: number | undefined;
    type: number | undefined;
    title: string;
    startDate: string;
    date: string;
    endDate: string;
    dateRange: Object | undefined;
    timeOfDay: Object | undefined;
    quantity: string;
    periodicity: number;
    code: string;
    note: string;
    calendarId: string;
    anonimize: boolean;
    shared: boolean;
    alarm: Object;
    autosave: boolean;
  };
  return (
    <Screen flex={1} backgroundColor="athensGray">
      <Formik<MedicationFormValue>
        onSubmit={onSubmit}
        innerRef={refForm}
        validateOnChange
        validationSchema={validationSchema}
        enableReinitialize={isEditable}
        initialValues={{
          title: query?.data?.data?.title ? query?.data?.data?.title : "",
          choice: undefined,
          code: query?.data?.data?.code ? query?.data?.data?.code : "",
          note: query?.data?.data?.note ? query?.data?.data?.note : "",
          dateRange: query?.data?.data?.dateRange
            ? query?.data?.data?.dateRange
            : undefined,
          startDate: "",
          endDate: "",
          eventId: query.data?.data?.calendarId,
          calendarId: data?.data.calendarId,
          timeOfDay: query?.data?.data?.timeOfDay
            ? query?.data?.data?.timeOfDay
            : undefined,
          quantity: query?.data?.data?.quantity
            ? query?.data?.data?.quantity
            : "",
          type: query?.data?.data?.type ? query?.data?.data?.type : undefined,
          alarm: {
            reminder: query?.data?.data?.alarm.reminder
              ? query?.data?.data?.alarm.reminder
              : false,
            notification: query?.data?.data?.alarm.notification
              ? query?.data?.data?.alarm.notification
              : false,
          },
          periodicity: query?.data?.data?.periodicity
            ? query?.data?.data?.periodicity
            : 0,
          shared: query.data?.data?.shared,
          anonimize: query?.data?.data?.anonimize,
        }}
      >
        {({
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          errors,
          dirty,
          values,
          touched,
        }) => {
          return (
            <>
              <AutoSave debounceMs={900} />
              <Card withShadow={false}>
                <CardLabelValue
                  error={errors.choice != undefined && touched.choice}
                  errorMessage={errors.choice}
                  containerProps={{
                    paddingHorizontal: "m",
                  }}
                  label={t(
                    "screen.add-medication.choice.label",
                    "Choix du médicament"
                  )}
                  value={
                    values.choice
                      ? values.choice
                      : t("common.select.label", "Choisir")
                  }
                  onPress={() => {
                    navigation.navigate("choiceMedication", {
                      id: medication?.choice
                        ? medication?.choice._id
                        : query.data?.data?.choice._id,
                    });
                  }}
                />
                <Divider />
                <Input
                  name="title"
                  autoCorrect={false}
                  placeholder={t("screen.add-medication.title.label", "Titre")}
                  isFullWidth
                  value={values.title}
                  autoCapitalize="none"
                />

                <Divider />
                <CardLabelValue
                  error={errors.type != undefined && touched.type}
                  errorMessage={errors.type}
                  containerProps={{
                    paddingHorizontal: "m",
                  }}
                  label={t(
                    "screen.add-medication.type.label",
                    "Type d’administration"
                  )}
                  value={
                    values.type
                      ? values.type
                      : t("common.select.label", "Choisir")
                  }
                  onPress={() => {
                    if (query?.data?.data?.type || medication?.type) {
                      navigation.navigate("typeMedication", {
                        type: query?.data?.data?.type || medication?.type,
                      });
                    } else {
                      navigation.navigate("typeMedication");
                    }
                  }}
                />
                <Divider />
                <Box
                  paddingVertical={"m"}
                  paddingHorizontal={"m"}
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Box mr="s">
                    <Text variant="p2">
                      {t("screen.add-medication.date.label", "Date")}
                    </Text>
                    {errors.dateRange != undefined && touched.dateRange ? (
                      <Text color="danger" fontSize="xs">
                        {errors.dateRange}
                      </Text>
                    ) : null}
                  </Box>
                  <Box>
                    <TextLink
                      variant="primary"
                      onPress={() => {
                        let period =
                          medication?.periodicity ||
                          query?.data?.data.periodicity;
                        if (period == 1) {
                          navigation.navigate("dateMedication", {
                            startDate: values.startDate,
                            endDate: values.endDate,
                            periodicity: values.periodicity,
                            isEditable: isEditable,
                          });
                        } else if (period == 2 || period == 3) {
                          navigation.navigate("dateMedication", {
                            startDate: Object.keys(values.dateRange)[0],
                            periodicity: values.periodicity,
                            isEditable: isEditable,
                          });
                        } else {
                          navigation.navigate("dateMedication");
                        }
                      }}
                    >
                      {values.startDate && !values.endDate
                        ? values.startDate
                        : values.startDate && values.endDate
                        ? t(
                            "screen.add-medication.date",
                            "Du {{startDate}} au {{endDate}}",
                            {
                              startDate: values.startDate,
                              endDate: values.endDate,
                            }
                          )
                        : t("common.select.label", "Choisir")}
                    </TextLink>
                  </Box>
                </Box>

                <Divider />
                <CardLabelValue
                  disabled={values.type == undefined}
                  error={errors.timeOfDay != undefined && touched.timeOfDay}
                  errorMessage={errors.timeOfDay}
                  containerProps={{
                    paddingHorizontal: "m",
                  }}
                  label={t("screen.add-medication.dosage.label", "Posologie")}
                  value={
                    values?.timeOfDay?.time
                      ? t(
                          "screen.add-medication.dosage.time",
                          "{{name}} à {{time}}",
                          {
                            name: values?.timeOfDay?.name,
                            time: dayjs()
                              .hour(values?.timeOfDay?.time?.hour)
                              .minute(values?.timeOfDay?.time?.minute)
                              .format("HH:mm"),
                          }
                        )
                      : t("common.select.label", "Choisir")
                  }
                  onPress={() => {
                    navigation.navigate("dosages", {
                      isEditable: isEditable,
                      type: medication?.type
                        ? medication?.type
                        : query?.data?.data?.type,
                      timeOfDay: values.timeOfDay,
                      quantity: values.quantity,
                    });
                  }}
                />
                <Divider />
                <Box
                  paddingVertical={"m"}
                  paddingHorizontal={"m"}
                  justifyContent="space-between"
                  flexDirection="row"
                >
                  <Box mr="s">
                    <Text variant="p2">
                      {t("screen.add-medication.alarm.label", "Alarme")}
                    </Text>
                  </Box>
                  <Box>
                    <Box flexDirection="row">
                      <Pressable
                        onPress={() => {
                          refForm?.current?.setFieldValue(
                            "alarm.notification",
                            false
                          );
                          refForm?.current?.setFieldValue(
                            "alarm.reminder",
                            !values.alarm.reminder
                          );
                        }}
                      >
                        <Text
                          mr="s"
                          fontWeight="medium"
                          color={
                            values?.alarm?.reminder ? "blueNavigation" : "gray4"
                          }
                          variant="p2"
                        >
                          {t("screen.add-medication.reminder.label", "Rappel")}
                        </Text>
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          refForm?.current?.setFieldValue(
                            "alarm.reminder",
                            false
                          );
                          refForm?.current?.setFieldValue(
                            "alarm.notification",
                            !values.alarm.notification
                          );
                        }}
                      >
                        <Text
                          color={
                            values.alarm.notification
                              ? "blueNavigation"
                              : "gray4"
                          }
                          fontWeight="medium"
                          variant="p2"
                        >
                          {t(
                            "screen.add-medication.notification.label",
                            "Notification"
                          )}
                        </Text>
                      </Pressable>
                    </Box>
                  </Box>
                </Box>
                <Divider />

                <Input
                  autoCorrect={false}
                  placeholder={t(
                    "screen.add-medication.code.label",
                    "Nom de code"
                  )}
                  name="code"
                  isFullWidth
                  value={values.code}
                  autoCapitalize="none"
                />
              </Card>
              <Card my="m" withShadow={false}>
                <Input
                  name="note"
                  isFullWidth
                  placeholder={"Note"}
                  placeholderTextColor={"gray5"}
                  focusBorderColor={"transparent"}
                  multiline
                  numberOfLines={10}
                  minHeight={100}
                />
              </Card>
              <Card
                paddingVertical="s"
                paddingHorizontal="m"
                withShadow={false}
              >
                <CardLabelSwitch
                  //  disabled={query?.data?.data && !allowOwnerEdit}
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
                  <>
                    <Divider />
                    <CardLabelSwitch
                      value={values.anonimize}
                      label={t(
                        "screen.add-appointment.anonymize.label",
                        "Anonymiser"
                      )}
                      toggleSwitch={(value) =>
                        refForm?.current?.setFieldValue("anonimize", value)
                      }
                    />
                  </>
                )}
              </Card>
              {isEditable ? (
                <Box justifyContent="center" flexDirection="row">
                  <TextLink
                    onPress={handleDelete}
                    variant="danger"
                    alignItems="center"
                  >
                    {t(
                      "screen.add-medication.link.delete",
                      "Supprimer le médicament"
                    )}
                  </TextLink>
                </Box>
              ) : null}
            </>
          );
        }}
      </Formik>
    </Screen>
  );
};
