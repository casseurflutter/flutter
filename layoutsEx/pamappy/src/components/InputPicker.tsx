import { Box, BoxProps, Text, TextLink } from "pearl-ui";
import React from "react";
import { useTranslation } from "react-i18next";

type InputPickerProps = {
  label: string;
  value?: string | undefined | null;
  containerProps?: BoxProps;
  variant?: string;
  onPress?: () => void;
  isDisabled?: boolean;
};

export const InputPicker = ({
  label,
  value,
  onPress,
  containerProps,
  variant,
  isDisabled = false,
}: InputPickerProps) => {
  const { t } = useTranslation();
  return (
    <Box
      backgroundColor={"white"}
      paddingHorizontal={"m"}
      paddingVertical={"m"}
      borderRadius={"l"}
      flexDirection="row"
      alignItems="center"
      overflow={"hidden"}
      {...containerProps}
    >
      <Box flexDirection={"column"} flex={2}>
        <Text variant={variant ? variant : "btn2"}>{label}</Text>
      </Box>
      <Box flexDirection={"column"} flex={2} alignItems="flex-end">
        <TextLink isDisabled={isDisabled} variant="primary" onPress={onPress}>
          {value ? value : t("common.select.label", "Choisir")}
        </TextLink>
      </Box>
    </Box>
  );
};
