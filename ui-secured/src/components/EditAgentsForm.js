import React, { useState } from "react";

export const EditAgentsForm = (props) => {
  const [agent, setAgent] = useState(props.agentEdit);

  const handleInputChange = event => {
      const { name, value } = event.target;
      setAgent({...agent, [name]: value});
  }

  const handleSubmit = event => {
      event.preventDefault();
      props.handleUpdateSubmit(agent);
  }
  
  return (
    <form onSubmit={handleSubmit} className="form-inline mx-2 my-4">
    <input
        className="form-control col-6"
        id="firstName"
        placeholder="First Name:"
        value={agent.firstName}
        name="firstName"
        label="firstName"
        onChange={handleInputChange}
    />
    <input
        className="form-control col-6"
        id="middleName"
        placeholder="Middle Name:"
        value={agent.middleName}
        name="middleName"
        label="middleName"
        onChange={handleInputChange}
    />
    <input
        className="form-control col-6"
        id="middleName"
        placeholder="Last Name:"
        value={agent.lastName}
        name="lastName"
        label="lastName"
        onChange={handleInputChange}               
    />
    <input
        
        className="form-control col-6"
        id="dob"
        placeholder="Date of Birth [Year]-[Month]-[Day]:"
        value={agent.dob} 
        name="dob"
        label="date of birth"
        onChange={handleInputChange}             
    />
    <input
        className="form-control col-6"
        id="height"
        placeholder="Height in Inches:"
        value={agent.heightInInches}
        name="heightInInches"
        label="height in inches"
        onChange={handleInputChange}   
    />
      <button type="submit" className="btn btn-primary">
        Update Agent
      </button>
      <button className="btn btn-danger"onClick={props.handleUpdateCancel}>
        Cancel
      </button>
    </form>
  );
};