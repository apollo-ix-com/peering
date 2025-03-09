import { networkSchemaType } from "./steps-data";

export interface NodeFormProps {
  uuidId: string;
}

export interface PaginationStepProps {
  steps: StepProps[];
}
export interface StepProps {
  title: string;
  subText?: string;
  description: string;
  fields: FieldProps[];
}

export interface FieldProps {
  name: keyof networkSchemaType;
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
