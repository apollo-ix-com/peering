"use client";

import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import {
  Steps,
  Step,
  StepHead,
  Progress,
  useStepContext,
  Form,
  ServerErrors,
} from "@/packages";
import {
  HttpClient,
  getFieldErrors,
  axiosResponse,
} from "@/packages/tools/http-client";
import { Thanks } from "../_components/thanks";
import PeeringFormField from "./_components/input/_form-field";
import {
  registerSchemaType,
  registerSchema,
  defaultValues,
  stepsData,
} from "./_components/lib/steps-data";
import { PeeringFormProps } from "./_components/lib/types";
import Pagination from "./_components/pagination";

const PeeringForm: React.FC<PeeringFormProps> = ({ employerId }) => {
  const { current, jump, isLast } = useStepContext();
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState("");
  const [serverErrors, setServerErrors] =
    useState<ServerErrors<registerSchemaType> | null>(null);

  const handleSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    if (!isLast) return;
    setIsLoading(true);
    setServerErrors(null);
    setSuccessMessage("");

    try {
      const payload = { ...data, employerId };
      const response = await HttpClient.post<axiosResponse>(
        "/peerings/request",
        payload,
      );

      setSuccessMessage(response?.message ?? "");
      setApplicationNumber("" + response.data?.applicationId);
    } catch (error) {
      // Extract server-side errors from the API response
      handleServerError(error);
    } finally {
      setIsLoading(false);
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
      jump(2);
    } else if (error instanceof Error) {
      // In case of an unexpected error, pass a generic error message
      setServerErrors({
        general: "An unexpected error occurred. Please try again later.",
      });
    } else {
      console.error("Unexpected error:", error);
    }
  };

  // const demoData = {
  //   // category: "ISP",
  //   asnNumber: "15169",
  //   companyName: "Demo Company",
  //   firstName: "John",
  //   lastName: "Doe",
  //   contact: "1234567890",
  //   email: "demo@demo.com",
  //   // gender: "Male",
  //   // port: "500-MB",
  //   location: "12.9716, 77.5946",
  // };

  return (
    <Form
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      serverErrors={serverErrors}
      showError
      showSuccess
      successMessage={successMessage}
      validationSchema={registerSchema}
    >
      {() => (
        <>
          {!successMessage ? (
            <div className="nk-stepper-content">
              <Progress />

              <div className="nk-stepper-steps stepper-steps">
                <Steps startsFrom={current}>
                  {stepsData.map((step, index) => (
                    <Step isActive={index === current} key={index}>
                      <StepHead
                        description={step.description}
                        title={step.title}
                      />

                      <PeeringFormField fields={step.fields} />
                    </Step>
                  ))}
                </Steps>
              </div>

              <Pagination isLoading={isLoading} steps={stepsData} />
            </div>
          ) : (
            <Thanks
              applicationNumber={applicationNumber}
              isSubmitted={Boolean(successMessage)}
            />
          )}
        </>
      )}
    </Form>
  );
};

export default PeeringForm;
