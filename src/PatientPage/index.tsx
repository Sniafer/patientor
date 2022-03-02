import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Diagnosis, Entry, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import EntryDetails from "./EntryDetails";

const PatientPage = () => {
  const [patient, setPatient] = React.useState<Patient | null | undefined>(
    null
  );
  const [diagnosis, setDiagnosis] = React.useState<
    Diagnosis[] | null | undefined
  >(null);
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDiagnosis = async () => {
      try {
        const response = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        setDiagnosis(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchPatient();
    void fetchDiagnosis();
  }, []);

  if (!patient) {
    return <div>This patient does not exist.</div>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>Gender: {patient.gender}</p>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      {patient.entries.length > 0 && (
        <div>
          {patient.entries.map((entry: Entry) => (
            <EntryDetails key={entry.id} entry={entry} diagnosis={diagnosis} />
            // <div key={entry.id}>
            //   <p>
            //     {entry.date} {entry.description}
            //   </p>
            //   <ul>
            //     {entry.diagnosisCodes &&
            //       entry.diagnosisCodes.map((c, i) => (
            //         <li style={{ display: "flex" }} key={i}>
            //           {c}
            //           {diagnosis
            //             ?.filter((d) => d.code === c)
            //             .map((n, i) => (
            //               <p style={{ marginLeft: "1rem" }} key={i}>
            //                 {n.name}
            //               </p>
            //             ))}
            //         </li>
            //       ))}
            //   </ul>
            // </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default PatientPage;
