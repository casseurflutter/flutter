import React, { useEffect, useState } from "react";
import { Switch as SwitchNative } from "react-native";

type SwitchProps = {
  value?: boolean;
  onValueChange?: (v: boolean) => void;
  disabled?: boolean;
};
export const Switch = ({
  value = false,
  onValueChange,
  disabled = false,
}: SwitchProps) => {
  const [isEnabled, setIsEnabled] = useState(value);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (onValueChange) onValueChange(!isEnabled);
  };
  useEffect(() => {
    setIsEnabled(value);
  }, [value]);
  return (
    <SwitchNative
      disabled={disabled}
      trackColor={{ false: "#C7CDCD", true: "#32D74B" }}
      thumbColor="white"
      ios_backgroundColor="#f8f8f8"
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
};
