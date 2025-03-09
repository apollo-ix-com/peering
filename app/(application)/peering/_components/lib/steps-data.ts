import { z } from "zod";
import { getErrorMessage, defaultValuesSchema } from "@/packages/tools/utils";
import { FieldProps, StepProps, createFieldConfig } from "./types";

// Utility function for common regex validation
const regexValidation = (fieldName: string, pattern: RegExp, message: string) =>
  z.string(getErrorMessage(fieldName)).regex(pattern, { message });

// Validation schema for registration form
export const registerSchema = z.object({
  category: z.enum(
    [
      "ISP",
      "CDN",
      "CSP",
      "IXP",
      "DCP",
      "NSP",
      "TSP",
      "MSP",
      "BIZ",
      "GOV",
      "REN",
      "HCP",
    ],
    {
      errorMap: () => ({ message: "Please select a valid company category." }),
    },
  ),
  asnNumber: regexValidation(
    "ASN Number",
    /^\d+$/,
    "ASN Number must be a numeric value.",
  )
    .min(1)
    .max(10),
  companyName: z
    .string(getErrorMessage("Company Name", 2, 50))
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message: "Can only contain alphabetic characters and spaces.",
    })
    .min(2)
    .max(50),
  email: z
    .string(getErrorMessage("Email Address"))
    .email({ message: "Please enter a valid email address." }),
  firstName: regexValidation(
    "First Name",
    /^[A-Za-z]+$/,
    "Can only contain alphabetic characters.",
  )
    .min(2)
    .max(50),
  lastName: regexValidation(
    "Last Name",
    /^[A-Za-z]+$/,
    "Can only contain alphabetic characters.",
  )
    .min(2)
    .max(50),
  contact: regexValidation(
    "Contact Number",
    /^\d+$/,
    "Can only contain number digits.",
  )
    .min(10)
    .max(15),
  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Please select a valid gender." }),
  }),
  port: z.enum(
    [
      "1-GB",
      "2-GB",
      "3-GB",
      "5-GB",
      "10-GB",
      "20-GB",
      "30-GB",
      "50-GB",
      "100-GB",
      "100-GB +",
    ],
    {
      errorMap: () => ({ message: "Please select a valid peering port." }),
    },
  ),
  location: z.string().refine(
    (value) => {
      const [lat, lng] = value.split(",").map((coord) => parseFloat(coord));

      return (
        !isNaN(lat) &&
        !isNaN(lng) &&
        lat >= -90 &&
        lat <= 90 &&
        lng >= -180 &&
        lng <= 180
      );
    },
    { message: "Invalid location. Please select a valid point on the map." },
  ),
  // termsAndConditions: z
  //   .boolean()
  //   .refine((val) => val === true, {
  //     message: "You must accept the terms and conditions",
  //   })
  //   .optional(),
});

export type registerSchemaType = z.infer<typeof registerSchema>;

// Get default values dynamically from the schema
export const defaultValues = defaultValuesSchema(registerSchema);

// Define the fields configuration dynamically
const fieldConfig: Record<
  keyof registerSchemaType,
  Omit<FieldProps, "name">
