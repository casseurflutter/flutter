import { useNavigation } from "@react-navigation/native";
import dayjs, { Dayjs } from "dayjs";
import {
  Box,
  Divider,
  Icon,
  Pressable,
  Screen,
  Text,
  TextLink,
} from "pearl-ui";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Dimensions, Image, ScrollView } from "react-native";

import { BusyIndicator, Card } from "~components";
import { useOneSignal } from "~hooks";

import {
  useGetAppointmentsAll,
  useGetMessagesAll,
  useGetNotesAll,
  useGetPicturesAll,
  useGetUsersMe,
} from "../api/hooks";
import Heatbeat from "../assets/heatbeat.svg";
import { PictureItem } from "./Photos";
const WINDOW_WIDTH = Dimensions.get("window").width;

export const HomeScreen = ({ navigation }) => {
  const query = useGetNotesAll({
    onError: (e) => {
      console.log(e.message);
    },
  });

  if (query.isLoading) {
    return (
      <Screen backgroundColor="grayBackground">
        <BusyIndicator styleIndicator={{ color: "black" }} />
      </Screen>
    );
  }

  return <HomeScreenContent />;
};
type ShowAllProps = {
  color: string;
  onPress: () => void;
  children?: any;
};
const ShowAll = ({ color, onPress, children }: ShowAllProps) => {
  return (
    <Pressable onPress={onPress} androidRippleConfig={undefined}>
      <Box flexDirection="row" alignItems="center" minHeight={30}>
        <Text color={color} variant="st2" marginHorizontal={"s"}>
          <Trans i18nKey={"screen.home.button.seeMore"}>Tout afficher</Trans>
        </Text>
        {children ? (
          children
        ) : (
          <Icon
            iconFamily="Ionicons"
            iconName="chevron-forward-circle-sharp"
            color={color}
            size="l"
          />
        )}
      </Box>
    </Pressable>
  );
};

const MessageBox = () => {
  const navigation = useNavigation();
  const { data, isLoading } = useGetMessagesAll();
  const { t } = useTranslation();

  return (
    <Card
      withShadow={false}
      backgroundColor={"blueTresClair"}
      borderRadius={"l"}
      paddingHorizontal={"m"}
      minHeight={56}
      justifyContent="center"
    >
      <Box
        py="s"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text variant="t2">{t("screen.message.title", "Messages")}</Text>
        <ShowAll
          color={"vertFonce"}
          onPress={() => navigation.navigate("messages")}
        >
          {data?.data.length > 0 ? (
            <Box
              alignItems="center"
              borderRadius={"full"}
              w={24}
              h={24}
              bg="danger.500"
            >
              <Text variant="btn2" color={"white"}>
                {data?.data.length}
              </Text>
            </Box>
          ) : null}
        </ShowAll>
      </Box>
      <Divider />
      {isLoading ? (
        <BusyIndicator
          backgroundColor=""
          styleIndicator={{
            color: "#626262",
          }}
          marginVertical="m"
          flex={1}
        />
      ) : data?.data?.length > 0 ? (
        <Pressable
          onPress={() =>
            navigation.navigate("messageDetails", { id: data?.data[0]?._id })
          }
        >
          <Box py="s">
            <Box justifyContent="space-between" flexDirection="row">
              <Text variant="st1" color={"gray7"}>
                {data?.data[0]?.title}
              </Text>
              <Icon
                iconFamily="Ionicons"
                iconName="chevron-forward"
                color="gray7"
                size="l"
              />
            </Box>

            <Text numberOfLines={3} color={"gray7"} variant="p2">
              {data?.data[0]?.content}
            </Text>
          </Box>
        </Pressable>
      ) : (
        <Box my="s" flexDirection="row">
          <Text numberOfLines={3} color={"gray7"} variant="p2">
            {t("screen.home.messages.empty", "Aucun message pour le moment")}
          </Text>
        </Box>
      )}
    </Card>
  );
};

