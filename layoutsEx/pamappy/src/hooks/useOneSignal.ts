import { useEffect } from "react";
import OneSignal from "react-native-onesignal";

import { useGetUsersMe } from "~api";

export const useOneSignal = () => {
  const { data } = useGetUsersMe();

  useEffect(() => {
    if (data && data.data) {
      OneSignal.setExternalUserId(data.data._id);
    }
  }, [data]);
};
