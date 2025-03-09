import classNames from "classnames";
import dynamic from "next/dynamic";
import React from "react";
import { FormGroup, Form } from "react-bootstrap";
import { useFormContext, Controller } from "react-hook-form";
import { PopLocation } from "../lib/pop-locations-data";

// Dynamically load MapComponent
const MapComponent = dynamic(() => import("./_map_component"), {
  ssr: false, // Disable server-side rendering
});

interface MapInputNodeProps {
  name: string;
  label?: string;
  popLocations: PopLocation[];
  className?: string;
}

const MapInputNode: React.FC<MapInputNodeProps> = ({
  name,
  popLocations,
  className,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <FormGroup className={classNames("form-group", className)}>
      <div className="form-control-wrap">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <MapComponent
              onLocationSelect={(nodeId) => field.onChange(nodeId)}
              popLocations={popLocations}
            />
          )}
        />
      </div>

      {errorMessage && (
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </FormGroup>
  );
};

export default MapInputNode;
