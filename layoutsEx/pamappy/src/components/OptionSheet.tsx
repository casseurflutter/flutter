import { useKeyboard } from "@react-native-community/hooks";
import { Box, Icon, Pressable, Text } from "pearl-ui";
import React, {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { Keyboard, ListRenderItem } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { uid } from "react-uid";

export type OptionSheetItem = {
  label: string;
  value: string;
};

type OptionSheetProps = PropsWithChildren<any> & {
  items: OptionSheetItem[];
  value: any;
  onSelected: (i: OptionSheetItem) => void;
  editable?: boolean;
  showInfoBox?: () => void;
};

export type OptionSheetHandle = {
  show: () => void;
};

export const OptionSheetForward: React.ForwardRefRenderFunction<
  OptionSheetHandle,
  OptionSheetProps
> = (
  {
    items,
    value,
    onSelected,
    title,
    message,
    children,
    editable = true,
    showInfoBox,
  },
  ref
) => {
  const insets = useSafeAreaInsets();
  const refBottomSheet = useRef<Modalize | null>(null);
  const { keyboardShown } = useKeyboard();

  const handleOnClosed = () => {};

  const handleOnSelect = (i: OptionSheetItem) => {
    refBottomSheet.current?.close();
    onSelected(i);
  };

  useImperativeHandle(ref, () => ({
    show: () => {
      refBottomSheet?.current?.open();
    },
  }));

  const renderItem: ListRenderItem<OptionSheetItem> = ({ item }) => {
    const selected = value == item.value;
    return (
      <Pressable
        marginHorizontal="m"
        paddingVertical="m"
        flexDirection="row"
        flex={1}
        alignContent="center"
        onPress={() => handleOnSelect(item)}
      >
        <Box flex={1}>
          <Text>{item.label}</Text>
        </Box>
        <Icon
          iconFamily="FontAwesome5"
          iconName={selected ? "dot-circle" : "circle"}
          size="l"
          color={selected ? "blueNavigation" : "gray4"}
        />
      </Pressable>
    );
  };

  const handleToogle = () => {
    if (keyboardShown) {
      Keyboard.dismiss();
    }
    refBottomSheet.current?.open();
  };

  const ListHeaderComponent = () => {
    if (!title && !message) {
      return null;
    }

    return (
      <Box marginHorizontal="m">
        <Box alignItems="flex-start" paddingTop="l" paddingBottom="m">
          {!!title && <Text variant="t1">{title}</Text>}
          {!!message && <Text>{message}</Text>}
        </Box>
      </Box>
    );
  };

  const ItemSeparatorComponent = useMemo(
    // eslint-disable-next-line react/display-name
    () => () => <Box borderBottomColor="gray3" borderBottomWidth={1} />,
    []
  );

  return (
    <>
      {children ? (
        <Pressable onPress={editable ? handleToogle : showInfoBox}>
          {children}
        </Pressable>
      ) : null}
      <Portal>
        <Modalize
          onClosed={handleOnClosed}
          withHandle={false}
          ref={refBottomSheet}
          adjustToContentHeight
          flatListProps={{
            ListHeaderComponent,
            data: items,
            renderItem,
            ItemSeparatorComponent,
            contentContainerStyle: {
              paddingBottom: insets.bottom,
            },
            keyExtractor: (item, index) => uid(item, index),
          }}
        ></Modalize>
      </Portal>
    </>
  );
};

export const OptionSheet = forwardRef(OptionSheetForward);
