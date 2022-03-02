import React from "react";
import { Diagnosis, Entry } from "../types";
import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";

const EntryDetails: React.FC<{
  entry: Entry;
  diagnosis: Diagnosis[] | null | undefined;
}> = ({ entry, diagnosis }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} diagnosis={diagnosis} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} diagnosis={diagnosis} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} diagnosis={diagnosis} />;
    default:
      return assertNever(entry);
  }
};
export default EntryDetails;
