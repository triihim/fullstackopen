import React, { useState } from "react";
import { Modal, Select, DropdownProps } from "semantic-ui-react";
import { EntryType, EntryForm } from "../types";
import HospitalEntry from "./HospitalEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryForm) => void;
}

const AddEntryModal = ({modalOpen, onClose, onSubmit}: Props) => {
  const [entryType, setEntryType] = useState<EntryType | null>(null);

  const entrySelectTypes = [
    { key: "empty", value: undefined, text: ""},
    { key: EntryType.HealthCheck, value: EntryType.HealthCheck, text: EntryType.HealthCheck },
    { key: EntryType.Hospital, value: EntryType.Hospital, text: EntryType.Hospital },
    { key: EntryType.OccupationalHealthcare, value: EntryType.OccupationalHealthcare, text: EntryType.OccupationalHealthcare }
  ];

  const handleEntryTypeSelection = (e: React.SyntheticEvent<HTMLElement, Event>, { value }: DropdownProps): void => {
    setEntryType(value as EntryType);
  };

  const handleClose = () => {
    setEntryType(null);
    onClose();
  };

  return (
    <Modal open={modalOpen} onClose={handleClose} closeIcon>
      <Modal.Header>Add new entry</Modal.Header>
      <Modal.Content>

        <Select style={{ marginBottom: "10px"}} placeholder="Select type" options={entrySelectTypes} onChange={handleEntryTypeSelection} />

        {entryType === EntryType.HealthCheck ? <HealthCheckEntry onSubmit={onSubmit} /> : null}
        {entryType === EntryType.Hospital ? <HospitalEntry onSubmit={onSubmit} /> : null}
        {entryType === EntryType.OccupationalHealthcare ? <OccupationalHealthcareEntry onSubmit={onSubmit} /> : null }

      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;