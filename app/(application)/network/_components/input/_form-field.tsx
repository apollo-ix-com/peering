import React from "react";
import { Grid } from "@/packages";
import { popLocationsData } from "../lib/pop-locations-data";
import { FieldProps } from "../lib/types";
import MapInputNode from "./_map";

interface NodeFormProps {
  fields: FieldProps[];
}

const NodeFormField: React.FC<NodeFormProps> = ({ fields }) => {
  return (
    <Grid.Row>
      {fields.map((field, index) => {
        return (
          <React.Fragment key={index}>
            {field.type === "map" && (
              <Grid.Col sm={12}>
                <MapInputNode
                  label={field.label}
                  name={field.name}
                  popLocations={popLocationsData}
                />
              </Grid.Col>
            )}
          </React.Fragment>
        );
      })}
    </Grid.Row>
  );
};

export default NodeFormField;