const Agenda = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { data, isLoading } = useGetAppointmentsAll();

  const Events = ({ item, index, show, showTitleOnce }: any) => (
    <Box>
      {showTitleOnce ? (
        <Box>
          <Box py="s" justifyContent="space-between" flexDirection={"row"}>
            <Text
              alignSelf="center"
              variant="st1"
              color={"bleu"}
              maxWidth="80%"
              textTransform="capitalize"
            >
              {formatTitleToDate(item.date)}
            </Text>
            {show ? (
              <ShowAll
                onPress={() => navigation.navigate("appointements")}
                color="blueNavigation"
              />
            ) : null}
          </Box>
          <Divider />
        </Box>
      ) : null}
      <Pressable
        onPress={() =>
          navigation.navigate("addAppointements", { id: item._id })
        }
      >
        <Box py="s" flexDirection="row" justifyContent="space-between">
          <Box flexDirection="row">
            <Heatbeat width={24} height={24} />
            <Text variant="st2" color="gray6" ml="s">
              {item.title}
            </Text>
          </Box>
          <Text color="black" variant="p2">
            {dayjs(item?.date).format("HH:mm")}
          </Text>
        </Box>
      </Pressable>
    </Box>
  );

  const renderUpcomingEvents = () => {
    let today: JSX.Element[] = [];
    let tomorrow: JSX.Element[] = [];
    let sameElse: JSX.Element[] = [];

    EVENTS_DATA.sort((a: any, b: any) =>
      dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1
    ).forEach((event, index) => {
      if (dayjs(event?.date).isToday()) {
        if (today.length == 3) return;
        today.push(
          <Events
            key={index}
            showTitleOnce={React.Children.count(today) == 0}
            item={event}
          />
        );
      } else if (dayjs(event?.date).isTomorrow()) {
        if (tomorrow.length == 3) return;
        tomorrow.push(
          <Events
            key={index}
            showTitleOnce={React.Children.count(tomorrow) == 0}
            item={event}
          />
        );
      } else {
        if (sameElse.length == 3) return;
        if (
          sameElse.length > 0 &&
          !dayjs(event?.date).isSame(sameElse[0].props.item.date, "day")
        ) {
          return;
        } else {
          if (dayjs(event?.date).isAfter(dayjs().add(1, "day"))) {
            sameElse.push(
              <Events
                key={index}
                showTitleOnce={React.Children.count(sameElse) == 0}
                item={event}
              />
            );
          }
        }
      }
    });

    const eventsToday = React.Children.map(today, (child) => ({
      ...child,
      props: {
        ...child.props,
        show: true,
      },
    }));
    const eventsTomorrow = React.Children.map(tomorrow, (child) => ({
      ...child,
      props: {
        ...child.props,
        show: React.Children.count(today) == 0,
      },
    }));
    const eventsSameElse = React.Children.map(sameElse, (child) => ({
      ...child,
      props: {
        ...child.props,
        show:
          React.Children.count(today) == 0 &&
          React.Children.count(tomorrow) == 0,
      },
    }));
    return (
      <>
        {React.Children.count(eventsToday) > 0 ? eventsToday : null}
        {React.Children.count(eventsTomorrow) > 0 ? eventsTomorrow : null}
        {React.Children.count(eventsSameElse) > 0 ? eventsSameElse : null}
      </>
    );
  };
  function formatTitleToDate(date: Dayjs) {
    return dayjs(date).calendar(null).toString();
  }
  if (isLoading) {
    return (
      <BusyIndicator
        backgroundColor=""
        styleIndicator={{
          color: "#626262",
        }}
        marginVertical="m"
        flex={1}
      />
    );
  }
  const EVENTS_DATA =
    data?.data.filter(
      (item) =>
        dayjs(item.date).isAfter(dayjs(), "day") ||
        dayjs(item.date).isSame(dayjs(), "day")
    ) || [];
  return (
    <Card
      withShadow={false}
      backgroundColor={"white"}
      borderRadius={"l"}
      minHeight={56}
      justifyContent="center"
      marginTop="m"
      paddingHorizontal={"m"}
    >
      {EVENTS_DATA?.length == 0 ? (
        <>
          <Box flexDirection="column">
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text paddingVertical="s" variant="t2" color={"bleu"}>
                <Trans i18nKey={"screen.home.calendar.title"}>Agenda</Trans>
              </Text>
            </Box>
            <Divider />
          </Box>
          <Box>
            <Box my="s">
              <Text color={"neutral.600"} variant="p2">
                {t(
                  "screen.home.agenda.empty",
                  "Tu n'as pas encore de rendez-vous dans ton agenda."
                )}
              </Text>

              <TextLink
                onPress={() => navigation.navigate("addAppointements")}
                variant="link"
              >
                {t(
                  "screen.home.agenda.save.event",
                  "Enregistre ton premier évènement."
                )}
              </TextLink>
            </Box>
          </Box>
        </>
      ) : (
        renderUpcomingEvents()
      )}
    </Card>
  );
};

