import React from "react";
import WorkIcon from "@mui/icons-material/Work";
import Box from "@mui/material/Box";
import { Diagnosis, OccupationalHealthcareEntry } from "../types";

const OccupationalHealthcare: React.FC<{
  entry: OccupationalHealthcareEntry;
  diagnosis: Diagnosis[] | null | undefined;
}> = ({ entry, diagnosis }) => {
  console.log(entry);
  return (
    <Box sx={{ m: 2, p: 2, border: "1px solid grey" }}>
      <p>
        {entry.date} <WorkIcon /> {entry.employerName}
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      <h4>Codes:</h4>
      <ul>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map((c, i) => (
            <li style={{ display: "flex" }} key={i}>
              {c}
              {diagnosis
                ?.filter((d) => d.code === c)
                .map((n, i) => (
                  <p style={{ marginLeft: "1rem" }} key={i}>
                    {n.name}
                  </p>
                ))}
            </li>
          ))}
      </ul>
      <p>Diagnosed by: {entry.specialist}</p>
    </Box>
  );
};
export default OccupationalHealthcare;
