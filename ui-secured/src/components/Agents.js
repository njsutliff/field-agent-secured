import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import{EditAgentsForm} from "./EditAgentsForm";
import {AgentsTable} from "./AgentsTable";
import AddAgent from "./AddAgent";

function Agents() {
  const [agents, setAgents] = useState([]);

  const [editAgentId, setEditAgentId] = useState(0);
  const [agentEdit, setAgentEdit] = useState([]);
  
  const getData = async () => {
    fetch("http://localhost:8080/api/agent")
      .then((response) => response.json())
      .then((data) => setAgents(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
  }, []);

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
      //setErrors([]);
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
//setErrors([]);
};
 return ( 
  <div>
  <h2 className="my-4">crud menu</h2>
  <Link to="/agents/add" className="btn btn-primary mb-4">
    <i className="bi bi-plus-circle-fill"></i> add agent
  </Link>
  <table className="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Middle Name</th>
        <th>Last Name</th>
        <th>Date of Birth</th>
        <th>Height (inches)</th>

      </tr>
    </thead>
    <tbody>
      {agents.length > 0 ? (
        agents.map((agent) => (
          <tr key={agent.id}>
            <td>{agent.agentId}</td>
            <td>{agent.firstName}</td>
            <td>{agent.middleName}</td>
            <td>{agent.lastName}</td>
            <td>{agent.dob}</td>
            <td>{agent.heightInInches}</td>

            <td>
              <div>
              <Link
                    to={`/agents/edit/${agent.agentId}`}
                    className="btn btn-primary btn-sm">
                    <i className="bi bi-plus-circle-fill"></i> edit agent
                  </Link>
                

                           

                <button
                  onClick={() => {if (window.confirm(
                    `Are you sure you wish to delete agent 
                    ${agent.firstName + ' ' + agent.middleName +' ' + agent.lastName}
                    date of birth: ${agent.dob}
                    height: ${agent.heightInInches}?`))  handleDelete(agent.agentId)}}
                  className="btn btn-danger btn-sm ml-2"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No Agents</td>
        </tr>
      )}
    </tbody>
  </table>
  </div>
);
}

export default Agents;