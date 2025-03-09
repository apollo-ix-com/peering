import dynamic from "next/dynamic";
import React from "react";
import { Form, FormGroup } from "react-bootstrap";
import { useFormContext, Controller } from "react-hook-form";

// Dynamically load LocationPicker component
const LocationPicker = dynamic(() => import("./_location_picker"), {
  ssr: false, // Disable server-side rendering
});

interface MapInputLocationProps {
  name: string;
  label: string;
  className?: string;
}

const MapInputLocation: React.FC<MapInputLocationProps> = ({ name, label }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // Error message from react-hook-form validation
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <FormGroup className="mb-3">
      <div className="form-control-wrap border border-primary">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <LocationPicker
              // On location change, update react-hook-
              aria-label={label} // Improve accessibility
              onLocationChange={(location) => {
                const locationString = `${location.lat}, ${location.lng}`; // Convert to "lat, lng"

                field.onChange(locationString); // Store as string in the form
              }}
            />
          )}
        />
      </div>

      {/* Display error message if exists */}
      {errorMessage && (
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </FormGroup>
  );
};

export default MapInputLocation;
