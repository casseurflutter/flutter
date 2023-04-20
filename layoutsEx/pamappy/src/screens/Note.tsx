import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik, FormikHelpers } from "formik";
import { Box, Divider, Input, TextLink } from "pearl-ui";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Pressable } from "react-native";
import { useQueryClient } from "react-query";
import * as yup from "yup";

import { getNotesAll } from "~api";
import { BusyIndicator, HeaderFormSubmit } from "~components";
import { NavigatorParamList } from "~navigation";

import {
  useDeleteNotesId,
  useGetNotesId,
  useGetUsersMe,
  usePostNotes,
  usePutNotesId,
} from "../api/hooks";
import Bird from "../assets/bird.svg";
import Ellipse from "../assets/Ellipse.svg";

type NoteFormValue = {
  title: string;
  content: string;
  tag: number;
  archived: boolean | undefined;
};

export const colors = [
  { id: 0, hex: "#61BBE6" },
  { id: 1, hex: "#4EC19F" },
  { id: 2, hex: "#F5A623" },
  { id: 3, hex: "#DD4773" },
  { id: 4, hex: "#D7D7D7" },
];

export const NoteScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "note">
> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useGetUsersMe();
  const {
    data: note,
    isLoading: loading,
    isFetching,
  } = useGetNotesId(route?.params?.id, {
    onError: (e) => {},
    enabled: route.params?.id != undefined,
  });

  const createNote = usePostNotes({
    onError: (e) => {
      Alert.alert(
        t("alert.error.title", "Erreur"),
        t(
          "alert.error.500.message",
          "Une erreur technique est survenue,merci de réessayer ultérieurement."
        ),
        [{ text: t("alert.error.500.button.ok", "Ok") }]
      );
    },
    onSuccess: () => {
      navigation.goBack();
    },
    onSettled: () => {
      queryClient.invalidateQueries(getNotesAll.key);
    },
  });
  const editNote = usePutNotesId({
    onSuccess: () => {
      navigation.goBack();
    },
    onSettled: () => {
      queryClient.invalidateQueries(useGetNotesId.key);
    },
  });

  const deleteNote = useDeleteNotesId({
    onError: (e) => {
      Alert.alert(
        t("alert.error.title", "Erreur"),
        t(
          "alert.error.500.message",
          "Une erreur technique est survenue,merci de réessayer ultérieurement."
        ),
        [{ text: t("alert.error.500.button.ok", "Ok") }]
      );
    },
    onSuccess: () => {
      navigation.goBack();
    },
    onSettled: () => {
      queryClient.invalidateQueries(getNotesAll.key);
    },
  });

  const onSubmit = async (
    values: NoteFormValue,
    formikHelpers: FormikHelpers<NoteFormValue>
  ) => {
    let schema = yup.object().shape(
      {
        title: yup.string().when("content", {
          is: (content) => !content || content.length === 0,
          then: yup
            .string()
            .trim()
            .required(
              t(
                "screen.note.form-error.label",
                "Au moins un des champs est obligatoire"
              )
            ),
        }),
        content: yup.string().when("title", {
          is: (title) => !title || title.length === 0,
          then: yup
            .string()
            .trim()
            .required(
              t(
                "screen.note.form-error.label",
                "Au moins un des champs est obligatoire"
              )
            ),
        }),
      },
      ["title", "content"]
    );
    try {
      const isValid = await schema.validate({
        title: values.title,
        content: values.content,
      });
      formikHelpers.setSubmitting(true);
      if (route.params?.id) {
        await editNote.mutate({
          id: route.params.id,
          requestBody: {
            title: values.title,
            content: values.content.trim(),
            date: new Date().toISOString(),
            tag: values.tag,
            archived: values.archived,
          },
        });
      } else {
        await createNote.mutate({
          requestBody: {
            title: values.title,
            content: values.content.trim(),
            date: new Date().toISOString(),
            tag: values.tag,
            archived: false,
          },
        });
      }
    } catch (err) {
      Alert.alert(
        t("screen.alert.my-info.error.title", "Validation"),
        err?.errors[0],
        [{ text: t("alert.button.ok", "Ok") }]
      );
    }
  };
  const handleReactive = () => {
    Alert.alert(
      t("screen.note.alert.active.title", "Activer"),
      t(
        "screen.note.alert.active.message",
        "Souhaitez-vous réellement réactiver cette note ?"
      ),
      [
        { text: t("common.button.cancel", "Annuler") },

        {
          text: t("screen.note.alert.active.title", "Activer"),
          onPress: () => {
            handleArchive(false);
          },
        },
      ]
    );
  };

  const handleArchive = async (value: boolean) => {
    await editNote.mutate({
      id: route.params.id,
      requestBody: {
        archived: value,
      },
    });
  };
  const handleDelete = () => {
    Alert.alert(
      t("screen.note.alert.delete.title", "Supprimer"),
      t(
        "screen.note.alert.delete.message",
        "Souhaitez-tu réellement supprimer cette note ?"
      ),
      [
        { text: t("common.button.cancel", "Annuler") },

        {
          text: t("screen.note.alert.delete.title", "Supprimer"),
          style: "destructive",
          onPress: () => {
            deleteNote.mutate({
              id: route.params?.id,
            });
          },
        },
      ]
    );
  };

  if (isLoading || loading || isFetching) {
    return <BusyIndicator />;
  }
  const isEditable = note?.data?.user?._id === user?.data._id;
  return (
    <Box
      flex={1}
      backgroundColor={"white"}
      borderTopColor={"gray2"}
      borderTopWidth={1}
    >
      <Formik<NoteFormValue>
        onSubmit={onSubmit}
        validateOnBlur
        enableReinitialize={true}
        initialValues={{
          title: note?.data.title || "",
          content: note?.data.content || "",
          tag: note?.data.tag || 0,
          archived: note?.data.archived,
        }}
      >
        {({
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          errors,
          values,
          setFieldValue,
        }) => (
          <>
            <HeaderFormSubmit
              disabled={values.archived || (note && !isEditable)}
              title="Note"
            />
            <Input
              isFullWidth
              placeholder={t("screen.note.title.placeholder", "Title")}
              onChangeText={handleChange("title")}
              borderBottomColor={"gray2"}
              isDisabled={values.archived || (note?.data && !isEditable)}
              borderBottomWidth={1}
              placeholderTextColor={"gray5"}
              focusBorderColor={"transparent"}
              onBlur={handleBlur("title")}
              value={values.title}
              isInvalid={errors.title !== undefined}
            />

            <Input
              isFullWidth
              placeholder={t("screen.note.content.placeholder", "Note")}
              placeholderTextColor={"gray5"}
              isDisabled={values?.archived || (note?.data && !isEditable)}
              onChangeText={handleChange("content")}
              focusBorderColor={"transparent"}
              onBlur={handleBlur("content")}
              multiline
              numberOfLines={10}
              minHeight={200}
              value={values.content}
            />
            <Divider />

            <Box py="s" justifyContent="center" flexDirection="row">
              {colors.map((item: any, key: number) => (
                <Pressable
                  pointerEvents={
                    values.archived || (note && !isEditable) ? "none" : "auto"
                  }
                  key={key}
                  onPress={() => setFieldValue("tag", item.id)}
                >
                  <Box px="s" alignItems="center">
                    <Bird fill={item.hex} width={45} height={40} />
                    {values.tag == item.id && <Ellipse fill={item.hex} />}
                  </Box>
                </Pressable>
              ))}
            </Box>
            <Divider />
            {isEditable ? (
              <Box alignItems={"center"} justifyContent="center">
                {values?.archived ? (
                  <TextLink my="m" onPress={handleReactive} variant="primary">
                    {t("screen.note.link.reactive", "Réactiver cette note")}
                  </TextLink>
                ) : (
                  <TextLink
                    my="m"
                    onPress={() => handleArchive(true)}
                    variant="primary"
                  >
                    {t("screen.note.link.archive", "Archiver")}
                  </TextLink>
                )}

                <Divider />
                <TextLink onPress={handleDelete} variant="danger">
                  {t("screen.note.link.delete", "Supprimer cette note")}
                </TextLink>
              </Box>
            ) : null}
          </>
        )}
      </Formik>
    </Box>
  );
};
