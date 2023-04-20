import { Box, BoxProps, Text, TextProps } from "pearl-ui";
import React, { FC, memo, PropsWithChildren } from "react";

type CardProps = PropsWithChildren<any> &
  BoxProps & {
    withShadow?: boolean;
  };

const shadowProps: Partial<BoxProps> = {
  shadowOpacity: 0.22,
  shadowRadius: 15,
  elevation: 3,
  shadowOffset: { width: 0, height: 1 },
};
export const Card: FC<CardProps> = memo(
  ({ children, withShadow = true, ...props }) => (
    <Box
      backgroundColor="white"
      borderRadius="m"
      // {...(withShadow ? shadowProps : {})}
      {...props}
    >
      {children}
    </Box>
  )
);

type TitleProps = TextProps & {
  value?: string;
};
function Title({ value, children, ...props }: TitleProps) {
  return (
    <Box flexDirection="row">
      <Text {...props}>{value}</Text>
      {children}
    </Box>
  );
}
function Container(props: BoxProps) {
  return (
    <Box
      flexDirection="row"
      // justifyContent="space-between"
      {...props}
    />
  );
}
type CardItemHeaderProps = {
  title: string;
  containerProps?: BoxProps;
};

export const CardItemHeader: FC<CardItemHeaderProps> = memo(
  ({ title, containerProps }) => (
    <Container {...containerProps}>
      <Box flexDirection="row" alignItems="center">
        <Title variant="h2" value={title} />
      </Box>
    </Container>
  )
);
