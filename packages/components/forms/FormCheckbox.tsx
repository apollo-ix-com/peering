// "use client";

// import React from "react";
// import classNames from "classnames";
// import { Form, FormGroup } from "react-bootstrap";
// import { useFormContext, Controller } from "react-hook-form";

// interface CheckBoxInputProps {
//   name: string;
//   label: string;
// }

// const CheckBoxInput: React.FC<CheckBoxInputProps> = ({ name, label }) => {
//   const {
//     trigger,
//     control,
//     formState: { errors },
//   } = useFormContext();

//   const errorMessage = errors[name]?.message as string;

//   return (
//     <FormGroup>
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => (
//           <>
//             <Form.Control
//               {...field}
//               type="checkbox"
//               id={name}
//               checked={field.value}
//               isInvalid={!!errorMessage}
//               onChange={(e) => {
//                 field.onChange(e.target.checked);
//                 trigger(name);
//               }}
//               onBlur={() => {
//                 field.onBlur();
//                 trigger(name);
//               }}
//               aria-describedby={errorMessage ? `${name}-error` : undefined}
//             />
//             <Form.Label
//               className={classNames("custom-control-label", {
//                 "text-danger": errorMessage,
//               })}
//               check
//               htmlFor={field.name}
//             >
//               {label}
//             </Form.Label>
//             {errorMessage && (
//               <Form.Control.Feedback type="invalid"
//                 id={`${name}-error`}
//                 className="d-block mt-3"
//               >
//                 {errorMessage}
//               </Form.Control.Feedback>
//             )}
//           </>
//         )}
//       />
//     </FormGroup>
//   );
// };

// export default CheckBoxInput;
