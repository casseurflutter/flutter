import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Divider, Icon, Pressable, Screen, Text } from "pearl-ui";
import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { NavigatorParamList } from "~navigation";

import Bird from "../assets/bird.svg";
import { useCurrentAppointementState } from "./AddAppointements";
export const types = [
  {
    id: 0,
    key: "screen.type-appointment.option.label",
  },
  {
    id: 1,
    key: "screen.type-appointment.option1.label",
  },
  {
    id: 2,
    key: "screen.type-appointment.option2.label",
  },
  {
    id: 3,
    key: "screen.type-appointment.option3.label",
  },
  {
    id: 4,
    key: "screen.type-appointment.option4.label",
  },
  {
    id: 5,
    key: "screen.type-appointment.option5.label",
  },
  {
    id: 6,
    key: "screen.type-appointment.option6.label",
  },
  {
    id: 7,
    key: "screen.type-appointment.option7.label",
  },
  {
    id: 8,
    key: "screen.type-appointment.option8.label",
  },
  {
    id: 9,
    key: "screen.type-appointment.option9.label",
  },
  {
    id: 10,
    key: "screen.type-appointment.option10.label",
  },
  {
    id: 11,
    key: "screen.type-appointment.option11.label",
  },
  {
    id: 12,
    key: "screen.type-appointment.option12.label",
  },
  {
    id: 13,
    key: "screen.type-appointment.option13.label",
  },
  {
    id: 14,
    key: "screen.type-appointment.option14.label",
  },
  {
    id: 15,
    key: "screen.type-appointment.option15.label",
  },
  {
    id: 16,
    key: "screen.type-appointment.option16.label",
  },
  {
    id: 17,
    key: "screen.type-appointment.option17.label",
  },
  {
    id: 18,
    key: "screen.type-appointment.option18.label",
  },
  {
    id: 19,
    key: "screen.type-appointment.option19.label",
  },
  {
    id: 20,
    key: "screen.type-appointment.option20.label",
  },
  {
    id: 21,
    key: "screen.type-appointment.option21.label",
  },
  {
    id: 22,
    key: "screen.type-appointment.option22.label",
  },
  {
    id: 23,
    key: "screen.type-appointment.option23.label",
  },
];
export const TypesAppointementScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "typesAppointement">
> = ({ navigation, route }) => {
  const [type, setType] = useCurrentAppointementState();
  const { t } = useTranslation();
  const handleSelectItem = (item: any) => {
    setType({
      id: item.id,
      label: t(`${item.key}`),
    });
  };

  useEffect(() => {
    navigation.setOptions({
      title: "Type",
    });
  }, [navigation]);
  let selected = type ? type.id : route?.params?.typeId;

  return (
    <Screen flex={1} backgroundColor="grayBackground">
      <Box borderRadius={"l"} bg="white">
        {types.map((item, index, ar) => (
          <Box key={index}>
            <Pressable onPress={() => handleSelectItem(item)}>
              <Box alignItems="center" py="m" px="m" flexDirection="row">
                <Box mr="m">
                  <Bird width={30} height={22} fill="#2FB0ED" />
                </Box>

                <Box flexDirection="row" flex={2}>
                  <Text variant="p2">{t(`${item?.key}`)}</Text>
                </Box>

                <Box
                  justifyContent="center"
                  alignItems="flex-end"
                  mr="s"
                  flex={1}
                >
                  {selected === item.id ? (
                    <Icon
                      color={selected === item.id ? "blueNavigation" : "gray4"}
                      size="l"
                      iconFamily="Ionicons"
                      iconName="checkmark"
                    />
                  ) : null}
                </Box>
              </Box>
            </Pressable>
            {index != ar.length - 1 ? <Divider /> : null}
          </Box>
        ))}
      </Box>
    </Screen>
  );
};
