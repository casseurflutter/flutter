import { Platform } from "react-native";

import * as Calendar from "./calendar";

export const getDefaultCalendar = async () => {
  if (Platform.OS === "android") {
    return await getDefaultCalendarAndroid();
  } else {
    return await getDefaultCalendarSource();
  }
};

const getDefaultCalendarAndroid = async () => {
  try {
    let Calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );
    return Calendars[0].id;
  } catch (error) {
    console.log("Error getDefaultCalendarAndroid", error);
  }
};
export async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.id;
}
