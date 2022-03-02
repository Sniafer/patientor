import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import { Diagnosis, HealthCheckEntry } from "../types";

const HealthCheck: React.FC<{
  entry: HealthCheckEntry;
  diagnosis: Diagnosis[] | null | undefined;
}> = ({ entry, diagnosis }) => {
  const iconColor = () => {
    if (entry.healthCheckRating === 0) return "green";
    if (entry.healthCheckRating === 1) return "yellow";
    if (entry.healthCheckRating === 2) return "orange";
    return "red";
  };

  return (
    <Box sx={{ m: 2, p: 2, border: "1px solid grey" }}>
      <p>
        {entry.date} <FavoriteIcon />
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      <FavoriteIcon sx={{ color: iconColor() }} />
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
export default HealthCheck;
