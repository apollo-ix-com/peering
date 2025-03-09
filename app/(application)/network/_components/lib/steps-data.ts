import { z } from "zod";
import { getErrorMessage, defaultValuesSchema } from "@/packages/tools/utils";
import { FieldProps, StepProps, createFieldConfig } from "./types";

// Simplified regexValidation for alphanumeric characters and underscores
const regexValidation = (fieldName: string) =>
  z
    .string(getErrorMessage(fieldName))
    .min(1, { message: `${fieldName} is required.` }) // Make sure it is not empty
    .regex(/^[A-Za-z0-9_]+$/, {
      message: `${fieldName} can only contain alphanumeric characters and underscores.`,
    });

// Validation schema for the registration form
export const networkSchema = z.object({
  nodeId: regexValidation("Node Id"), // Use simplified regexValidation
});

export type networkSchemaType = z.infer<typeof networkSchema>;

// Get default values dynamically from the schema
export const defaultValues = defaultValuesSchema(networkSchema);

// Define the fields configuration dynamically
const fieldConfig: Record<keyof networkSchemaType, Omit<FieldProps, "name">> = {
  nodeId: createFieldConfig(
    "Node Location",
    "map",
    "Select a location on the map",
  ),
};

// Helper function to get fields for a step
const getFieldsForStep = (
  fieldNames: (keyof networkSchemaType)[],
): FieldProps[] => fieldNames.map((name) => ({ name, ...fieldConfig[name] }));

// Steps Data
export const stepsData: StepProps[] = [
  {
    title: "Select Nearest POP Location for Peering Port",
    subText:
      "Choose the pop location from the map where you'd like to establish your peering port.",
    description:
      "To proceed with setting up a peering port, please select the nearest pop location on the map. This information will help us assign the correct resources for your peering setup. Ensure the location details are accurate, as it directly impacts your network configuration.",
    fields: getFieldsForStep(["nodeId"]),
  },
];
