import { Image } from "pearl-ui";
import React, { FC } from "react";

import { attachmentFileToURL } from "../api/config";
import { useAuth } from "../hooks/useAuth";

export const Avatar: FC<any> = (props: any) => {
  const { accessToken } = useAuth();
  return (
    <Image
      style={{
        width: 37,
        height: 37,
      }}
      source={{
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        uri: attachmentFileToURL(props.url),
      }}
    ></Image>
  );
};
