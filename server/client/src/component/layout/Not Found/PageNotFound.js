import React from "react";
import ErrorIcon from "@material-ui/icons/Error";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./PageNotFound.css";
import MetaData from "../../../MetaData";

const PageNotFound = () => {
    return (
        <div className="PageNotFound">
            <MetaData title="Page Not Found" />
            <ErrorIcon />

            <Typography>Page Not Found </Typography>
            <Link to="/">Home</Link>
        </div>
    );
};

export default PageNotFound;