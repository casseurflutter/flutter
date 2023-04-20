import {
  Box,
  BoxProps,
  layout,
  Pressable,
  Text,
  useStyledProps,
} from "pearl-ui";
import React, { useEffect } from "react";
import { Animated, Dimensions, I18nManager } from "react-native";

export const AnimatedBox = Animated.createAnimatedComponent<typeof Box>(Box);

type SegmentedControlProps = BoxProps & {
  values: string[];
  onChange: (index: number) => void;
  selectedIndex: number;
  disabled?: boolean;
};

export function SegmentedControl({
  width,
  onChange,
  values,
  selectedIndex,
  disabled = false,
  ...props
}: SegmentedControlProps) {
  const passedProps = useStyledProps(props, [layout]);

  const widthProp = passedProps.width ?? Dimensions.get("screen").width - 32;

  const translateValue = (widthProp - 4) / values?.length;
  const [tabTranslate, setTabTranslate] = React.useState(new Animated.Value(0));

  // useCallBack with an empty array as input, which will call inner lambda only once and memoize the reference for future calls
  const memoizedTabPressCallback = React.useCallback(
    (index) => {
      onChange && onChange(index);
    },
    [onChange]
  );

  useEffect(() => {
    // If phone is set to RTL, make sure the animation does the correct transition.
    const transitionMultiplier = I18nManager.isRTL ? -1 : 1;

    // Animating the active index based current index
    Animated.spring(tabTranslate, {
      toValue: selectedIndex * (transitionMultiplier * translateValue),
      stiffness: 150,
      damping: 20,
      mass: 1,
      useNativeDriver: true,
    }).start();
  }, [selectedIndex]);

  return (
    <AnimatedBox
      flexDirection={"row"}
      alignItems={"center"}
      width={width}
      maxHeight={45}
      borderRadius="m"
      paddingVertical="s"
      backgroundColor="neutral.300"
    >
      <AnimatedBox
        position="absolute"
        left={0}
        right={0}
        top={0}
        bottom={0}
        backgroundColor={disabled ? "gray1" : "white"}
        borderRadius="m"
        style={[
          {
            width: (widthProp - 8) / values?.length,
            marginVertical: 2,
            marginHorizontal: 2,
          },
          {
            transform: [
              {
                translateX: tabTranslate,
              },
            ],
          },
        ]}
      />
      {values.map((tab, index) => {
        const isCurrentIndex = selectedIndex === index;
        return (
          <Pressable
            key={index}
            paddingHorizontal="m"
            isDisabled={disabled}
            onPress={() => memoizedTabPressCallback(index)}
          >
            <Text
              numberOfLines={1}
              variant="caption"
              textAlign="center"
              color={
                isCurrentIndex && !disabled ? "neutral.800" : "neutral.500"
              }
            >
              {tab}
            </Text>
          </Pressable>
        );
      })}
    </AnimatedBox>
  );
}

