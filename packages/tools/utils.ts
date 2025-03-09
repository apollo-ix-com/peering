import { z } from "zod";

// Define a type for error messages
export interface ErrorMessages {
  required_error: string;
  invalid_type_error: string;
  minLength?: string;
  maxLength?: string;
}

// Function to generate error messages
export const getErrorMessage = (
  field: string,
  minLength = 0,
  maxLength = 0,
): ErrorMessages => ({
  required_error: `${field} is required.`,
  invalid_type_error: `${field} must contain only valid characters.`,
  minLength:
    minLength > 0
      ? `${field} must be at least ${minLength} characters long.`
      : undefined,
  maxLength:
    maxLength > 0
      ? `${field} must be at most ${maxLength} characters long.`
      : undefined,
});

// Function to generate default values from Zod schema
export function defaultValuesSchema<T extends z.ZodObject<z.ZodRawShape>>(
  schema: T,
  defaultValue: Partial<z.infer<T>> = {},
): Partial<z.infer<T>> {
  const defaultValues: Partial<z.infer<T>> = { ...defaultValue };

  const schemaShape = schema.shape as Record<string, z.ZodTypeAny>;

  for (const field in schemaShape) {
    const fieldSchema = schemaShape[field];
    const fieldType = fieldSchema._def.typeName;

    // Set default values based on the type of the schema field
    defaultValues[field as keyof z.infer<T>] = getDefaultValueForField(
      fieldSchema,
      fieldType,
    );
  }

  return defaultValues;
}

// Helper function to determine the default value based on field type
const getDefaultValueForField = (
  fieldSchema: z.ZodTypeAny,
  fieldType: string,
) => {
  switch (fieldType) {
    case z.ZodFirstPartyTypeKind.ZodString:
      return fieldSchema._def.defaultValue ?? ""; // Default to empty string
    case z.ZodFirstPartyTypeKind.ZodEnum:
      return fieldSchema._def.defaultValue ?? null; // Default to a valid enum value (e.g., 'ISP')
    case z.ZodFirstPartyTypeKind.ZodNumber:
      return fieldSchema._def.defaultValue ?? 0; // Default to zero
    case z.ZodFirstPartyTypeKind.ZodBoolean:
      return fieldSchema._def.defaultValue ?? false; // Default to false
    case z.ZodFirstPartyTypeKind.ZodDate:
      return fieldSchema._def.defaultValue ?? null; // Default to null
    case z.ZodFirstPartyTypeKind.ZodObject:
      return defaultValuesSchema(fieldSchema as z.ZodObject<z.ZodRawShape>); // Recursively handle object types
    case z.ZodFirstPartyTypeKind.ZodArray:
      return fieldSchema._def.defaultValue ?? []; // Default to empty array
    default:
      return fieldSchema._def.defaultValue ?? ""; // Default to empty string for unknown types
  }
};
