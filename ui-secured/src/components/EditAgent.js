import React, { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AuthContext from "../AuthContext";
import Errors from "./Errors";


function editAgent() {
    const [agent, setAgent] = useState("");
    const [errors, setErrors] = useState([]);
    const auth = useContext(AuthContext);
    const history = useHistory();

    const {id} = useParams();
  
    const handleInputChange = event => {
        const { name, value } = event.target;
        setAgent({...agent, [name]: value});
    }

}

