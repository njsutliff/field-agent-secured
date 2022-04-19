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
}
