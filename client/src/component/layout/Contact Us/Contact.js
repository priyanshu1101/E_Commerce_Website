import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
    return (
        <div className="contactContainer">
            <a className="mailBtn" href="mailto:priyanshubansal35@gmail.com" >
                <Button style={{ width: '100%' }}>Contact: priyanshubansal35@gmail.com</Button>
            </a>
        </div>
    );
};

export default Contact;