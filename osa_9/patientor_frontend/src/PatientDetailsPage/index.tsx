import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, Entry, EntryForm } from "../types";
import { useStateValue, selectPatient, addEntryToSelectedPatient } from "../state";
import { Icon, Button } from "semantic-ui-react";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "./AddEntryModal";

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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

  const handleEntryFormSubmit = async (values: EntryForm) => {
    try {
      const {data} = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, values);
      dispatch(addEntryToSelectedPatient(data));
      setIsModalOpen(false);
    } catch(e) {
      console.log(e);
      alert(e.response.data.error);
    }
  };

  if(selectedPatient === null) return <p>Patient not found</p>;
  return (
    <div>
      <h1>{selectedPatient.name}<Icon name={selectedPatient.gender === "female" ? "venus" : "mars"} /></h1>
      <p>ssn: {selectedPatient.ssn}</p>
      <p>occupation: {selectedPatient.occupation}</p>
      <h3>{selectedPatient.entries.length > 0 ? "Entries" : "No entries"}</h3>
      <Button color="blue" onClick={() => setIsModalOpen(true)}>Add entry</Button>
      <AddEntryModal modalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleEntryFormSubmit} />
      {selectedPatient.entries.map(e => <EntryDetails key={e.id} entry={e} />)}
    </div>
  );
};

export default PatientDetailsPage;