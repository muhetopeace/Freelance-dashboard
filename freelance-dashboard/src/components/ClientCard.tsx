// src/components/ClientCard.tsx
import React from "react";
import { Client } from "../models/models";

interface Props {
  client: Client;
}

const ClientCard: React.FC<Props> = ({ client }) => {
  return (
    <div className="p-3 border rounded-md shadow-sm">
      <h3 className="font-semibold">{client.name}</h3>
      <p>{client.country}</p>
      <p>{client.email ?? <em>No email provided</em>}</p>
    </div>
  );
};

export default ClientCard;
