"use client";

import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import {
  Form,
  ServerErrors,
  Steps,
  Step,
  StepHead,
  useStepContext,
} from "@/packages";
import { HttpClient, getFieldErrors } from "@/packages/tools/http-client";
import { Thanks } from "../_components/thanks";
import {
  API_ENDPOINTS,
  API_Response,
  NodeFormInputType,
} from "../api";
import NodeFormField from "./_components/input/_form-field";
import {
  networkSchemaType,
  networkSchema,
  defaultValues,
  stepsData,
} from "./_components/lib/steps-data";
import { NodeFormProps } from "./_components/lib/types";

const NodeForm: React.FC<NodeFormProps> = ({ uuidId }) => {
  const { current, isLast } = useStepContext();
  const [successMessage, setSuccessMessage] = useState("");
  const [serverErrors, setServerErrors] =
    useState<ServerErrors<networkSchemaType> | null>(null);

  const handleSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    if (!isLast) return;

    setServerErrors(null);
    setSuccessMessage("");

    try {
      const response = await HttpClient.put<API_Response<NodeFormInputType>>(
        `${API_ENDPOINTS.PEERING_REQUEST}/${uuidId}`,
        data,
      );

      setSuccessMessage(response?.message ?? "Updation successful!");

      return response;
    } catch (error) {
      // Extract server-side errors from the API response
      handleServerError(error);
    }
  };

  const handleServerError = (error: unknown) => {
    const fieldErrors = getFieldErrors(error);

    if (fieldErrors) {
      setServerErrors(
        Object.fromEntries(
          Object.entries(fieldErrors).map(([key, messages]) => [
            key,
            messages.join(" "), // Flatten multiple error messages into a single string
          ]),
        ),
      );
    } else if (error instanceof Error) {
      // In case of an unexpected error, pass a generic error message
      setServerErrors({
        general: "An unexpected error occurred. Please try again later.",
      });
    } else {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      serverErrors={serverErrors}
      showError
      showSuccess
      successMessage={successMessage}
      validationSchema={networkSchema}
    >
      {() => (
        <>
          {!successMessage ? (
            <div className="nk-stepper-content">
              <div className="nk-stepper-steps stepper-steps">
                <Steps startsFrom={current}>
                  {stepsData.map((step, index) => (
                    <Step isActive={index === current} key={index}>
                      <StepHead
                        description={step.description}
                        title={step.title}
                      />

                      <NodeFormField fields={step.fields} />
                    </Step>
                  ))}
                </Steps>
              </div>
            </div>
          ) : (
            <Thanks isSubmitted={Boolean(successMessage)} />
          )}
        </>
      )}
    </Form>
  );
};

export default NodeForm;
