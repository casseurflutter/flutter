import { Box, BoxProps } from "pearl-ui";
import React, { FC, PropsWithChildren } from "react";
export const Divider: FC<PropsWithChildren<any> & BoxProps> = ({
  children,
  isFullWidth,
  backgroundColor = "dividerColor",
  ...props
}) => (
  <Box
    {...props}
    width={isFullWidth ? "100%" : "95%"}
    alignSelf="flex-end"
    height={0.5}
    backgroundColor={backgroundColor}
  />
);
