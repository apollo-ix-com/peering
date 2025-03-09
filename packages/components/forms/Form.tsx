"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import {
  useForm,
  UseFormReturn,
  UseFormProps,
  SubmitHandler,
  Path,
  FieldValues,
  FormProvider,
  DefaultValues,
} from "react-hook-form";
import type { ZodSchema, ZodType } from "zod";

export type ServerErrors<T> = Partial<
  Record<keyof T | "_root" | "general", string>
>;

export interface FormProps<TFormValues extends FieldValues> {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
  validationSchema?: ZodSchema<TFormValues> | ZodType<TFormValues>;
  serverErrors?: ServerErrors<TFormValues> | null;
  resetValues?: Partial<TFormValues> | null;
  defaultValues?: Partial<TFormValues>;
  className?: string;
  successMessage?: string;
  errorMessage?: string;
  showError?: boolean;
  showSuccess?: boolean;
  [key: string]: unknown;
}

const Form = <TFormValues extends FieldValues>({
  onSubmit,
  children,
  options,
  validationSchema,
  serverErrors,
  resetValues,
  defaultValues,
  successMessage,
  errorMessage,
  showError = false,
  showSuccess = false,
  ...props
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    resolver: validationSchema ? zodResolver(validationSchema) : undefined,
    ...options,
    reValidateMode: "onBlur",
    mode: "onBlur",
    defaultValues: defaultValues as DefaultValues<TFormValues> | undefined,
  });

  const {
    setError,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const prevServerErrorRef = useRef(serverErrors);
  const prevResetValuesRef = useRef(resetValues);

  useEffect(() => {
    if (prevServerErrorRef.current !== serverErrors) {
      handleServerErrors(serverErrors as ServerErrors<TFormValues>, setError);
      prevServerErrorRef.current = serverErrors;
    }
  }, [serverErrors, setError]);

  useEffect(() => {
    if (prevResetValuesRef.current !== resetValues) {
      resetFormValues(resetValues as Partial<TFormValues>, reset);
      prevResetValuesRef.current = resetValues;
    }
  }, [resetValues, reset]);

  useEffect(() => {
    if (successMessage) {
      setIsVisible(true);
      reset();
      const timer = setTimeout(() => setIsVisible(false), 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, reset]);

  useEffect(() => {
    const firstErrorField = Object.keys(errors);

    if (firstErrorField) {
      const element = document.querySelector(`[name="${firstErrorField[0]}"]`);

      if (element) {
        (element as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        (element as HTMLElement).focus();
      }
    }
  }, [errors]);

  const handleServerErrors = <TFormValues extends FieldValues>(
    serverError: ServerErrors<TFormValues> | null,
    setError: UseFormReturn<TFormValues>["setError"],
  ) => {
    if (serverError) {
      Object.entries(serverError).forEach(([field, message]) => {
        setError(field as Path<TFormValues>, { type: "manual", message });
      });
    }
  };

  const resetFormValues = <TFormValues extends FieldValues>(
    resetValues: Partial<TFormValues> | null,
    reset: UseFormReturn<TFormValues>["reset"],
  ) => {
    if (resetValues) {
      reset(resetValues as TFormValues);
    }
  };

  const handleFormSubmit = async (data: TFormValues) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={handleSubmit(handleFormSubmit)} {...props}>
        {showError && Object.keys(errors).length > 0 && (
          <div className="alert alert-danger">
            <ul>
              {Object.entries(errors).map(([field, error]) => (
                <li key={field}>{(error as { message: string }).message}</li>
              ))}
            </ul>
          </div>
        )}

        {showSuccess && isVisible && successMessage && !isSubmitting && (
          <div className="alert alert-fill alert-primary alert-icon">
            <em className="icon ni ni-check-circle" />

            {successMessage}
          </div>
        )}

        {errorMessage && !isSubmitting && !successMessage && (
          <div className="alert alert-fill alert-danger alert-icon">
            <em className="icon ni ni-cross-circle" />

            {errorMessage}
          </div>
        )}

        {children(methods)}
      </form>
    </FormProvider>
  );
};

export default Form;
