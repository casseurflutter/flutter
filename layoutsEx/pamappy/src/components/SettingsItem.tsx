import {
  Box,
  BoxProps,
  Icon,
  IconProps,
  Pressable,
  Text,
  TextProps,
} from "pearl-ui";
import * as React from "react";
interface WrapperProps {
  testID?: string;
  onPress?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

function Wrapper({ testID, onPress, children, disabled }: WrapperProps) {
  return (
    <Box marginVertical={"n"}>
      {onPress ? (
        <Pressable isDisabled={disabled} onPress={onPress}>
          {({ pressed }) => <Box opacity={pressed ? 0.5 : 1}>{children}</Box>}
        </Pressable>
      ) : (
        <Box>{children}</Box>
      )}
    </Box>
  );
}

type TitleProps = TextProps & {
  value?: string | React.ReactNode | null | undefined | Element;
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
type TextValueProps = TextProps & {
  value: string;
} & Omit<WrapperProps, "children">;

function TextValue(props: TextProps) {
  return <Text color="gray6" {...props} />;
}
type BaseProps = {
  title: string;
  containerProps?: BoxProps;
} & Omit<WrapperProps, "children">;

export function SettingsItemHeader({
  title,
  containerProps,
  ...props
}: BaseProps) {
  return (
    <Container {...containerProps}>
      <Box flexDirection="row" alignItems="center">
        <Title variant="st1" color="gray8" value={title} />
      </Box>
    </Container>
  );
}

type SettingsItemProps = WrapperProps & {
  showChevron?: boolean;
  icon?: IconProps;
} & BaseProps;

type SettingsItemTextValueProps = {
  value?: string | Text | undefined | null;
  showChevron?: boolean;
  icon?: IconProps;
  titleProps?: TextProps;
  TextProps?: TextProps;
  warn?: boolean;
} & BaseProps;

export function SettingsItemTextValue({
  testID,
  title,
  titleProps,
  value,
  showChevron = false,
  warn,
  disabled,
  icon,
  onPress,
  TextProps,
}: SettingsItemTextValueProps) {
  return (
    <Wrapper testID={testID} onPress={onPress} disabled={disabled}>
      <Container justifyContent="space-between" py="s" p="m">
        <Box>
          <Text {...titleProps} variant="p2">
            {title}
          </Text>
        </Box>
        <Box alignItems="flex-end" flex={1}>
          {value ? (
            <TextValue
              {...titleProps}
              numberOfLines={1}
              color="blueNavigation"
              variant="p2"
            >
              {value}
            </TextValue>
          ) : null}
        </Box>

        {showChevron && (
          <Icon
            iconFamily="Ionicons"
            iconName="chevron-forward"
            color="blueNavigation"
            size="l"
            {...titleProps}
          />
        )}
      </Container>
    </Wrapper>
  );
}
