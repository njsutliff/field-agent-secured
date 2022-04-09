import React, { useState } from "react";
const DEFAULT_AGENT =  {firstName: "", middleName: "",lastName: "",dob: "",
heightInInches: "", agencies: [], aliases: []};
export const AddAgentsForm = (props) => {
    const [agent, setAgent] = useState(DEFAULT_AGENT);
   
    const handleInputChange = event => {
        //const {name, value} = event.target;
                //setAgent({...agent, [name]: value});
                const nextAgent = {...agent};
                let value = event.target.value;
                if(event.target.type=="number"){
                    value=parseInt(value);
                    if(isNaN(value)){
                        value=event.target.value;
                    }
                }
                nextAgent[event.target.name]=value;
                setAgent(nextAgent);
            

    
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleAddSubmit(agent);
    };
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
            <button type="submit" className="btn btn-success ml-2">
                Add agent
            </button>
            {agent.firstName || props.errors.length > 0 ? (
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
};