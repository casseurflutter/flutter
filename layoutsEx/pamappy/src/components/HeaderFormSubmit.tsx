import { useNavigation } from "@react-navigation/native";
import { useFormikContext } from "formik";
import { TextLink } from "pearl-ui";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
type HeaderFormSubmitProps = {
  title: string;
  disabled?: boolean;
  isEditable?: boolean;
};
export const HeaderFormSubmit = ({
  title,
  disabled = false,
  isEditable = false,
}: HeaderFormSubmitProps) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const {
    submitForm,
    initialValues,
    dirty,
    values,
    touched,
    isSubmitting,
    isValid,
  } = useFormikContext();
  useEffect(() => {
    navigation.setOptions({
      title: title,
      headerStyle: {
        backgroundColor: "#2FB0ED",
      },
      headerTintColor: "white",
      headerRight: () => (
        <TextLink
          p="s"
          alignItems="flex-end"
          justifyContent="center"
          isDisabled={!dirty || isSubmitting}
          variant="save"
          onPress={submitForm}
        >
          {isEditable
            ? t("common.button.update", "Modifier")
            : t("common.button.save", "Enregistrer")}
        </TextLink>
      ),
    });
  }, [navigation, t, isValid, dirty, submitForm, isSubmitting]);

  return null;
};