> = {
  category: createFieldConfig("", "radio", "", [
    {
      label: "Internet Service Providers (ISPs)",
      value: "ISP",
      isPro: true,
      icon: "icon ni ni-wifi",
      subText: "Deliver internet access.",
    },
    {
      label: "Content Delivery Networks (CDNs)",
      value: "CDN",
      isPro: true,
      icon: "icon ni ni-download-cloud",
      subText: "Optimize and distribute digital content.",
    },
    {
      label: "Cloud Service Providers",
      value: "CSP",
      isPro: true,
      icon: "icon ni ni-cloud",
      subText: "Offer scalable cloud resources.",
    },
    {
      label: "Internet Exchange Points (IXPs)",
      value: "IXP",
      isPro: true,
      icon: "icon ni ni-share-alt",
      subText: "Enable network data exchange.",
    },
    {
      label: "Data Centers (DC)",
      value: "DCP",
      isPro: true,
      icon: "icon ni ni-db-fill",
      subText: "Host IT infrastructure.",
    },
    {
      label: "Network Operators",
      value: "NSP",
      isPro: true,
      icon: "icon ni ni-network",
      subText: "Manage core networks",
    },
    {
      label: "Telecom Operators (Telcos)",
      value: "TSP",
      isPro: true,
      icon: "icon ni ni-call",
      subText: "Provide connectivity services.",
    },
    {
      label: "Managed Service Providers (MSPs)",
      value: "MSP",
      isPro: true,
      icon: "icon ni ni-setting",
      subText: "Outsource IT and network services.",
    },
    {
      label: "Enterprises",
      value: "BIZ",
      isPro: true,
      icon: "icon ni ni-briefcase",
      subText: "Private business organizations.",
    },
    {
      label: "Government Institutions & Agencies",
      value: "GOV",
      isPro: true,
      icon: "icon ni ni-building",
      subText: "Public sector entities.",
    },
    {
      label: "Research & Education Networks ",
      value: "REN",
      isPro: true,
      icon: "icon ni ni-book",
      subText: "Support academic institutions.",
    },
    {
      label: "Hosting/Content Providers ",
      value: "HCP",
      isPro: true,
      icon: "icon ni ni-server",
      subText: "Host and distribute content.",
    },
  ]),
  asnNumber: createFieldConfig("ASN Number", "text", "Enter your ASN number"),
  companyName: createFieldConfig(
    "Company Name",
    "text",
    "Enter your company name",
  ),
  firstName: createFieldConfig("First Name", "text", "Enter your first name"),
  lastName: createFieldConfig("Last Name", "text", "Enter your last name"),
  contact: createFieldConfig(
    "Contact Number",
    "text",
    "Enter your contact number",
  ),
  email: createFieldConfig("Email", "email", "Enter your email"),
  gender: createFieldConfig("Gender", "radio", "", [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ]),
  port: createFieldConfig("Peering Port", "radio", "", [
    { label: "1-GB", value: "1-GB" },
    { label: "2-GB", value: "2-GB" },
    { label: "3-GB", value: "3-GB" },
    { label: "5-GB", value: "5-GB" },
    { label: "10-GB", value: "10-GB" },
    { label: "20-GB", value: "20-GB" },
    { label: "30-GB", value: "30-GB" },
    { label: "50-GB", value: "50-GB" },
    { label: "100-GB", value: "100-GB" },
    { label: "100-GB +", value: "100-GB +" },
  ]),
  location: createFieldConfig(
    "Peering Location",
    "map",
    "Select a location on the map",
  ),
  // termsAndConditions: createFieldConfig(
  //   "I agree to the Terms and Conditions",
  //   "checkbox",
  //   "Please agree to the terms and conditions"
  // ),
};

// Helper function to get fields for a step
const getFieldsForStep = (
  fieldNames: (keyof registerSchemaType)[],
): FieldProps[] => fieldNames.map((name) => ({ name, ...fieldConfig[name] }));

// Steps Data
export const stepsData: StepProps[] = [
  {
    title: "Select Your Sector",
    subText: "Choose a category.",
    description: "Select the category that best represents your organization.",
    fields: getFieldsForStep(["category"]),
  },
  {
    title: "Company Information",
    subText: "Enter your ASN number.",
    description:
      "Provide your ASN number to auto-populate your company name for accuracy.",
    fields: getFieldsForStep(["asnNumber", "companyName"]),
  },
  {
    title: "Personal Information",
    subText: "Enter your personal details.",
    description:
      "Complete the required fields to ensure accurate contact information.",
    fields: getFieldsForStep([
      "firstName",
      "lastName",
      "contact",
      "email",
      "gender",
    ]),
  },
  {
    title: "Pick Your IX Port Last Mile Location",
    subText: "Select a nearby IX port location.",
    description:
      "Pick a landmark location on the map to proceed with your port request.",
    fields: getFieldsForStep(["port", "location"]),
  },

  // {
  //   title: "Select Your Sector",
  //   subText: "Choose the category.",
  //   description: "Choose the category that best represents your organization.",
  //   fields: getFieldsForStep(["category"]),
  // },
  // {
  //   title: "Company Information",
  //   subText: "Enter your ASN number.",
  //   description:
  //     "Enter your ASN number to automatically fetch and populate the company name. This ensures accurate and up-to-date details for your organization.",
  //   fields: getFieldsForStep(["asnNumber", "companyName"]),
  // },
  // {
  //   title: "Personal Information",
  //   subText: "Provide your personal details.",
  //   description:
  //     "Please provide your personal details to complete the registration. All fields are required to ensure we have accurate contact information for you.",
  //   fields: getFieldsForStep([
  //     "firstName",
  //     "lastName",
  //     "contact",
  //     "email",
  //     "gender",
  //   ]),
  // },
  // {
  //   title: "Choose Your IX Port Installtion Location",
  //   subText: "Choose a nearby IX port installtion location.",
  //   description:
  //     "Choose a your landmark location from the map to proceed with your port request.",
  //   fields: getFieldsForStep(["port", "location"]),
  // },
  // {
  //   title: "Review Your Information",
  //   subText: "Please review all the details.",
  //   description:
  //     "Please review all the details you have entered before submitting. Ensure that all information is correct and complete.",
  //   fields: getFieldsForStep(["termsAndConditions"]),
  // },
];
