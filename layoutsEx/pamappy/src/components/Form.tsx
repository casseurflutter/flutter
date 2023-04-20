import {
  Formik,
  FormikConfig,
  FormikProps,
  FormikValues,
  useFormikContext,
} from "formik";
import _ from "lodash";
import React, { useState } from "react";
import { ReturnKeyTypeOptions, TextInput, ViewProps } from "react-native";

export type FormContextType = {
  // registerField(name: string, ref: React.RefObject<TextInput>): void;
  handleSubmitEditing(name: string): void;
  getReturnKeyType(name: string): ReturnKeyTypeOptions;
  blurOnSubmit(name: string): boolean;
  setInput(name: string, ref: React.RefObject<any>): void;
  handleFocus(name: string): () => void;
  hasFocus(name: string): boolean;
};
export const FormContext = React.createContext<FormContextType>(null as any);

const getInputs = (children) =>
  React.Children.toArray(children).reduce((partialInputs, child) => {
    if (child && child.props && child.props.children) {
      return partialInputs.concat(getInputs(child.props.children));
    }
    if (child && child.props && !!child.props.name) {
      return partialInputs.concat(child);
    }
    return partialInputs;
  }, []);

export interface FormProps<T> extends ViewProps, FormikConfig<T> {
  submitAfterLastInput?: boolean;
  children?: ((props: FormikProps<T>) => React.ReactNode) | React.ReactNode;
}

function FormWrapper<T extends FormikValues>({
  submitAfterLastInput = true,
  children,
  ...props
}: FormProps<T>) {
  const formikProps = useFormikContext();
  const [focused, setFocused] = useState<string | null>(null);

  const inputRefs = {};
  const inputs = getInputs(children || []);
  const lastFocus = null;

  const getChilrenPosition = (name: string): number =>
    inputs.findIndex((input) => input.props.name === name);

  const getInputPosition = (name: string): number =>
    _.keysIn(inputRefs).findIndex((input) => input === name);

  const contextValue = {
    setInput: (name: string, component: TextInput) => {
      inputRefs[name] = component;
    },
    handleFocus: (name: string) => () => {
      setFocused(name);
      _.without(_.keysIn(inputRefs), name).map((key) => {
        if (inputRefs[key].cancel) {
          inputRefs[key].cancel();
        }
      });
      if (inputRefs[name].resume) {
        inputRefs[name].resume();
      }
    },
    // handleBlur: (name:string) => (e) => {
    //   //handleBlur
    // },
    handleSubmitEditing: (name: string) => {
      const inputPosition = getInputPosition(name);
      const nextInputIndex = _.keysIn(inputRefs)[inputPosition + 1];
      if (nextInputIndex && inputRefs[nextInputIndex].focus) {
        inputRefs[nextInputIndex].focus();
      } else {
        if (submitAfterLastInput) {
          formikProps.submitForm();
        }
      }
    },
    getReturnKeyType: (name: string) => {
      const inputPosition = getChilrenPosition(name);
      const isLastInput = inputPosition === inputs.length - 1;
      return isLastInput ? "done" : "next";
    },
    blurOnSubmit: (name: string) => {
      const inputPosition = getChilrenPosition(name);
      const isLastInput = inputPosition === inputs.length - 1;
      return isLastInput;
    },
    hasFocus: (name: string) => {
      return focused === name;
    },
  };

  return (
    <FormContext.Provider value={contextValue}>
      {typeof children === "function" ? children(formikProps) : children}
    </FormContext.Provider>
  );
}

export function Form<T extends FormikValues>({
  children,
  ...props
}: FormProps<T>) {
  return (
    <Formik<T> {...props}>
      {(formikProps) => (
        <FormWrapper<T> {...props}>
          {typeof children === "function" ? children(formikProps) : children}
        </FormWrapper>
      )}
    </Formik>
  );
}

export const useForm = (): FormContextType => React.useContext(FormContext);
