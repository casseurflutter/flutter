import dayjs from "dayjs";
import { startCase } from "lodash";
import { Box, Divider, Text } from "pearl-ui";
import React, { FC } from "react";

import Heatbeat from "../assets/heatbeat";
import { Card } from "./Card";
type EventCardProps = {
  item: any;
};

export const EventCard: FC<any> = ({ item }) => {
  return (
    <Card borderRadius="m" p="s" marginVertical="s" withShadow={false}>
      <Text pb="s" pl="s" variant="st1" color="vert">
        {startCase(dayjs(item.date).format("dddd"))}
      </Text>
      <Divider />

      <Box m="s" flexDirection="row" justifyContent="space-between">
        <Box flexDirection="row">
          <Heatbeat width={24} height={24} />
          <Text variant="st2" color="gray6" ml="s">
            {item.title}
          </Text>
        </Box>
        <Text color="black" variant="st2">
          {dayjs(item.date).format("HH:mm")}
        </Text>
      </Box>
    </Card>
  );
};
