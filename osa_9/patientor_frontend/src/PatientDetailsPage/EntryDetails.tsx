import React from "react";
import { Entry, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthCareEntry, Diagnosis, EntryType } from "../types";
import { assertNever } from "../utils";
import { Segment, Icon, SemanticCOLORS } from "semantic-ui-react";
import { useStateValue } from "../state";

interface EntryDetailsProps { entry: Entry }

const EntryDetails = ({ entry }: EntryDetailsProps) => {
  const [{ diagnoses }] = useStateValue();
  
  const getDiagnoses = (codes: Array<string>) => {
    const mappedDiagnoses = codes.map(c => diagnoses.find(d => d.code === c)).filter(d => !!d) as Diagnosis[] ;
    return (
      <ul>
        {mappedDiagnoses.map(d => <li key={d.code}>{d.code} {d.name} <em>{d.latin ? `(${d.latin})` : null}</em></li>)}
      </ul>
    );
  };

  const healthCheck = (entry: HealthCheckEntry): JSX.Element => {

    const getHealthRatingColor = (): SemanticCOLORS => {
      switch(entry.healthCheckRating) {
        case HealthCheckRating.CriticalRisk: return "red";
        case HealthCheckRating.HighRisk: return "orange";
        case HealthCheckRating.LowRisk: return "yellow";
        case HealthCheckRating.Healthy: return "green";
        default: return assertNever(entry.healthCheckRating);
      }
    };

    return (
      <Segment>
        <h3>{entry.date} <Icon name="heartbeat" /></h3>
        <p>{entry.description}</p>
        {entry.diagnosisCodes ? getDiagnoses(entry.diagnosisCodes) : null}
        <Icon name="heart" color={getHealthRatingColor()} />
      </Segment>
    );
  };

  const hospital = (entry: HospitalEntry): JSX.Element => {
    return (
      <Segment>
        <h3>{entry.date} <Icon name="hospital" /></h3>
        <p>{entry.description}</p>
        {entry.diagnosisCodes ? getDiagnoses(entry.diagnosisCodes) : null}
     </Segment>
    );
  };

  const occupationalHealthcare = (entry: OccupationalHealthCareEntry): JSX.Element => {
    return (
      <Segment>
        <h3>{entry.date} <Icon name="user md" /><span>{entry.employerName}</span></h3>
        <p>{entry.description}</p>
        {entry.diagnosisCodes ? getDiagnoses(entry.diagnosisCodes) : null}
      </Segment>
    );
  };

  switch(entry.type) {
    case EntryType.HealthCheck: return healthCheck(entry);
    case EntryType.Hospital: return hospital(entry);
    case EntryType.OccupationalHealthcare: return occupationalHealthcare(entry);
    default: return assertNever(entry);
  }
};

export default EntryDetails;