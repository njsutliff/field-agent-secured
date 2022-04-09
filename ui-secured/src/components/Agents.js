import React, { useState, useEffect } from "react";
import {AddAgentsForm} from "./AddAgentsForm";
import{EditAgentsForm} from "./EditAgentsForm";
import {AgentsTable} from "./AgentsTable";
import {Errors} from "./Errors.js";

function Agents() {
  const [agents, setAgents] = useState([]);

  const [editAgentId, setEditAgentId] = useState(0);
  const [errors, setErrors] = useState([]);
  const [agentEdit, setAgentEdit] = useState([]);
useEffect(() => {
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/agent");
      const data = await response.json();
      setAgents(data);
    } catch (error) {
      console.log(error);
    }
  };
  getData();
}, []);

const handleAddSubmit = async (agent) => {
 
  const body = JSON.stringify(agent);
  
    const response = await fetch("http://localhost:8080/api/agent/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    window.location.reload();
  }
const handleEdit = (agent) => {
  console.log("agent: ");
  console.log(agent);
  setEditAgentId  (agent.agentId);
  console.log("agentToEdit.id: ");

  console.log(agent.agentId);
  setAgentEdit(agent);
};
const handleUpdateSubmit = async (agentEdit) => {
  const updatedAgent = {
    id: agentEdit.agentId,
    ...agentEdit
  };
  const body = JSON.stringify(updatedAgent);

  try {
    const response = await fetch(
      `http://localhost:8080/api/agent/` + agentEdit.agentId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }
    );

    if (response.status === 204) {
      window.location.reload();
      const newAgents = [...agents];

      const agentIndexToEdit = agents.findIndex(
        (agent) => agent.id === editAgentId
      );

setAgents([...newAgents]);
      setEditAgentId(0);
      setErrors([]);
    } else if (response.status === 400) {
      const data = await response.json();
    } else {
      throw new Error("Server Error: Something unexpected went wrong.");
    }
  } catch (error) {
    console.log(error);
  }
};

const handleDelete = async (agentId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/agent/` + agentId,
      {
        method: "DELETE",
      }
    );
    if (response.status === 204) {
      const newAgents = agents.filter((agent) => agent.id !== agentId);
      setAgents(newAgents);
      window.location.reload();
    } else {
      throw new Error("Server Error: Something unexpected went wrong.");
    }
  } catch (error) {
    console.log(error);
  }
};

const handleUpdateCancel = () => {
window.location.reload();
  setEditAgentId(0);
setErrors([]);
};
 return ( 
  <>
    <Errors errors={errors} />
    <h5>Active Agents</h5>
    <AgentsTable
      agents={agents}
      handleDelete={handleDelete}
      handleEdit = {handleEdit}
    /> 
     {editAgentId === 0 ? (
    <AddAgentsForm
        handleAddSubmit={handleAddSubmit}
        errors={errors}
        handleUpdateCancel={handleUpdateCancel}
      />
      ) : (
        <><h5>Edit an Agent </h5><EditAgentsForm
           handleUpdateSubmit={handleUpdateSubmit}
           agentEdit={agentEdit}
           handleUpdateCancel={handleUpdateCancel} /></>
          )}
     </>
);
}

export default Agents;