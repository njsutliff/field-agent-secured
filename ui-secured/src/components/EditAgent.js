import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AuthContext from "../AuthContext";
import Errors from "./Errors";


function editAgent() {
    const [agent, setAgent] = useState("");
    const [errors, setErrors] = useState([]);
    const auth = useContext(AuthContext);
    const history = useHistory();

    const { id } = useParams();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setAgent({ ...agent, [name]: value });
    }
    useEffect = (() => {
        const init = {
            headers: {
                Authorization: `Bearer ${auth.user.token}`, // NEW
            }
        };

        fetch(`http://localhost:8080/api/agent/${id}`, init)
            .then(response => {
                if (response.status === 404) {
                    return Promise.reject(`Received 404 Not Found for Agent ID: ${id}`);
                }
                return response.json();
            })
            .then(data => {
                setAgent(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id, auth.user.token]);
    const editToDoFormSubmitHandler = (event) => {
        event.preventDefault();

        const updatedAgent = {

        };
        const init = {
            method: "PUT", //Put for an edit via API
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.user.token}`,
            },
            body: JSON.stringify(agent),
        };
        fetch(`http://localhost:8080/api/agent/${id}`, init)
            .then(response => {
                if (response.status === 204) {
                    return null; // successful edit
                }
                if (response.status === 400) {
                    return response.json();
                }
                return Promise.reject("Server Error: Something unexpected went wrong.");
            })
            .then(data => {
                if (data.id) {
                    history.push('/agents');
                    // setErrors([]);

                } else {
                    setErrors(data);
                }
            })
            .catch(error => console.log(error));
    };
    return (
        <form onSubmit={editToDoFormSubmitHandler} className="form-inline mx-2 my-4">
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
}
