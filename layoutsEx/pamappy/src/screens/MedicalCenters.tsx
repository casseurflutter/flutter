import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Divider, Icon, Pressable, Screen, Text } from "pearl-ui";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { useQueryClient } from "react-query";

import { BusyIndicator, Card, InputPicker } from "~components";
import { NavigatorParamList } from "~navigation";

import {
  useGetMedicalCentersAll,
  useGetUsersMe,
  usePutUsersEdit,
} from "../api/hooks";
import { getUsersMe } from "../api/services";
export const MedicalCentersScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "medicalCenters">
> = ({ navigation }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetUsersMe();
  const [selectedId, setSelectedId] = useState<string>("");
  const { data: medicalCenters, isLoading: loading } =
    useGetMedicalCentersAll();

  const onSubmit = useCallback(() => {
    edit.mutate({
      requestBody: {
        medicalCenter: selectedId,
      },
    });
  }, [selectedId]);
  useEffect(() => {
    navigation.setOptions({
      title: t("screen.my-medical-contact.title", "Centre médical"),
    });
  }, [navigation, onSubmit, t]);
  const edit = usePutUsersEdit({
    onSuccess: async ({ data }) => {
      Alert.alert(
        t("screen.my-info.title.success", "Votre informations a été modifiée."),
        "",
        [
          {
            text: t("alert.button.ok", "Ok"),
            onPress: () => {},
          },
        ]
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(getUsersMe.key);
    },
  });

  const handleSelect = async (id: string) => {
    //setSelectedId(id);
    await edit.mutate({
      requestBody: {
        medicalCenter: id,
      },
    });
  };
  if (isLoading || loading) {
    return (
      <Screen flex={1} backgroundColor="grayBackground">
        <BusyIndicator />
      </Screen>
    );
  }

  return (
    <Screen backgroundColor="grayBackground">
      <Card my="m">
        <InputPicker
          variant="p2"
          onPress={() => navigation.navigate("AddMedicalCenter")}
          label={"Ajouter un centre"}
        />
      </Card>
      <Box backgroundColor={"white"} borderRadius={"l"}>
        {medicalCenters?.data.map((item, index) => (
          <Pressable key={index} onPress={() => handleSelect(item._id)}>
            <Box>
              <Box
                marginHorizontal={"m"}
                paddingVertical={"m"}
                flexDirection="row"
                justifyContent={"center"}
              >
                <Text
                  variant="p2"
                  textAlign="left"
                  numberOfLines={2}
                  maxWidth="80%"
                >
                  {item.name}
                </Text>
                <Box flex={1} />
                <Icon
                  iconFamily="Ionicons"
                  iconName="checkmark"
                  size="l"
                  color={
                    data?.data?.medicalCenter &&
                    data?.data?.medicalCenter._id === item._id
                      ? "brand"
                      : "transparent"
                  }
                />
              </Box>
              {index < medicalCenters?.data.length - 1 ? <Divider /> : null}
            </Box>
          </Pressable>
        ))}
      </Box>
    </Screen>
  );
};
