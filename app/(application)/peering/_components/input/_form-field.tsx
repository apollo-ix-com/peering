import React from "react";
import { Grid, FormInput, FormRadio, FormRadioPro } from "@/packages";
import { FieldProps } from "../lib/types";
import AsnSearch from "./_asn-search";
import MapInputLocation from "./_map";

interface PeeringFormProps {
  fields: FieldProps[];
}

const PeeringFormField: React.FC<PeeringFormProps> = ({ fields }) => {
  return (
    <Grid.Row>
      {fields.map((field, index) => {
        // Define a grid size dynamically based on the field type
        const colSize = field.type === "radio" ? 12 : 6; // Radio fields take full width, text fields take half-width on small screens

        return (
          <React.Fragment key={index}>
            {field.type === "radio" && field.options && (
              <>
                {field.name === "category" && (
                  <Grid.Col sm={colSize}>
                    <FormRadioPro
                      label={field.label}
                      name={field.name}
                      options={field.options || []}
                    />
                  </Grid.Col>
                )}

                {field.name === "gender" && (
                  <Grid.Col sm={colSize}>
                    <FormRadio
                      label={field.label}
                      name={field.name}
                      options={field.options || []}
                    />
                  </Grid.Col>
                )}

                {field.name === "port" && (
                  <Grid.Col sm={colSize}>
                    <FormRadio
                      isProLayout
                      label={field.label}
                      name={field.name}
                      options={field.options || []}
                    />
                  </Grid.Col>
                )}
              </>
            )}

            {field.type === "text" && (
              <Grid.Col lg={6} md={6} sm={colSize}>
                {field.name === "asnNumber" ? (
                  <AsnSearch
                    aria-labelledby={field.name}
                    label={field.label}
                    name={field.name}
                    placeholder={field.placeholder}
                  />
                ) : (
                  <FormInput
                    aria-labelledby={field.name}
                    label={field.label}
                    name={field.name}
                    placeholder={field.placeholder}
                    type="text"
                  />
                )}
              </Grid.Col>
            )}

            {field.type === "email" && (
              <Grid.Col lg={6} md={6} sm={colSize}>
                <FormInput
                  aria-labelledby={field.name}
                  label={field.label}
                  name={field.name}
                  placeholder={field.placeholder}
                  type="email"
                />
              </Grid.Col>
            )}

            {field.type === "map" && (
              <Grid.Col sm={12}>
                <MapInputLocation label={field.label} name={field.name} />
              </Grid.Col>
            )}
          </React.Fragment>
        );
      })}
    </Grid.Row>
  );
};

export default PeeringFormField;
