import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { startCase } from "lodash";
import { Box, Icon, Pressable, Text, TextLink } from "pearl-ui";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar } from "react-native-calendars";

import { BusyIndicator, EventCard, FlatList } from "~components";
import { NavigatorParamList } from "~navigation";

import { useGetAppointmentsAll, useGetUsersMe } from "../api/hooks";
import { usePreventFlickering } from "../hooks/usePreventFlickering";

  let createDateRange = (startAt: string, mensesDuration: number) => {
    const startDate = dayjs(startAt);
    const endDate = dayjs(startAt)
      .add(mensesDuration, "day")
      .subtract(1, "day");
    const dateRange = {
      [startDate.format("YYYY-MM-DD")]: {
        startingDay: true,
        color: "#F8DAE3",
        textColor: "black",
      },
      [endDate.format("YYYY-MM-DD")]: {
        endingDay: true,
        color: "#F8DAE3",
        textColor: "black",
      },
    };
    if (startDate && endDate) {
      let start = startDate.add(1, "days");
      const end = endDate.subtract(1, "day").endOf("day");
      while (end.isAfter(start)) {
        Object.assign(dateRange, {
          [start.format("YYYY-MM-DD")]: {
            color: "#F8DAE3",
            textColor: "black",
          },
        });
        start = start.add(1, "days");
      }
    }
    return dateRange;
  };

  const useMensesDates = () => {
    const meQuery = useGetUsersMe();
    const [mensesDates, setMensesDates] = useState(null);
    useFocusEffect(
      useCallback(() => {
        meQuery.refetch();
      }, [])
    );

    useEffect(() => {
      if (
        meQuery.data &&
        mensesDates == null &&
        meQuery.data?.data.mensesAt != null
      ) {
        const mensesAt = meQuery.data?.data.mensesAt;
        const mensesDuration = meQuery.data?.data.mensesDuration || 5;

        const days =
          dayjs(mensesAt).diff(dayjs(mensesAt).startOf("month"), "day") +
          14 +
          mensesDuration;

        const recurrence = dayjs(mensesAt)
          .recur(dayjs(mensesAt).add(12, "month"))
          .every(days, "days");

        const marks = recurrence
          .all()
          .reduce(
            (acc, s) => ({ ...acc, ...createDateRange(s, mensesDuration) }),
            {}
          );
        setMensesDates(marks);
      }
    }, [meQuery, mensesDates]);

    return mensesDates || {};
  };

export const AppointmentsScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "appointements">
> = ({ navigation }) => {
  const [currentDate, setCurrentDate] = useState<Date | string>(new Date());
  const [markedDate, setMarkedDate] = useState({});
  const calendarRef = useRef<Calendar>(null);
  const [mode, setMode] = useState<"calendar" | "list">("calendar");
  const { t } = useTranslation();
  const query = useGetAppointmentsAll();

  const { isRefetching, handleRefetch } = usePreventFlickering(query.refetch);

  const mensesDates = useMensesDates();

  useEffect(() => {
    if (query?.data?.data) {
      setMarkedDate(() => marketDates());
    }
  }, [query?.data]);

  useEffect(() => {
    navigation.setOptions({
      title: t("screen.appointements.title", "Rendez-vous"),
      headerRight: () => (
        <TextLink
          p="s"
          onPress={() => navigation.navigate("addAppointements")}
          variant="header"
          marginHorizontal={"m"}
        >
          {t("screen.appointements.button.save", "Nouveau")}
        </TextLink>
      ),
    });
  }, [navigation, t]);

  const marketDates = useCallback(() => {
    let dates: any = {};
    for (const element of query?.data?.data) {
      let key = dayjs(element.date).format("YYYY-MM-DD");
      dates[key] = {
        color: "#2FB0ED",
        marked: true,
        dotColor: "#2FB0ED",
        textColor: "white",
      };
    }

    return dates;
  }, [query.data]);

  const handleMovePreviousMonth = useCallback(() => {
    calendarRef.current?.addMonth(-1);
  }, [calendarRef]);

  const renderListEmptyComponent = useCallback(
    () => (
      <Box
        alignContent="center"
        justifyContent="center"
        alignItems="center"
      ></Box>
    ),
    []
  );

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <Pressable
      onPress={() => {
        navigation.navigate("addAppointements", {
          id: item._id,
        });
      }}
    >
      <EventCard item={item} key={index} />
    </Pressable>
  );

  const EVENTS =
    mode == "calendar"
      ? query?.data?.data.filter((item) =>
          dayjs(item.date).isSame(dayjs(currentDate), "day")
        )
      : query?.data?.data
          .sort((a: any, b: any) =>
            dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1
          )
          .filter(
            (item) =>
              dayjs(item.date).isSame(dayjs(), "day") ||
              dayjs(item.date).isAfter(dayjs(), "day")
          );

  return (
    <Box backgroundColor="grayBackground" flex={1}>
      <Box
        backgroundColor={"white"}
        paddingVertical={"s"}
        paddingHorizontal={"m"}
        flexDirection="row"
        alignItems="center"
      >
        <Box
          flexDirection="row"
          alignContent="center"
          justifyContent="center"
          alignItems="center"
        >
          <Pressable
            justifyContent="center"
            w={25}
            h={25}
            alignItems="center"
            onPress={handleMovePreviousMonth}
            visible={mode == "calendar"}
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
            visible={mode == "calendar"}
          >
            <Icon
              iconFamily="FontAwesome5"
              iconName="chevron-right"
              size="m"
              color={"blueNavigation"}
            />
          </Pressable>
        </Box>
        <Box flex={1}></Box>
        <Pressable
          onPress={() =>
            setMode((old) => (old == "calendar" ? "list" : "calendar"))
          }
        >
          <Icon
            iconFamily="FontAwesome5"
            iconName={mode == "calendar" ? "list" : "calendar"}
            size="l"
            color={"blueNavigation"}
          />
        </Pressable>
      </Box>
      {mode == "calendar" ? (
        <Calendar
          ref={calendarRef}
          markingType={"period"}
          markedDates={{
            ...mensesDates,
            ...markedDate,
            [currentDate]: {
              ...(markedDate.hasOwnProperty(currentDate)
                ? markedDate[currentDate]
                : {}),
              selected: true,
            },
          }}
          // minDate={dayjs().format("YYYY-MM-DD")}
          // Initially visible month. Default = now
          current={dayjs(currentDate).format("YYYY-MM-DD")}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          // minDate={dayjs(currentDate).subtract(1, "month").format("YYYY-MM-DD")}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          //maxDate={dayjs(currentDate).add(3, "month").format("YYYY-MM-DD")}
          // Handler which gets executed on day press. Default = undefined

          onDayPress={(day) => {
            setCurrentDate(day.dateString);
          }}
          onMonthChange={(month) => {
            setCurrentDate(dayjs(month.dateString).toDate());
          }}
          theme={{
            todayTextColor: "#00adf5",
            selectedDayBackgroundColor: "#4EC19F",
            selectedDayTextColor: "#2FB0ED",
            dotStyle: {
              width: 20,
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
      ) : null}
      {query.isLoading ? (
        <BusyIndicator />
      ) : (
        <FlatList
          refreshing={isRefetching}
          onRefresh={handleRefetch}
          data={EVENTS}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          ListEmptyComponent={renderListEmptyComponent}
          contentContainerStyle={{
            margin: 15,
          }}
        />
      )}
    </Box>
  );
};
