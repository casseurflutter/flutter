import { Box, Icon, Pressable, Text } from "pearl-ui";
import React from "react";

import Bird from "../assets/bird.svg";
export type RowItemProps = {
  selected: boolean;
  value: string;
  iconPrefix?: boolean;
  onPress: () => void;
};
export const RowItem = ({
  iconPrefix,
  selected,
  value,
  onPress,
}: RowItemProps) => (
  <Pressable onPress={onPress}>
    <Box alignItems="center" py="m" px="m" flexDirection="row">
      {iconPrefix ? (
        <Box mr="m">
          <Bird width={30} height={22} fill="#2FB0ED" />
        </Box>
      ) : (
        <Box flex={1}></Box>
      )}

      <Box
        justifyContent={iconPrefix ? "flex-start" : "center"}
        flexDirection="row"
        flex={2}
      >
        <Text variant="p2">{value}</Text>
      </Box>

      <Box justifyContent="center" alignItems="flex-end" mr="s" flex={1}>
        {selected && (
          <Icon
            color={"brand"}
            size="l"
            iconFamily="Ionicons"
            iconName="checkmark"
          />
        )}
      </Box>
    </Box>
  </Pressable>
);
