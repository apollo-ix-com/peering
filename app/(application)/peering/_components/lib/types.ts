import { registerSchemaType } from "./steps-data";

export interface PeeringFormProps {
  employerId: string;
}

export interface PaginationStepProps {
  steps: StepProps[];
  isLoading?: boolean;
}
export interface StepProps {
  title: string;
  subText?: string;
  description: string;
  fields: FieldProps[];
}

export interface FieldProps {
  name: keyof registerSchemaType;
  type: string;
  label: string;
  placeholder?: string;
  options?: {
    label: string;
    value: string;
    isPro?: boolean;
    icon?: string;
    subText?: string;
  }[];
}

// Function to dynamically generate the field configuration
export const createFieldConfig = (
  label: string,
  type: string,
  placeholder: string,
  options?: Array<{
    label: string;
    value: string;
    isPro?: boolean;
    icon?: string;
    subText?: string;
  }>,
): Omit<FieldProps, "name"> => ({
  label,
  type,
  placeholder,
  ...(options && { options }),
});
