import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue, selectPatient } from "../state";
import { Icon } from "semantic-ui-react";
import EntryDetails from "./EntryDetails";

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ selectedPatient }, dispatch] = useStateValue();

  React.useEffect(() => {
    if(!id) return;
    if(selectedPatient && selectedPatient.id === id) return;

    const fetchUserDetails = async () => {
      const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(selectPatient(response.data));
    };

    void fetchUserDetails();

  }, [id]);

  if(selectedPatient === null) return <p>Patient not found</p>;

  return (
    <div>
      <h1>{selectedPatient.name}<Icon name={selectedPatient.gender === "female" ? "venus" : "mars"} /></h1>
      <p>ssn: {selectedPatient.ssn}</p>
      <p>occupation: {selectedPatient.occupation}</p>
      <h3>{selectedPatient.entries.length > 0 ? "Entries" : "No entries"}</h3>
      {selectedPatient.entries.map(e => <EntryDetails key={e.id} entry={e} />)}
    </div>
  );
};

export default PatientDetailsPage;