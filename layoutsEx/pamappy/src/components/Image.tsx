import { Box, BoxProps, Icon } from "pearl-ui";
import React, { FC, useState } from "react";
import { Image as RNImage, ImageProps as RNImageProps } from "react-native";
import { createImageProgress } from "react-native-image-progress";
import * as Progress from "react-native-progress";

const NativeImage = createImageProgress(RNImage);

import { BusyIndicator } from "./Busy";
function ImageFallBack(props: BoxProps) {
  return (
    <Box
      alignContent="center"
      alignItems="center"
      justifyContent="center"
      bg="gray2"
      p="s"
      borderRadius="full"
      {...props}
    >
      <Icon
        iconFamily="FontAwesome5"
        iconName="exclamation-triangle"
        color="gray6"
        size="m"
      />
    </Box>
  );
}
export const ImagePlaceHolder = () => {
  return (
    <Box
      alignContent="center"
      alignItems="center"
      justifyContent="center"
      bg="gray2"
      p="s"
      borderRadius="full"
    >
      <BusyIndicator
        styleIndicator={{
          size: "small",
        }}
        bg="transparent"
      />
    </Box>
  );
};
export type ImageProps = RNImageProps & {
  renderError?: () => React.ReactNode;
};

export const Image: FC<any> = ({
  renderError,
  source,
  indeterminate,
  style,
  ...rest
}: ImageProps) => {
  const [state, setState] = useState({
    loading: false,
    error: false,
  });
  return (
    <Box>
      {state.error ? (
        renderError ? (
          renderError()
        ) : (
          <ImageFallBack />
        )
      ) : (
        <NativeImage
          {...rest}
          style={style}
          indicatorProps={{
            size: 20,
            indeterminate: true,
          }}
          indicator={Progress.Circle}
          source={source}
        />
      )}
    </Box>
  );
};
