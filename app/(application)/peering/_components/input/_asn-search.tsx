"use client";

import axios from "axios";
import classNames from "classnames";
import React, { useState, useCallback } from "react";
import { FormGroup } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { FormButton, FormInputGroup } from "@/packages";

// Define API response types for type safety
interface ASNResponse {
  data: { name: string }[];
}

interface AsnSearchProps {
  name: string;
  label: string;
  className?: string;
  placeholder?: string;
}

const AsnSearch: React.FC<AsnSearchProps> = ({
  name,
  label,
  className,
  placeholder,
}) => {
  const {
    formState: { errors },
    setValue,
    clearErrors,
    setError,
  } = useFormContext();

  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(
    async (asn: string) => {
      if (!asn) return;

      setIsLoading(true);

      try {
        const { data }: { data: ASNResponse } = await axios.get(
          `https://www.peeringdb.com/api/net?asn=${asn}`,
        );

        // If ASN is found, update form state
        if (data.data.length > 0) {
          const networkData = data.data;

          setValue("companyName", networkData[0].name);
          clearErrors("companyName");
        } else {
          // Handle case where no data is returned
          setValue("companyName", "");
          clearErrors("companyName");
          setError(name, {
            type: "manual",
            message: "No data found for this ASN",
          });
        }
      } catch (error) {
        console.log("Failed to fetch ASN data.", error);
        setError(name, {
          type: "manual",
          message: "Failed to fetch ASN data. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [setValue, clearErrors, setError, name],
  );

  // Get error message if exists for this field
  const errorMessage = errors[name]?.message as string | undefined;

  // Use clsx to manage conditional classNames
  const classes = classNames(className, {
    [`btn-${errorMessage ? "danger" : "primary"}`]: true,
  });

  return (
    <FormGroup className={classNames(className)}>
      <FormInputGroup
        append={
          <FormButton
            className={classes}
            disabled={isLoading}
            isLoading={isLoading}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault(); // Prevent the default button action

              // Get the value of the input field associated with the name `field`
              const inputElement = document.getElementById(
                name,
              ) as HTMLInputElement;
              const asnValue = inputElement?.value;

              handleSearch(asnValue); // Call the search function with the value
            }}
          >
            Search
          </FormButton>
        }
        aria-labelledby={name}
        label={label}
        name={name}
        placeholder={placeholder}
        type="text"
      />
    </FormGroup>
  );
};

export default AsnSearch;
