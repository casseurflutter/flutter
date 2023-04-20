import { useEffect } from "react";
import Purchases, {
  CustomerInfo,
  PurchasesOffering,
} from "react-native-purchases";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { useTimer } from "use-timer";

import { useGetUsersMe, usePostUsersUpdateSubsription } from "../api/hooks";

type PurchaseState = {
  initialized: boolean;
  currentOffering: PurchasesOffering | undefined;
  customerInfo?: CustomerInfo | undefined;
};

const purchaseAtomState = atom<PurchaseState>({
  key: "purchaseAtom", // unique ID (with respect to other atoms/selectors)
  default: {
    initialized: false,
    currentOffering: undefined,
    customerInfo: undefined,
  },
});

const purchasingAtomState = atom<boolean>({
  key: "isPurchasingAtom", // unique ID (with respect to other atoms/selectors)
  default: false,
});

export function usePurchase() {
  const [purchaseState, setPurchaseState] = useRecoilState(purchaseAtomState);
  const [isPurchasing, setIsPurchasing] = useRecoilState(purchasingAtomState);
  const { time, start, pause, reset } = useTimer({
    initialTime: 100,
    timerType: "DECREMENTAL",
    interval: 3000,
    onTimeUpdate: () => {
      console.log("Time is updated", time);
      checkPurchase();
    },
    onTimeOver: () => {
      console.log("Time is over");
      setIsPurchasing(false);
      reset();
    },
  });

  const { data, status, refetch } = useGetUsersMe({
    onSuccess: ({ data }) => {
      if (!purchaseState.initialized && data) {
        fetchData().catch(console.log);
      }
    },
  });
  const mutation = usePostUsersUpdateSubsription({
    onSuccess: () => {
      refetch();
    },
  });

  const updateCurrentUser = async (customerInfo: CustomerInfo) => {
    if (customerInfo && customerInfo.entitlements.active.premium) {
      const premium = customerInfo.entitlements.active.premium;
      await mutation.mutateAsync({
        requestBody: {
          expirationDate: premium.expirationDate
            ? new Date(premium.expirationDate)
            : new Date(),
          isActive: premium.isActive,
          subscriptionType:
            premium.productIdentifier === "solo_monthly_subscription"
              ? "solo"
              : "duo",
        },
      });
    } else {
      await mutation.mutateAsync({
        requestBody: {
          expirationDate: null,
          isActive: false,
          subscriptionType: null,
        },
      });
    }
  };

  const checkPurchase = async () => {
    const customerInfo = await Purchases.getCustomerInfo();

    if (customerInfo && customerInfo.entitlements.active.premium) {
      await updateCurrentUser(customerInfo);
      reset();
      setIsPurchasing(false);
    }
  };

  const fetchData = async () => {
    const offerings = await Purchases.getOfferings();
    const customerInfo = await Purchases.getCustomerInfo();

    if (offerings) {
      setPurchaseState({
        customerInfo,
        initialized: true,
        isPurchase: false,
        currentOffering:
          data?.data.gender == "female"
            ? offerings.all.solo_offerting
            : offerings.all.duo_offerting,
      });
    }

    await updateCurrentUser(customerInfo);
  };

  const handleCustomerInfoUpdate = (info: CustomerInfo) => {
    console.log("handleCustomerInfoUpdate called");
    if (info) {
      updateCurrentUser(info);
    }

    setPurchaseState({
      ...purchaseState,
      customerInfo: info,
    });
    setIsPurchasing(false);
  };

  useEffect(() => {
    if (isPurchasing) {
      start();
    } else {
      cancelPurchasing();
    }
  }, [isPurchasing]);

  const cancelPurchasing = () => {
    console.log("cancelPurchasing");
    setIsPurchasing(false);
    pause();
  };

  return {
    purchaseState,
    handleCustomerInfoUpdate,
    isPurchasing,
    cancelPurchasing,
  };
}

export const usePurchaseState = () => useRecoilValue(purchaseAtomState);

export const usePurchasingState = () => useRecoilState(purchasingAtomState);
