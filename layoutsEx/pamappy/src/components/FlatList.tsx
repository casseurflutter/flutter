import React from "react";
import {
  FlatList as NativeFlatList,
  FlatListProps as RNFlatListProps,
  RefreshControl,
} from "react-native";
import { NativeViewGestureHandlerProperties } from "react-native-gesture-handler";
import { uid } from "react-uid";

export type FlatListProps<T> = NativeViewGestureHandlerProperties &
  RNFlatListProps<T> & {
    onFetchMore?: () => void;
  };

export function FlatList<T>({
  ListEmptyComponent,
  refreshing,
  onRefresh,
  onFetchMore,
  ...rest
}: FlatListProps<T>) {
  // const props = useRestyle(defaultRestyleFunctions, rest);

  // const _onEndReached = React.useCallback(
  //   () => {
  //     if (
  //       !loading &&
  //       networkStatus !== NetworkStatus.refetch &&
  //       networkStatus !== NetworkStatus.fetchMore &&
  //       onFetchMore
  //     ) {
  //       onFetchMore();
  //     }
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [loading, networkStatus]
  // );
  return (
    <NativeFlatList<T>
      // @ts-ignore
      refreshControl={
        // @ts-ignore
        onRefresh ? (
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        ) : undefined
      }
      keyExtractor={(item) => uid(item)}
      ListEmptyComponent={ListEmptyComponent ? ListEmptyComponent : null}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...rest}
    />
  );
}
