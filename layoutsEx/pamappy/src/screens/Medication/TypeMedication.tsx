import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Divider, Screen } from "pearl-ui";
import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

import { RowItem } from "~components";
import { NavigatorParamList } from "~navigation";

import { useCurrentMedicationState } from "./AddMedication";
export const types = [
  {
    id: 1,
    name: "screen.type-of-administration.label.1",
    form: "screen.type-of-administration.form.1",
  },
  {
    id: 2,
    name: "screen.type-of-administration.label.2",
    form: "screen.type-of-administration.form.2",
  },
  {
    id: 3,
    name: "screen.type-of-administration.label.3",
    form: "screen.type-of-administration.form.3",
  },
  {
    id: 4,
    name: "screen.type-of-administration.label.4",
    form: "screen.type-of-administration.form.4",
  },
  {
    id: 5,
    name: "screen.type-of-administration.label.5",
    form: "screen.type-of-administration.form.4",
  },
  {
    id: 6,
    name: "screen.type-of-administration.label.6",
    form: "screen.type-of-administration.form.2",
  },
  {
    id: 7,
    name: "screen.type-of-administration.label.7",
    form: "screen.type-of-administration.form.2",
  },
];
export const TypeMedicationScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "typeMedication">
> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [value, setValue] = useCurrentMedicationState();
  const queryClient = useQueryClient();

  useEffect(() => {
    navigation.setOptions({
      title: t("screen.add-medication.type.label", "Type d’administration"),
      headerStyle: {
        backgroundColor: "#2FB0ED",
      },
      headerTintColor: "white",
    });
  }, [navigation, t]);


  const handleSelectItem = (id: number) => {
    setValue({
      ...value,
      type: id,
    });
  };

  let selectedId = value?.type ? value?.type : route?.params?.type;
  return (
    <Screen backgroundColor="athensGray" flex={1}>
      <Box borderRadius={"l"} bg="white">
        {types.map((item, index, arr) => (
          <Box key={index}>
            <RowItem
              onPress={() => handleSelectItem(item.id)}
              value={t(`${item?.name}`)}
              selected={item?.id == selectedId}
              iconPrefix
            />
            {index != arr.length - 1 ? <Divider /> : null}
          </Box>
        ))}
      </Box>
    </Screen>
  );
};
