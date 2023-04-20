import { Box, BoxProps, Icon, Text, TextLink } from "pearl-ui";
import React from "react";

import { Switch } from "./Switch";
type CardLabelValueProps = {
  label: string;
  placeholder?: string;
  value?: string | null | undefined;
  onPress?: () => void;
  containerProps?: BoxProps;
  showChevron?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
};

export const CardLabelValue = ({
  label,
  value,
  placeholder,
  disabled,
  onPress,
  containerProps,
  errorMessage,
  error,
  showChevron,
}: CardLabelValueProps) => (
  <Box
    justifyContent="space-between"
    flexDirection="row"
    paddingVertical={"m"}
    paddingHorizontal={"m"}
    {...containerProps}
  >
    <Box flex={1}>
      <Text variant="p2">{label}</Text>
      {error ? (
        <Text fontSize="xs" color="danger">
          {errorMessage}
        </Text>
      ) : null}
    </Box>
    {placeholder || value ? (
      <Box flex={1}>
        <TextLink
          alignItems="flex-end"
          variant={disabled ? "secondary" : "primary"}
          onPress={disabled ? () => null : onPress}
          isDisabled={disabled}
        >
          {value ? value.toString() : placeholder}
        </TextLink>
      </Box>
    ) : null}

    <Box>
      {showChevron && (
        <Icon
          iconFamily="Ionicons"
          iconName="chevron-forward"
          color="blueNavigation"
          size="l"
        />
      )}
    </Box>
  </Box>
);

type CardLabelSwitchProps = {
  label: string;
  value?: boolean;
  toggleSwitch?: (v: boolean) => void;
  containerProps?: BoxProps;
  disabled?: boolean;
};
export const CardLabelSwitch = ({
  label,
  value,
  toggleSwitch,
  containerProps,
  disabled,
}: CardLabelSwitchProps) => (
  <Box
    justifyContent="space-between"
    flexDirection="row"
    alignItems={"center"}
    paddingVertical={"s"}
    {...containerProps}
  >
    <Text variant="p2">{label}</Text>

    <Switch disabled={disabled} value={value} onValueChange={toggleSwitch} />
  </Box>
);
