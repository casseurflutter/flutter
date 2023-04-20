import React, { memo, useCallback } from "react";
import { CustomerInfo } from "react-native-purchases";

import { usePurchase } from "~hooks";

import useOnCustomerInfoChange from "../hooks/useOnCustomerInfoChange";
import { BusyIndicatorOverlay } from "./Busy";

export const isSubscribed = (customerInfo: CustomerInfo) =>
  Object.entries(customerInfo.entitlements.active).length;

function SubscriptionCheck() {
  const { isPurchasing, handleCustomerInfoUpdate, cancelPurchasing } =
    usePurchase();

  const checkCustomerSubscription = useCallback(
    (customerInfo: CustomerInfo) => {
      console.log("checkCustomerSubscription");
      handleCustomerInfoUpdate(customerInfo);
    },
    []
  );

  useOnCustomerInfoChange(checkCustomerSubscription);

  if (isPurchasing) {
    return (
      <BusyIndicatorOverlay
        style={{ backgroundColor: "black", opacity: 0.8 }}
        onCancel={cancelPurchasing}
      />
    );
  }
  return null;
}

export default memo(SubscriptionCheck);
