import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const Cover = ({ name, login, coverImg }) => {
    if ((name, login, coverImg)) {
        return (
            <div className="d-flex justify-content-center flex-column text-center"
                    style={{background: "#000", minHeight: "100vh"}}>
                    <div className="mt-auto text-light mb-5">
                        <div className="ratio ratio-1x1 mx-auto mb-2">
                            <img src={coverImg} alt="cover Image"/>
                        </div>
                        <h2>{name}</h2>
                        <p>Please connet your wallet to continue.</p>
                        <button 
                            onClick={login}
                            variant="outline-light"
                            className="rounded-pill px-3 mt-3"
                        > 
                            Connet Wallet 
                        </button>
                    </div>
                    <p className="mt-auto text-secondary">Power by NEAR</p>
            </div>
        );
    }
    return null;
};

Cover.propTypes = {
    name: PropTypes.string
};
Cover.defaultProps = {
    name: ""
};

export default Cover;
