import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Camera } from "expo-camera";
import { Box, Pressable, Screen, Text } from "pearl-ui";
import React, { FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { NavigatorParamList } from "~navigation";

type MyProfileFormValue = {
  firstName: string;
  lastName: string;
  picture: string;
};
export const MyProfileScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "myProfile">
> = ({ navigation }) => {
  const refForm = useRef<any>(null);
  const { t } = useTranslation();
  const [type, setType] = useState(Camera.Constants.Type.front);

  return (
    <Screen flex={1} backgroundColor="bleuClair">
      <Camera
        style={{
          flex: 1,
        }}
        type={type}
      >
        <Box flex={1}>
          <Pressable
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text> Flip </Text>
          </Pressable>
        </Box>
      </Camera>
    </Screen>
  );
};
