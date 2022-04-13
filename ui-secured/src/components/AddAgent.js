import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory} from "react-router-dom";
import AuthContext from "../AuthContext";
import Errors from "./Errors";
const AddAgent = () => {

    const auth = useContext(AuthContext);
    const history = useHistory();

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
    }