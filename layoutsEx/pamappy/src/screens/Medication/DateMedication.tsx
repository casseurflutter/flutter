import { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { startCase } from "lodash";
import {
  Box,
  Divider,
  Icon,
  Pressable,
  Screen,
  Text,
  TextLink,
} from "pearl-ui";
import React, { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar } from "react-native-calendars";

import { Card, RowItem } from "~components";
import { NavigatorParamList } from "~navigation";

import { useCurrentMedicationState } from "./AddMedication";
export let periodicity = [
  {
    id: 1,
    name: "screen.medication.periodicity.label.1",
  },
  {
    id: 2,
    name: "screen.medication.periodicity.label.2",
  },
  {
    id: 3,
    name: "screen.medication.periodicity.label.3",
  },
];
export const DateMedicationScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "dateMedication">
> = ({ navigation, route }) => {
  const [value, setValue] = useCurrentMedicationState();
  const [currentDate, setCurrentDate] = useState<Date | string>(new Date());
  const calendarRef = useRef<Calendar>(null);
  const { t } = useTranslation();
  const [startDay, setStartDay] = useState(null);
  const [endDay, setEndDay] = useState(null);
  const [data, setData] = useState<any>({
    dateRange: value?.dateRange ? value?.dateRange : {},
    periodicity: value?.periodicity ? value?.periodicity : 1,
  });
  useEffect(() => {
    if (route?.params?.isEditable) {
      if (route?.params.periodicity === 1) {
        let startDate = dayjs(route?.params?.startDate, "DD/MM/YYYY").format(
          "YYYY-MM-DD"
        );
        let endDate = dayjs(route?.params?.endDate, "DD/MM/YYYY").format(
          "YYYY-MM-DD"
        );

        let ranges = createDateRange(startDate, endDate);
        setData({
          dateRange: ranges,
          periodicity: route?.params?.periodicity,
        });
      } else {
        let ranges = createDateRangeWeekly(
          route?.params.startDate,
          route?.params?.periodicity
        );
        setData({
          dateRange: ranges,
          periodicity: route?.params?.periodicity,
        });
      }
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: "Date",
      headerStyle: {
        backgroundColor: "#2FB0ED",
      },
      headerTintColor: "white",
      headerRight: () => (
        <TextLink
          justifyContent="center"
          h={30}
          onPress={() => onSave()}
          variant="save"
        >
          {t("common.button.save", "Enregistrer")}
        </TextLink>
      ),
    });
  }, [data]);

  let createDateRangeWeekly = (day: Date, periodicity: number) => {
    let dates = {};

    if (periodicity == 2) {
      let recurrence = dayjs(day)
        .recur(dayjs(day).add(6, "month"))
        .every(7, "days");
      recurrence.all().forEach((date: string) => {
        dates[date.format("YYYY-MM-DD")] = { selected: true, color: "#2FB0ED" };
      });
    } else if (periodicity == 3) {
      const dayName = dayjs(day).locale("en").format("dddd");
      const numWeekOfMonth =
        dayjs(day).monthWeekByDay() !== 4
          ? dayjs(day).monthWeekByDay()
          : [3, 4];

      let reccurence = dayjs(day)
        .recur(dayjs(day).add(10, "month"))
        .every(dayName)
        .daysOfWeek()
        .every(numWeekOfMonth)
        .weeksOfMonthByDay();

      if (dayjs(day).monthWeekByDay() !== 4) {
        reccurence.all().forEach((date) => {
          dates[date.format("YYYY-MM-DD")] = { selected: true };
        });
      } else {
        const months = {};
        reccurence.all().forEach((date) => {
          months[date.month()] = date;
        });

        const filteredDates = Object.values(months);

        filteredDates
          .sort((a, b) => a - b)
          .forEach((date) => {
            dates[date.format("YYYY-MM-DD")] = {
              selected: true,
              color: "#2FB0ED",
            };
          });
      }
    }
    return dates;
  };
  let onSave = () => {
    setValue({
      ...value,
      dateRange: data.dateRange,
      periodicity: data.periodicity,
    });
    navigation.goBack();
  };
  let createDateRange = (startDate: string, endDate: string) => {
    const dateRange = {
      [startDate]: { selected: true, startingDay: true, color: "#2FB0ED" },
      [endDate]: { selected: true, endingDay: true, color: "#2FB0ED" },
    };
    if (startDate && endDate) {
      let start = dayjs(startDate).startOf("day").add(1, "days");
      const end = dayjs(endDate).startOf("day");
      while (end.isAfter(start)) {
        Object.assign(dateRange, {
          [start.format("YYYY-MM-DD")]: { selected: true, color: "#2FB0ED" },
        });
        start = start.add(1, "days");
      }
    }

    return dateRange;
  };

  const onDayPress = (day: any) => {
    if (data?.periodicity == 1) {
      if (startDay && !endDay) {
        if (dayjs(day.dateString).isBefore(startDay)) {
          let ranges = createDateRange(day.dateString, startDay);
          setData({
            ...data,
            dateRange: ranges,
          });
          setStartDay(null);
        } else {
          let ranges = createDateRange(startDay, day.dateString);
          setData({
            ...data,
            dateRange: ranges,
          });
          setStartDay(null);
        }
      } else {
        setStartDay(day.dateString);
        setEndDay(null);
        setData({
          ...data,
          dateRange: {
            [day.dateString]: {
              selected: true,
              startingDay: true,
              color: "#2FB0ED",
            },
          },
        });
      }
    } else {
      setData({
        ...data,
        dateRange: createDateRangeWeekly(day.dateString, data?.periodicity),
      });
    }
  };

  const handleSelect = (id: number) => {
    setData({
      ...data,
      dateRange: {},
      periodicity: id,
    });
  };
  return (
    <Screen scrollable={false} flex={1} backgroundColor="athensGray">
      <Box
        paddingVertical={"s"}
        paddingHorizontal={"m"}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        <Pressable
          justifyContent="center"
          w={25}
          h={25}
          alignItems="center"
          onPress={() => calendarRef.current?.addMonth(-1)}
        >
          <Icon
            iconFamily="FontAwesome5"
            iconName="chevron-left"
            size="m"
            color={"blueNavigation"}
          />
        </Pressable>
        <Box flexDirection={"row"} justifyContent="center" w={140}>
          <Text color={"neutral.500"} variant="st1">
            {startCase(dayjs(currentDate).format("MMMM"))}
          </Text>
          <Text ml="s" color={"neutral.400"} variant="st1">
            {dayjs(currentDate).format("YYYY")}
          </Text>
        </Box>

        <Pressable
          justifyContent="center"
          w={25}
          h={25}
          alignItems="center"
          onPress={() => calendarRef.current?.addMonth(1)}
        >
          <Icon
            iconFamily="FontAwesome5"
            iconName="chevron-right"
            size="m"
            color={"blueNavigation"}
          />
        </Pressable>
      </Box>
      <Calendar
        markingType={data.periodicity == 1 ? "period" : "custom"}
        ref={calendarRef}
        markedDates={data?.dateRange}
        minDate={dayjs().format("YYYY-MM-DD")}
        current={dayjs(currentDate).format("YYYY-MM-DD")}
        onDayPress={onDayPress}
        onMonthChange={(month) => {
          setCurrentDate(dayjs(month.dateString).toDate());
        }}
        theme={{
          stylesheet: {
            day: {
              basic: {
                backgroundColor: "red",
              },
            },
          },
          todayTextColor: "#2FB0ED",
          selectedDayBackgroundColor: "#4EC19F",
          dotStyle: {
            width: 10,
            height: 10,
            borderRadius: 10,
            marginTop: 8,
          },
          dotColor: "#95D1EE",
          selectedDotColor: "#95D1EE",
        }}
        // Hide month navigation arrows. Default = false
        hideArrows={true}
        hideExtraDays={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={1}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        renderHeader={() => null}
      />
      <Card withShadow={false} my="m" bg="white">
        {periodicity.map((item, index, arr) => (
          <Box key={index}>
            <RowItem
              onPress={() => handleSelect(item.id)}
              value={t(`${item?.name}`)}
              selected={item.id == data.periodicity}
              iconPrefix
            />
            {index != arr.length - 1 ? <Divider /> : null}
          </Box>
        ))}
      </Card>
    </Screen>
  );
};
