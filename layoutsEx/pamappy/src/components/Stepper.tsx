import { Box, Icon, IconProps, Pressable } from "pearl-ui";
import React, { ReactElement, useEffect, useState } from "react";
import { TextInput } from "react-native";

type StepButtonProps = {
  onPress?: () => void;
  iconProps: IconProps;
  disabled: boolean;
  hasValue?: boolean;
};

export const StepButton: React.FC<StepButtonProps> = ({
  onPress,
  iconProps,
  hasValue,
  disabled,
}: StepButtonProps) => {
  return (
    <Pressable
      p="m"
      bg={hasValue ? "blueNavigation" : "athensGray"}
      isDisabled={disabled}
      onPress={onPress}
    >
      {({ pressed }) => (
        <Box
          opacity={pressed || disabled ? 0.4 : 1}
          borderRadius="full"
          height={35}
          alignItems="center"
          justifyContent="center"
          width={35}
          backgroundColor="primary"
        >
          <Icon {...iconProps} size="l" color={hasValue ? "white" : "gray8"} />
        </Box>
      )}
    </Pressable>
  );
};

type StepperProps = {
  initialValue?: string;
  stepValue?: string;
  maxValue?: string;
  minValue?: string;
  renderText?: (v: number) => ReactElement<any, any>;
  onValueChange: (value: string) => void;
  disabled?: boolean;
};

export function Stepper({
  stepValue = "1",
  onValueChange,
  maxValue = "999",
  minValue = "0",
  initialValue,
  disabled = false,
  renderText,
}: StepperProps) {
  const [value, setValue] = useState<string | undefined>("0");
  useEffect(() => {
    if (parseInt(initialValue) > 0) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const onIncrement = () => {
    if (!value) return;
    let newValue = parseInt(value) + parseInt(stepValue);
    onValueChange(newValue.toString());
    setValue(newValue.toString());
  };
  const handeChangeInput = (value: string) => {
    setValue(value.toString());
    onValueChange(value.toString());
  };
  const onDecrement = () => {
    if (!value) return;
    let newValue = parseInt(value) - parseInt(stepValue);
    onValueChange(newValue.toString());
    setValue(newValue.toString());
  };
  return (
    <Box flexDirection="row" alignItems="center">
      <StepButton
        disabled={value == minValue || disabled}
        onPress={onDecrement}
        iconProps={{
          iconFamily: "FontAwesome",
          iconName: "minus",
        }}
      />
      <TextInput
        style={{
          height: 60,
          width: 100,
          fontSize: 40,
        }}
        maxLength={3}
        textAlign="center"
        value={value}
        keyboardType="numeric"
        onChangeText={handeChangeInput}
      ></TextInput>

      <StepButton
        hasValue={value != "0"}
        disabled={value == maxValue || disabled}
        onPress={onIncrement}
        iconProps={{
          iconFamily: "FontAwesome",
          iconName: "plus",
        }}
      />
    </Box>
  );
}
