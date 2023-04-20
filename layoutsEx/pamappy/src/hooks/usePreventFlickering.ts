import React from "react";

export function usePreventFlickering(refetch: () => Promise<unknown>) {
  const [isRefetching, setIsRefetching] = React.useState(false);

  async function handleRefetch() {
    setIsRefetching(true);

    try {
      await refetch();
    } finally {
      setIsRefetching(false);
    }
  }

  return {
    isRefetching,
    handleRefetch,
  };
}
