import { Box, BoxProps, Icon } from "pearl-ui";
import React, { FC, memo, PropsWithChildren } from "react";
export const DotsDivider = memo(({ color, size = "l" }) => (
  <Box marginVertical={"n"} marginLeft={"m"}>
    <Icon
      iconFamily="Entypo"
      iconName="dots-two-vertical"
      color={color}
      size={size}
      opacity={0.8}
    />
  </Box>
));