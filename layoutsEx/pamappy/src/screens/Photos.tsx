import { useActionSheet } from "@expo/react-native-action-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { Box, Icon, Pressable, Text } from "pearl-ui";
import React, { FC, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Linking, Platform } from "react-native";
import Lightbox from "react-native-lightbox-v2";
import { useQueryClient } from "react-query";

import { attachmentFileToURL, getPicturesAll } from "~api";
import { BusyIndicator, FlatList, Image } from "~components";
import { NavigatorParamList } from "~navigation";

import {
  useDeletePicturesId,
  useGetPicturesAll,
  useGetUsersMe,
  usePostPictures,
} from "../api/hooks";
import { useAuth } from "../hooks/useAuth";
import { usePreventFlickering } from "../hooks/usePreventFlickering";
import { useUpload } from "../hooks/useUpload";

export const PictureItem = ({
  idUser,
  onDelete,
  item,
  borderRadius,
  style,
}: any) => {
  const { accessToken } = useAuth();
  return (
    <Lightbox
      renderHeader={(onclose) => (
        <Box
          px={Platform.select({ ios: "l", android: "m" })}
          py={Platform.select({ ios: "xl", android: "l" })}
          flex={1}
          justifyContent="space-between"
          flexDirection="row"
        >
          <Pressable p="s" onPress={onclose}>
            <Icon
              iconFamily="FontAwesome5"
              iconName="times"
              size="l"
              color={"white"}
            />
          </Pressable>
          {onDelete && item?.user == idUser ? (
            <Pressable p="s" onPress={() => onDelete(item._id, onclose)}>
              <Icon
                iconFamily="FontAwesome5"
                iconName="trash"
                size="l"
                color={"danger"}
              />
            </Pressable>
          ) : null}
        </Box>
      )}
      renderContent={() => (
        <Image
          resizeMode={"contain"}
          style={{
            width: "100%",
            height: "100%",
          }}
          source={{
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
            uri: attachmentFileToURL(item._id),
          }}
        />
      )}
    >
      <Image
        borderRadius={borderRadius}
        style={{
          width: 125,
          height: 125,
          ...style,
        }}
        source={{
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          uri: attachmentFileToURL(item._id),
        }}
      />
    </Lightbox>
  );
};
export const PhotosScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "photos">
> = ({ navigation }) => {
  const { t } = useTranslation();
  const query = useGetPicturesAll();
  const queryClient = useQueryClient();
  const { isRefetching, handleRefetch } = usePreventFlickering(query.refetch);
  const addPicture = usePostPictures({
    onSettled: () => {
      queryClient.invalidateQueries(getPicturesAll.key);
    },
  });
  const deletePicture = useDeletePicturesId({
    onSettled: () => {
      queryClient.invalidateQueries(getPicturesAll.key);
    },
  });
  const { upload } = useUpload();
  const { showActionSheetWithOptions } = useActionSheet();
  const { data, isLoading, refetch } = useGetUsersMe();
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  useEffect(() => {
    navigation.setOptions({
      title: t("screen.photos.title", "Gallerie"),
      headerRight: () => (
        <Pressable
          alignItems="flex-end"
          justifyContent="center"
          w={50}
          h={40}
          onPress={() => showActionsSheet()}
        >
          <Icon
            mr="m"
            iconFamily="FontAwesome5"
            iconName="plus-square"
            size="l"
            color={"white"}
          />
        </Pressable>
      ),
    });
  }, [navigation, t, response]);
  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.cancelled) {
      await onSubmit(result?.uri);
    }
  };
  const askPermissionCamera = async () => {
    if (!response?.canAskAgain) {
      Alert.alert(
        t(
          "screen.settings.alert.ask-permission-camera.title",
          "Merci de vérifier l'autorisation à votre camera"
        ),
        "",
        [
          { text: t("common.button.cancel", "Annuler") },
          {
            text: t(
              "screen.settings.alert.ask-permission.button.settings",
              "Paramètres"
            ),
            onPress: () => {
              Linking.openSettings();
            },
          },
        ]
      );
    }
    return await requestPermission();
  };
  const onSubmit = async (file: string) => {
    try {
      let uri = await upload(file);
      if (uri) {
        await addPicture.mutate({
          requestBody: {
            _id: uri.id,
          },
        });
      }
    } catch (error) {
      console.log("err upload", error);
    }
  };
  const showActionsSheet = () => {
    showActionSheetWithOptions(
      {
        options: [
          t(
            "screen.settings.action-sheet.choose-picture.label",
            "Choisir dans la galerie photo"
          ),
          t(
            "screen.settings.action-sheet.take-picture.label",
            "Prendre une photo"
          ),
          t("common.button.cancel", "Annuler"),
        ],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 2,
      },
      async (buttonIndex) => {
        if (buttonIndex == 0) {
          await selectImage();
        } else if (buttonIndex == 1) {
          const { granted } = await askPermissionCamera();
          if (granted) {
            const result = await ImagePicker.launchCameraAsync();
            if (!result.cancelled) {
              await onSubmit(result?.uri);
            }
          }
        }
      }
    );
  };
  const onDeletePhoto = (imageId: string, close: () => void) => {
    Alert.alert(
      t(
        "screen.photos.alert.title",
        "Veux-tu vraiment supprimer cette photo ?"
      ),
      "",
      [
        {
          text: t("common.cancel", "Annuler"),
          style: "cancel",
        },
        {
          text: t("common.delete", "Supprimer"),
          onPress: () => {
            deletePicture.mutate({
              id: imageId,
            });
            close();
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };
  const renderItem = useMemo(
    () =>
      ({ item }: any) =>
        (
          <PictureItem
            idUser={data?.data?._id}
            item={item}
            onDelete={onDeletePhoto}
          />
        ),
    []
  );
  const renderEmpty = () => (
    <Box py="m" px="m" flex={1}>
      <Box alignItems={"center"}>
        <Icon
          iconFamily="FontAwesome5"
          iconName="image"
          size="xxl"
          color={"gray8"}
        />
        <Text color="gray8" variant="t2">
          {t("screen.photos.empty-gallery.title", "Ta galerie est vide")}
        </Text>
        <Text textAlign="center" color="gray8" variant="p2">
          {t(
            "screen.photos.empty-gallery.subtitle",
            "Une fois que tu as pris une photo, tu peux la trouver ici"
          )}
        </Text>
      </Box>
    </Box>
  );

  return (
    <Box flex={1} backgroundColor="grayBackground">
      {query.isLoading ? (
        <BusyIndicator />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={3}
          contentContainerStyle={{
            paddingVertical: 15,
            paddingHorizontal: 10,
          }}
          ListEmptyComponent={renderEmpty()}
          data={query?.data?.data}
          refreshing={isRefetching}
          onRefresh={handleRefetch}
          renderItem={renderItem}
        />
      )}
    </Box>
  );
};
