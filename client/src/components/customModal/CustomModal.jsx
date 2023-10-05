import { useState } from "react";
import Button from "../button/Button";
import { BUTTONS } from "../../constants/buttonClasses";
import PropTypes from "prop-types";
import "./CustomModal.scss";

function CustomModal({ message, onClose, closeLabel }) {
  const [showModal, setShowModal] = useState(true);
  const primaryButton = BUTTONS.PRIMARY;

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <>
      {showModal && (
        <div className="custom-modal">
          <div className="modal-content">
            <p>{message}</p>
            <Button
              onClick={handleClose}
              label={closeLabel}
              className={primaryButton}
            />
          </div>
        </div>
      )}
    </>
  );
}

CustomModal.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  closeLabel: PropTypes.string,
};

CustomModal.defaultProps = {
  closeLabel: "Close",
};

export default CustomModal;
