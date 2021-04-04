import React from "react";
import { Formik, Form, Field, FormikErrors } from "formik";
import { EntryType, HospitalEntryForm } from "../types";
import { Button } from "semantic-ui-react";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: HospitalEntryForm) => void;
}
const HospitalEntry = ({onSubmit}: Props) => {
  const [{ diagnoses }] = useStateValue();

  const validate = (values: HospitalEntryForm) => {
    const isDate = (arg: string) => !!Date.parse(arg);
    const dateError = "Date is malformatted";
    const requiredError = "Field is required";
    const errors: FormikErrors<HospitalEntryForm> = {};
    if(!values.description) errors.description = requiredError;
    if(!values.date) errors.date = requiredError;
    if(!isDate(values.date)) errors.date = dateError;
    if(!values.specialist) errors.specialist = requiredError;
    if(!values.discharge.date) errors.discharge = { ...errors.discharge, date: requiredError };
    if(!isDate(values.discharge.date)) errors.discharge = { ...errors.discharge, date: dateError };
    if(!values.discharge.criteria) errors.discharge = { ...errors.discharge, criteria: requiredError };
    return errors;
  };

  return (
    <Formik 
      initialValues={{
        type: EntryType.Hospital,
        description: "",
        date: "",
        specialist: "",
        discharge: { date: "", criteria: ""},
        diagnosisCodes: []
      }}
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
              label="Discharge date"
              name="discharge.date"
              component={TextField}
            />
             <Field
              label="Discharge criteria"
              name="discharge.criteria"
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

export default HospitalEntry;