import { Box, TextLink } from "pearl-ui";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

type BusyIndicatorProps = {
  styleIndicator?: ActivityIndicatorProps;
  onCancel?: () => void;
};
export const BusyIndicator: FC<any> = ({
  styleIndicator = {
    color: "black",
    size: "large",
  },
  ...props
}: BusyIndicatorProps) => (
  <Box
    flex={1}
    alignContent="center"
    justifyContent="center"
    alignItems="center"
    {...props}
  >
    <ActivityIndicator {...styleIndicator} />
  </Box>
);

export const BusyIndicatorOverlay: FC<any> = (props: BusyIndicatorProps) => {
  const { t } = useTranslation();

  return (
    <Box
      flex={1}
      alignContent="center"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      width="100%"
      height="100%"
      style={{ backgroundColor: "black" }}
      {...props}
    >
      <ActivityIndicator color="white" size="large" />

      {props.onCancel ? (
        <TextLink onPress={props.onCancel} variant="default" marginTop={"m"}>
          {t("Annuler")}
        </TextLink>
      ) : null}
    </Box>
  );
};
