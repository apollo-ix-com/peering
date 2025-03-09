"use client";

import classNames from "classnames";
import React from "react";
import { Form, FormGroup, InputGroup } from "react-bootstrap";
import { InputField, InputFieldProps, useFieldError } from "./FormInput";

// Reusable FormField Component
interface FormFieldProps extends InputFieldProps {
  label: string;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
}

const TextInputGroup: React.FC<FormFieldProps> = ({
  name,
  label,
  type,
  placeholder,
  prepend,
  append,
  size,
  className,
}) => {
  const errorMessage = useFieldError(name);

  return (
    <FormGroup className="mb-3">
      <Form.Label
        className={classNames({
          "text-danger": !!errorMessage,
        })}
        htmlFor={name}
      >
        {label}
      </Form.Label>

      <InputGroup>
        {prepend ? prepend : null}

        <InputField
          className={className}
          name={name}
          placeholder={placeholder}
          size={size}
          type={type}
        />

        {append ? append : null}
      </InputGroup>

      {errorMessage && (
        <Form.Control.Feedback className="d-block" type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </FormGroup>
  );
};

export default TextInputGroup;

{
  /* <FormGroup>
<Form.Label
  htmlFor={name}
  className={classNames({
    "text-danger": !!errorMessage,
  })}
>
  {label}
</Label>
<Form.ControlGroup>
  <Form.ControlField
    name={name}
    type={type}
    rows={rows}
    size={size}
    className={className}
    placeholder={placeholder}
  />
  <Button>Search</Button>
</InputGroup>
{errorMessage && <Form.Control.Feedback type="invalid" >{errorMessage}</Form.Control.Feedback>}
</FormGroup> */
}
// // Specific usage of text input
// const TextInput: React.FC<Omit<FormFieldProps, "type">> = (props) => (
//   <FormField {...props} type="text" />
// );

// // Specific usage of textarea input
// const Textarea: React.FC<Omit<FormFieldProps, "type">> = (props) => (
//   <FormField {...props} type="textarea" />
// );

// // Specific usage of password input
// const PasswordInput: React.FC<Omit<FormFieldProps, "type">> = (props) => (
//   <FormField {...props} type="password" />
// );

// // Specific usage of email input
// const EmailInput: React.FC<Omit<FormFieldProps, "type">> = (props) => (
//   <FormField {...props} type="email" />
// );

// // Specific usage of number input
// const NumberInput: React.FC<Omit<FormFieldProps, "type">> = (props) => (
//   <FormField {...props} type="number" />
// );

// // Specific usage of search input
// const SearchInput: React.FC<Omit<FormFieldProps, "type">> = (props) => (
//   <FormField {...props} type="search" />
// );

// export {
//   TextInput,
//   Textarea,
//   PasswordInput,
//   EmailInput,
//   NumberInput,
//   SearchInput,
// };
