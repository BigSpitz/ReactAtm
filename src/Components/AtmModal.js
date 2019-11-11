import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";

const AtmModal = props => {
  const { className, amountAtm, clearAmount, formatAmount } = props;
  const [modal, setModal] = useState(false);
  const [amountDetails, setAmountDetails] = useState([]);

  const toggle = () => {
    setModal(false);
    clearAmount();
  };
  /* Change modal title depending on amountDetails (withdrawAmount function returned a non empty array) */
  const modalTitle = () =>
    amountDetails && amountDetails.length > 0 ? "Success" : "Error";
  /* Check Modal message for non valid amounts, 0 amount and for accepted amounts */
  const modalMessage = () => {
    if (!amountDetails) {
      return "Please enter valid amount";
    } else if (amountAtm === "0") {
      return "Please specify the amount";
    } else {
      return "Please take your cash";
    }
  };
  /* Ajax api call passing the amount inputed */
  function withdrawAmount() {
    fetch("https://us-central1-atm-backend-2cc1b.cloudfunctions.net/withdraw", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount: amountAtm })
    })
      /* Handle errors */
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then(data => setAmountDetails(data))
      .then(() => setModal(!modal))
      /* catch error, set amount details to null (for modalMessage correct check) and open modal */
      .catch(error => {
        console.log(error);
        setAmountDetails(null);
        setModal(!modal);
      });
  }
  return (
    <div className="atm-modal">
      <Button
        outline
        color="primary"
        size="lg"
        tabIndex="0"
        block
        onClick={withdrawAmount}
        className="withdraw-button"
      >
        Withdraw
      </Button>
      <Modal
        isOpen={modal}
        fade={false}
        toggle={toggle}
        className={className}
        autoFocus={false}
      >
        <ModalHeader toggle={toggle}>{modalTitle()}</ModalHeader>
        <ModalBody>
          <p>{modalMessage()}</p>{" "}
          {amountDetails
            ? amountDetails.map(function(o, i) {
                return (
                  <div className="row" key={i}>
                    <div className="col-sm-1">
                      <FontAwesomeIcon icon={faMoneyBillWave} />
                    </div>
                    <div className="col-sm-2 px-1">
                      {formatAmount(o.banknoteValue)}
                    </div>
                    <div className="col-sm-9 px-1">x {o.quantity}</div>
                  </div>
                );
              })
            : ""}
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={toggle}
            className="js-modal-button"
            autoFocus
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AtmModal;
