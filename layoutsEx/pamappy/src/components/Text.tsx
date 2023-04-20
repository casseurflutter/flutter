import { Text, TextLink, TextLinkProps, TextProps } from "pearl-ui";
import React from "react";

export const H1 = (props: TextProps) => <Text variant="h1" {...props} />;

export const H2 = (props: TextProps) => <Text variant="h2" {...props} />;

export const H3 = (props: TextProps) => <Text variant="p2" {...props} />;

export const H4 = (props: TextProps) => <Text variant="p2" {...props} />;
export const P = (props: TextProps) => (
  <Text color="gray7" variant="p2" {...props} />
);

export const Link = (props: TextLinkProps) => <TextLink {...props} />;
