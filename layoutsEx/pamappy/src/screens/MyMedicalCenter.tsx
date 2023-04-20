import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";
import { Box, Screen, Text } from "pearl-ui";
import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useGetUsersMe } from "~api";
import { BusyIndicator, Card, Divider, InputPicker } from "~components";
import { NavigatorParamList } from "~navigation";


export const MyMedicalCenterScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "myMedicalCenter">
> = ({ navigation }) => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetUsersMe();
  useEffect(() => {
    navigation.setOptions({
      title: t("screen.my-medical-contact.title", "Centre médical"),
    });
  }, [navigation, t]);

  const handleCall = (phone: any) => {
    Linking.openURL(`tel://${phone}`);
  };
  if (isLoading) {
    return (
      <Screen flex={1} backgroundColor="bleuClair">
        <BusyIndicator />
      </Screen>
    );
  }


  return (
    <Screen flex={1} backgroundColor="grayBackground">
      <Card>
        <InputPicker
          variant="p2"
          onPress={() => navigation.navigate("medicalCenters")}
          label={t("screen.my-medical-contact.title", "Centre médical")}
        />
      </Card>
      {data?.data.medicalCenter ? (
        <Card mt="m">
          <Box py="s" flexDirection="row" px="m">
            <Text variant="st1" color="blueNavigation">
              {data?.data.medicalCenter?.name}
            </Text>
          </Box>
          <Divider />
          <Box paddingHorizontal={"m"} py={"s"}>
            <Text variant="p2"> {data?.data.medicalCenter?.address}</Text>
          </Box>
          <Divider />
          <InputPicker
            containerProps={{
              paddingVertical: "s",
            }}
            variant="p2"
            onPress={() =>
              handleCall(data?.data.medicalCenter?.receptionNumber)
            }
            value={data?.data.medicalCenter?.receptionNumber}
            label={t("screen.my-medical-contact.reception", "Accueil")}
          />
        </Card>
      ) : null}
    </Screen>
  );
};
