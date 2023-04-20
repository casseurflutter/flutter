import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Divider, Screen } from "pearl-ui";
import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { atom, useRecoilState } from "recoil";

import { BusyIndicator, RowItem } from "~components";
import { NavigatorParamList } from "~navigation";

import { useGetUsersMe } from "../api";
export const BloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
export type BloodGroup = number;
export const bloodGroupType = atom<BloodGroup | undefined>({
  key: "bloodGroup", // unique ID (with respect to other atoms/selectors)
  default: undefined,
});

export const BloodGroupScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "BloodGroup">
> = ({ navigation }) => {
  const { data, isLoading } = useGetUsersMe();
  const [value, setValue] = useRecoilState(bloodGroupType);

  const { t } = useTranslation();
  const handleSelectItem = (value: number) => {
    setValue(value);
  };

  useEffect(() => {
    if (data) {
      setValue(BloodGroups.findIndex((item) => item == data?.data?.bloodType));
    }
  }, [data]);
  useEffect(() => {
    navigation.setOptions({
      title: t("screen.blood-group.title", "Groupe sanguin"),
    });
  }, [navigation, t]);

  if (!data || isLoading) {
    return <BusyIndicator />;
  }
  return (
    <Screen p="m" flex={1} backgroundColor="grayBackground">
      <Box borderRadius={"l"} backgroundColor="white">
        {BloodGroups.map((item, index, ar) => (
          <Box key={index}>
            <RowItem
              onPress={() => handleSelectItem(index)}
              value={item}
              selected={value == index}
            />
            {index != ar.length - 1 ? <Divider /> : null}
          </Box>
        ))}
      </Box>
    </Screen>
  );
};
