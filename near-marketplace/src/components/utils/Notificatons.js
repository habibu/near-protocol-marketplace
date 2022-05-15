import React from "react";
import { ToastContainer } from "react-bootstrap";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";

const Notification = () => (
    <ToastContainer
        position="botton-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        dragrabble={false}
        pauseOnHover
    />

);

const NotificationSuccess = ({text}) => (
    <div>
        <i className="bi bi-check-circle-fill text-success mx-2"/>
        <span className="text-secondary mx-1">{text}</span>
    </div>
);

const NotificationError = ({text}) => (
    <div>
        <i className="bi bi-x-cicle-fill text-danger mx-2"/>
        <span className="text-secondary mx-1">{text}</span>
    </div>
);

const Props = {
    text: PropTypes.string
};
const DefaultProps = {
    text: ""
};

NotificationSuccess.protoTypes = Props;
NotificationSuccess.defaultProps = DefaultProps;

NotificationError.protoTypes = Props;
NotificationError.defaultProps = DefaultProps;

export  {Notification, NotificationSuccess, NotificationError};