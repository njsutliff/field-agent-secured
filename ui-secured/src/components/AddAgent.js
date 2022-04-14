import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AuthContext from "../AuthContext";
import Errors from "./Errors";
import { AddAgentsForm } from "./AddAgentsForm";

const DEFAULT_AGENT = {
  firstName: "", middleName: "", lastName: "", dob: "",
  heightInInches: "", agencies: [], aliases: []
}
const AddAgent = (props) => {
  const [agent, setAgent] = useState("");
  const [errors, setErrors] = useState([]);
  const auth = useContext(AuthContext);
  const history = useHistory();

  const handleInputChange = event => {
    const nextAgent = { ...agent };
    let value = event.target.value;
    if (event.target.type == "number") {
      value = parseInt(value);
      if (isNaN(value)) {
        value = event.target.value;
      }
    }
    nextAgent[event.target.name] = value;
    setAgent(nextAgent);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  
  
  const init  = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
        Authorization: `Bearer ${auth.user.token}`, // NEW
      },
      body: JSON.stringify(agent),
    }; 
    fetch("http://localhost:8080/api/todos", init)
    .then(response => {
        if (response.status === 201 || response.status === 400) {
            return response.json();
        }
        return Promise.reject("Server Error: Something unexpected went wrong.");
    })
    .then(data => {
        if (data.id) {
            history.push('/agents');
        } else {
            setErrors(data);        
        }
    })
    .catch(error => console.log(error));
  }
return(
  <>
  <h2 className="my-4">Add Agent</h2>
  <Errors errors={errors} />
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="description">agent </label>
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
             </div>
        <div className="mt-5">
        <button type="submit" className="btn btn-success ml-2">
                Add agent
            </button>
            <Link to="/agents" className="btn btn-warning ml-2">
            <i className="bi bi-x"></i> Cancel
          </Link>
</div>
</form>
</>
);
};
export default AddAgent;
/*

    const handleAddSubmit = async (agent) => {
 
        const body = JSON.stringify(agent);
        
          const response = await fetch("http://localhost:8080/api/agent/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body,
          });

          if (response.status === 201 || response.status === 400) {
            const data = await response.json();
      
            if (data.id) {
              
              setAgent([...agent, data]);
              setErrors([]);
            } else {
              setErrors(data);
            }
          } else {
            throw new Error("Server Error: Something unexpected went wrong.");
          }
          console.log(errors);
      };

      */
/*
return(
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
<button type="submit" className="btn btn-success ml-2">
  Add agent
</button> {agent.firstName || props.errors.length > 0 ? (
<button
className="btn btn-warning ml-2"
type="button"
onClick={props.handleUpdateCancel}
  >
   Cancel
  </button>
) : null}
</form>
);
}
export default AddAgent;*/