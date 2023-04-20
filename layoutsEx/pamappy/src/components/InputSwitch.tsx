import { Box, BoxProps, Text } from "pearl-ui";
import React, { FC } from "react";
import { Switch } from "react-native";

type InputSwitchProps = {
  label: string;
  value?: boolean | undefined;
  containerProps?: BoxProps;
  onValueChange: (value: boolean) => void;
};

export const InputSwitch: FC<InputSwitchProps> = ({
  label,
  value,
  onValueChange,
  containerProps,
}) => (
  <Box
    backgroundColor={"white"}
    paddingHorizontal={"m"}
    paddingVertical={"m"}
    borderRadius={"l"}
    flexDirection="row"
    alignItems="center"
    {...containerProps}
  >
    <Text variant="btn2">{label}</Text>
    <Box flex={1} />
    <Switch onValueChange={onValueChange} value={value} />
  </Box>
);
