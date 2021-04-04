import React from "react";
import { Formik, Form, Field, FormikErrors } from "formik";
import { EntryType, OccupationalHealthCareEntryForm } from "../types";
import { Button } from "semantic-ui-react";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

interface SickLeave {
  startDate: string,
  endDate: string
}

interface Props {
  onSubmit: (values: OccupationalHealthCareEntryForm) => void;
}
const OccupationalHealthcareEntry = ({onSubmit}: Props) => {
  const [{ diagnoses }] = useStateValue();

  const validate = (values: OccupationalHealthCareEntryForm) => {
    const isDate = (arg: string) => !!Date.parse(arg);
    const dateError = "Date is malformatted";
    const requiredError = "Field is required";
    const errors: FormikErrors<OccupationalHealthCareEntryForm> = {};
    if(!values.description) errors.description = requiredError;
    if(!values.date) errors.date = requiredError;
    if(!isDate(values.date)) errors.date = dateError;
    if(!values.specialist) errors.specialist = requiredError;
    if(values.sickLeave) {
      // errors.sickLeave is considered a string for some reason and could not find a proper way of fixing it.
      if(!isDate(values.sickLeave.startDate)) {
        ((errors.sickLeave as unknown) as SickLeave) = {
          ...(errors.sickLeave as unknown) as SickLeave,
          startDate: dateError
        };
      }
      if(!isDate(values.sickLeave.endDate)) {
        ((errors.sickLeave as unknown) as SickLeave) = {
          ...(errors.sickLeave as unknown) as SickLeave,
          endDate: dateError
        };
      }
    }
    return errors;
  };

  const initialValues: OccupationalHealthCareEntryForm = {
    type: EntryType.OccupationalHealthcare,
    description: "",
    date: "",
    specialist: "",
    employerName: "",
    sickLeave: { startDate: "", endDate: "" },
    diagnosisCodes: []
  };

  return (
    <Formik 
      initialValues={initialValues}
      onSubmit={onSubmit}
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
            <Field
              label="Employer name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick leave start date"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick leave end date"
              name="sickLeave.endDate"
              component={TextField}
            />
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

export default OccupationalHealthcareEntry;