const Pictures = () => {
  const navigation = useNavigation();

  const { data, isLoading } = useGetPicturesAll();
  const { t } = useTranslation();

  return (
    <Card
      withShadow={false}
      backgroundColor={"white"}
      borderRadius={"l"}
      minHeight={56}
      justifyContent="center"
      marginTop="m"
    >
      <Box paddingHorizontal={"m"}>
        <Box
          paddingVertical={"s"}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text variant="t2" color={"vert"}>
            <Trans i18nKey={"screen.home.memories.title"}>Souvenirs</Trans>
          </Text>

          {data?.data.length != 0 ? (
            <ShowAll
              onPress={() => navigation.navigate("photos")}
              color={"vert"}
            />
          ) : null}
        </Box>
      </Box>
      <Box px="m">
        <Divider />
      </Box>
      {isLoading ? (
        <BusyIndicator
          backgroundColor="transparent"
          styleIndicator={{
            color: "#626262",
          }}
          marginVertical="m"
          flex={1}
        />
      ) : data?.data.length == 0 ? (
        <Box paddingHorizontal={"m"} paddingVertical={"s"}>
          <Text color={"neutral.600"} variant="p2">
            <Trans i18nKey={"screen.home.pictures.empty"}>
              Tu n'as pas encore de photos souvenir.
            </Trans>
          </Text>
          <TextLink
            onPress={() => navigation.navigate("photos")}
            variant="link"
          >
            {t(
              "screen.home.pictures.link.take-picture",
              "Prendre ta première photo."
            )}
          </TextLink>
        </Box>
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 5,
            paddingVertical: 10,
          }}
          horizontal={data?.data?.length > 1}
        >
          {data?.data?.map((item) => (
            <PictureItem
              borderRadius={10}
              style={{
                marginHorizontal: 5,
                width: 150,
                height: 100,
              }}
              key={item._id}
              item={item}
            />
          ))}
        </ScrollView>
      )}
    </Card>
  );
};

type ShortcutProps = {
  title: string;
  onPress: () => void;
  onPress2: () => void;
};

const SHORTCUT_WIDTH = WINDOW_WIDTH / 2 - 25;
const Shortcut = ({ title, onPress, onPress2, imageSource }: ShortcutProps) => {
  return (
    <Pressable onPress={onPress}>
      <Box
        mt="s"
        paddingVertical={"s"}
        marginBottom="s"
        backgroundColor={"vertFonce"}
        w={SHORTCUT_WIDTH}
        borderRadius={"m"}
      >
        <Image
          source={imageSource}
          width={80}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            opacity: 0.3,
            height: 80,
          }}
        />

        <Box px="s" flexDirection="row" alignItems="center">
          <Box flexDirection="row" alignItems="center">
            <Text color={"white"} variant="st1">
              {title}
            </Text>
          </Box>
        </Box>

        <Box flex={1}></Box>

        <Box
          px="s"
          flexDirection="row"
          alignItems="center"
          alignSelf="flex-end"
          marginTop={"l"}
        >
          <Pressable
            onPress={onPress2}
            flexDirection="row"
            alignItems={"center"}
          >
            <Text color={"white"} marginHorizontal={"s"} variant="st1">
              <Trans i18nKey={"screen.home.shortcut.add.button.label"}>
                Ajouter
              </Trans>
            </Text>
            <Icon
              iconFamily="AntDesign"
              iconName="pluscircle"
              color="white"
              size="m"
            />
          </Pressable>
        </Box>
      </Box>
    </Pressable>
  );
};
export const HomeScreenContent = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { data, isLoading, refetch } = useGetUsersMe();

  useOneSignal();

  return (
    <Screen
      backgroundColor={"grayBackground"}
      paddingTop={"xl"}
      paddingBottom="l"
    >
      <MessageBox />
      <Agenda />
      <Pictures />

      <Box
        marginVertical="s"
        justifyContent="space-between"
        flexWrap="wrap"
        flexDirection={"row"}
      >
        <Shortcut
          onPress2={() => navigation.navigate("note")}
          title="Notes"
          imageSource={require("../assets/clip-notes.png")}
          onPress={() => navigation.navigate("notes")}
        />
        <Shortcut
          onPress2={() => {
            let to: string = data?.data?.isPremium
              ? "photos"
              : "updateToPremium";
            navigation.navigate(to);
          }}
          imageSource={require("../assets/clip-photo.png")}
          title={t("screen.tabs.photos", "Photos")}
          onPress={() => {
            let to: string = data?.data?.isPremium
              ? "photos"
              : "updateToPremium";
            navigation.navigate(to);
          }}
        />

        <Shortcut
          onPress2={() => navigation.navigate("addAppointements")}
          imageSource={require("../assets/clip-agenda.png")}
          title={t("screen.appointements.title", "Rendez-vous")}
          onPress={() => navigation.navigate("appointements")}
        />
        <Shortcut
          onPress2={() => {
            let to: string = data?.data?.isPremium
              ? "addMedication"
              : "updateToPremium";
            navigation.navigate(to);
          }}
          imageSource={require("../assets/clip-medication.png")}
          title={t("screen.shortcut.title.medications", "Medications")}
          onPress={() => {
            let to: string = data?.data?.isPremium
              ? "medications"
              : "updateToPremium";
            navigation.navigate(to);
          }}
        />
      </Box>
    </Screen>
  );
};
