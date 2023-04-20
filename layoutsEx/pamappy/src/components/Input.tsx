import { useField, useFormikContext } from "formik";
import { Input as PearlInput, InputProps as PerlInputProps } from "pearl-ui";
import React from "react";
import { TextInputProps } from "react-native";

import { useForm } from "./Form";

function getInputTypeProps(type: string | undefined): Partial<TextInputProps> {
  switch (type) {
    case "email":
      return {
        autoCorrect: false,
        keyboardType: "email-address",
        autoCapitalize: "none",
        maxLength: 500,
      };
    case "password":
      return {
        autoCorrect: false,
        secureTextEntry: true,
        autoCapitalize: "none",
        textContentType: "password",
      };
    case "digits":
      return {
        keyboardType: "phone-pad",
      };
    case "name":
      return {
        autoCorrect: false,
        maxLength: 500,
      };
    case "none":
      return {
        autoCorrect: false,
        secureTextEntry: true,
      };
    default:
      return {};
  }
}

export type FieldProps = PerlInputProps & {
  name: string;
  secureTextEntry?: boolean;
  type?: undefined | "email" | "password" | "digits" | "name" | "none";
  // options?: TextInputMaskOptionProp;
};

// eslint-disable-next-line react/display-name
export function Input<T>({ name, type, ...rest }: FieldProps) {
  const [field, meta, helpers] = useField(name);
  const {
    handleChange,
    handleBlur,
    setFieldValue,
    submitCount,
    isValidating,
    isSubmitting,
  } = useFormikContext<T>();
  const {
    setInput,
    blurOnSubmit,
    getReturnKeyType,
    handleSubmitEditing,
    hasFocus,
    handleFocus,
  } = useForm() || {};
  const shouldDisplayError = meta.touched || submitCount > 0;
  // const canReset = meta.value && hasFocus(name);
  // const isEditable = !isValidating && !isSubmitting && editable;
  // const isValid = validateField(name);

  return (
    <PearlInput
      // ref={(ref) => setInput?.(name, ref)}
      onChangeText={handleChange(name)}
      onBlur={handleBlur(name)}
      onFocus={handleFocus?.(name)}
      value={field.value}
      blurOnSubmit={blurOnSubmit?.(name)}
      isInvalid={meta.error != undefined}
      errorMessage={shouldDisplayError ? meta.error : undefined}
      onSubmitEditing={() => handleSubmitEditing?.(name)}
      returnKeyType={getReturnKeyType?.(name)}
      // editable={isEditable}
      {...getInputTypeProps(type)}
      {...rest}
    />
  );
}

export type SimpleInputProps = PerlInputProps & {
  name: string;
  secureTextEntry?: boolean;
  type?: undefined | "email" | "password" | "digits" | "name" | "none";
  // options?: TextInputMaskOptionProp;
};

// eslint-disable-next-line react/display-name
export function SimpleInput<T>({ name, type, ...rest }: SimpleInputProps) {
  const [field, meta, helpers] = useField(name);
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    submitCount,
    isValidating,
    isSubmitting,
  } = useFormikContext<T>();
  const shouldDisplayError = meta.touched || submitCount > 0;
  const canReset = meta.value && meta.touched;
  // const isEditable = !isValidating && !isSubmitting && editable;
  // const isValid = validateField(name);

  return (
    <PearlInput
      onChangeText={handleChange(name)}
      onBlur={handleBlur(name)}
      value={field.value}
      isInvalid={meta.error != undefined}
      errorMessage={shouldDisplayError ? meta.error : undefined}
      onSubmitEditing={() => handleSubmit()}
      // editable={isEditable}
      {...getInputTypeProps(type)}
      {...rest}
    />
  );
}
