import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";

const AtmButtons = ({ buttonsArray, changeAmount }) => {
  return (
    <div className="row atm-buttons">
      {/* 
        Map through the buttonsArray to create the buttons, blank and delete values 
        used for backspace and blank buttons
      */}
      {buttonsArray.map(value => (
        <div className="col-sm-4 mb-4" key={value}>
          {value !== "blank" ? (
            <button
              type="button"
              className="btn btn-light rounded-circle btn-atm"
              onClick={() => changeAmount(value)}
            >
              {value === "delete" ? (
                <FontAwesomeIcon icon={faBackspace} />
              ) : (
                value
              )}
            </button>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};

export default AtmButtons;
