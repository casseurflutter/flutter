import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { Box, Button, Icon, Pressable, Screen, Text, TextLink } from "pearl-ui";
import React, { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";

import { NavigatorParamList } from "~navigation";

import i18n from "../../../i18n/i18n";
import { Stepper } from "../../components/Stepper";
import { H2 } from "../../components/Text";
import { useCurrentMedicationState } from "./AddMedication";
import { types } from "./TypeMedication";
const enum TimeOfDayType {
  MORNING = 1,
  NOON = 2,
  EVENING = 3,
}
export const DosageScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "dosages">
> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useCurrentMedicationState();
  const [dosage, setDosage] = useState<any>({
    timeOfDay: value?.timeOfDay,
    quantity: value?.quantity,
    type: types.find((item) => item.id == value?.type),
  });
  let modalRef = useRef(null);
  useEffect(() => {
    if (route?.params?.isEditable) {
      setDosage({
        timeOfDay: route?.params.timeOfDay,
        quantity: route?.params?.quantity,
        type: types.find((item) => item.id == route?.params?.type),
      });
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: t("screen.add-medication.dosage.label", "Posologie"),
      headerStyle: {
        backgroundColor: "#2FB0ED",
      },
      headerRight: () => (
        <TextLink onPress={() => onSave()} variant="save">
          {t("common.button.save", "Enregistrer")}
        </TextLink>
      ),
      headerTintColor: "white",
    });
  }, [dosage]);
  const onSave = () => {
    setValue({
      ...value,
      timeOfDay: dosage.timeOfDay,
      quantity: dosage.quantity,
    });
    navigation.goBack();
  };
  const handleValueChange = (value: string) => {
    setDosage({
      ...dosage,
      quantity: value,
    });
  };
  const handleTimeOfDay = (id: number) => {
    let day: string = null;
    let currentDate = null;

    if (id == TimeOfDayType.MORNING) {
      setDate(dayjs().set("hour", 6).set("minute", 0).toDate());
      currentDate = dayjs().set("hour", 6).set("minute", 0).toDate();
      day = t("screen.dosage.morning.label", "Matin");
    } else if (id == TimeOfDayType.NOON) {
      setDate(dayjs().set("hour", 12).set("minute", 0).toDate());
      currentDate = dayjs().set("hour", 12).set("minute", 0).toDate();

      day = t("screen.dosage.afternoon.label", "Midi");
    } else {
      setDate(
        dayjs().set("hour", 18).set("minute", 0).set("second", 0).toDate()
      );
      currentDate = dayjs()
        .set("hour", 18)
        .set("minute", 0)
        .set("second", 0)
        .toDate();

      day = t("screen.dosage.night.label", "Soir");
    }
    setDosage({
      ...dosage,
      timeOfDay: {
        name: day,
        id,
      },
    });
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        themeVariant: "white",
        value: currentDate,
        mode: "time",
        locale: i18n.language,
        is24Hour: false,
        display: "spinner",
        onChange: (event, date) => handleDateOnChange(event, date, day, id),
      });
    } else {
      modalRef.current?.open();
    }
  };
  const handleDateOnChange = (
    event,
    selectedDate: Date,
    day: string,
    id: string
  ) => {
    const currentDate = selectedDate || date;

    if (Platform.OS === "android") {
      setDosage({
        ...dosage,
        timeOfDay: {
          name: day,
          id: id,
          time: {
            hour: dayjs(currentDate).utc(true).get("hour"),
            minute: dayjs(currentDate).utc(true).get("minute"),
          },
        },
      });
    } else {
      setDate(currentDate);
    }
  };
  const handleModale = () => {
    setDosage({
      ...dosage,
      timeOfDay: {
        ...dosage.timeOfDay,
        time: {
          hour: dayjs(date).utc(true).get("hour"),
          minute: dayjs(date).utc(true).get("minute"),
        },
      },
    });
    modalRef.current?.close();
  };
  return (
    <Screen bg="athensGray">
      <Box my="xl" justifyContent="center" flexDirection="row">
        <Pressable
          borderColor={
            dosage?.timeOfDay?.id == TimeOfDayType.MORNING ? "bleu" : "white"
          }
          borderWidth={1}
          onPress={() => handleTimeOfDay(TimeOfDayType.MORNING)}
          w={100}
          alignItems="center"
          borderRadius="m"
          p="m"
          bg="white"
        >
          <Icon
            color="blueNavigation"
            size="xl"
            iconFamily="Ionicons"
            iconName="time-outline"
          />
          <Text fontSize="s" color="blueNavigation">
            {t("screen.dosage.morning.label", "Matin")}
          </Text>
        </Pressable>
        <Pressable
          w={100}
          borderColor={
            dosage?.timeOfDay?.id == TimeOfDayType.NOON ? "bleu" : "white"
          }
          borderWidth={1}
          onPress={() => handleTimeOfDay(TimeOfDayType.NOON)}
          alignItems="center"
          mx="m"
          borderRadius="m"
          p="m"
          bg="white"
        >
          <Icon
            color="blueNavigation"
            size="xl"
            iconFamily="Ionicons"
            iconName="sunny-outline"
          />

          <Text fontSize="s" color="blueNavigation">
            {t("screen.dosage.afternoon.label", "Midi")}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleTimeOfDay(TimeOfDayType.EVENING)}
          w={100}
          borderColor={
            dosage?.timeOfDay?.id == TimeOfDayType.EVENING ? "bleu" : "white"
          }
          borderWidth={1}
          alignItems="center"
          borderRadius="m"
          p="m"
          bg="white"
        >
          <Icon
            color="blueNavigation"
            size="xl"
            iconFamily="Ionicons"
            iconName="moon-outline"
          />
          <Text fontSize="s" color="blueNavigation">
            {t("screen.dosage.night.label", "Soir")}
          </Text>
        </Pressable>
      </Box>
      <Box p="m" borderRadius="m" bg="white">
        {dosage?.timeOfDay?.time ? (
          <Box justifyContent="center" mt="s" flexDirection="row">
            <H2 color="blueNavigation">
              {dayjs()
                .hour(dosage?.timeOfDay?.time.hour)
                .minute(dosage?.timeOfDay?.time.minute)
                .format("HH:mm")}
            </H2>
          </Box>
        ) : null}
        {dosage?.type ? (
          <Box>
            <Text fontWeight="semibold" my="s" color="gray8" variant="p1">
              {t("screen.add-medication.type.label", "Type d’administration")}
            </Text>
            <Text fontWeight="semibold" color="blueNavigation" variant="p2">
              {t(`${dosage?.type?.name}`)}
            </Text>
          </Box>
        ) : null}

        <Box>
          <Box my="m">
            <Text fontWeight="semibold" my="s" color="gray8" variant="p1">
              {t("screen.dosage.quantity.label", "Quantité")}
            </Text>
            <Box alignItems="center">
              <Stepper
                initialValue={dosage?.quantity}
                onValueChange={handleValueChange}
              />
            </Box>
          </Box>

          <Text
            textAlign="center"
            fontWeight="semibold"
            color="blueNavigation"
            variant="p1"
          >
            {t(`${dosage?.type?.form}`)}
          </Text>
        </Box>
      </Box>
      <Portal>
        <Modalize
          ref={modalRef}
          scrollViewProps={{ showsVerticalScrollIndicator: false }}
          snapPoint={300}
          withHandle={false}
        >
          <DateTimePicker
            testID="dateTimePicker"
            themeVariant="light"
            value={date || new Date()}
            locale={i18n.language}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={handleDateOnChange}
          />
          <Button
            isFullWidth
            variant="primary"
            marginHorizontal={"m"}
            onPress={handleModale}
          >
            {t("common.button.save", "Enregistrer")}
          </Button>
        </Modalize>
      </Portal>
    </Screen>
  );
};
