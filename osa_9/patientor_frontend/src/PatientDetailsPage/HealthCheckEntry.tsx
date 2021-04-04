import React from "react";
import { Formik, Form, Field } from "formik";
import { EntryType, HealthCheckEntryForm, HealthCheckRating } from "../types";
import { Button, Form as SemForm } from "semantic-ui-react";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: HealthCheckEntryForm) => void;
}
const HealthCheckEntry = ({onSubmit}: Props) => {
  const [{ diagnoses }] = useStateValue();

  const validate = (values: HealthCheckEntryForm) => {
    const isDate = (arg: string) => !!Date.parse(arg);
    const dateError = "Date is malformatted";
    const requiredError = "Field is required";
    const errors: { [field: string]: string } = {};
    if(!values.description) errors.description = requiredError;
    if(!values.date) errors.date = requiredError;
    if(!isDate(values.date)) errors.date = dateError;
    if(!values.specialist) errors.specialist = requiredError;
    return errors;
  };
  
  const options = [
    { label: "Healthy", value: HealthCheckRating.Healthy },
    { label: "Low risk", value: HealthCheckRating.LowRisk },
    { label: "High risk", value: HealthCheckRating.HighRisk },
    { label: "Critical risk", value: HealthCheckRating.CriticalRisk }
  ];

  const handleSubmit = (values: HealthCheckEntryForm) => {
    // For some reason Formik forces enum into string. Need conversion.
    values.healthCheckRating = Number(values.healthCheckRating) as HealthCheckRating;
    onSubmit(values);
  };

  return (
    <Formik 
      initialValues={{
        type: EntryType.HealthCheck,
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: HealthCheckRating.Healthy,
        diagnosisCodes: []
      }}
      onSubmit={handleSubmit}
      validate={validate}
    >
      {({ setFieldValue, setFieldTouched, isSubmitting }) => {
        return (
          <Form className="form ui">
            <Field 
              label="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              name="specialist"
              component={TextField}
            />
            <SemForm.Field>
              <label>Health check rating</label>
              <Field as="select" name="healthCheckRating" className="ui dropdown">
                {options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label || option.value}
                  </option>
                ))}
              </Field>
            </SemForm.Field>
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Button disabled={isSubmitting} style={{marginTop: "20px"}} type="submit" color="blue">Create</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default HealthCheckEntry;