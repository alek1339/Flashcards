import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CustomModal.scss';

function CustomModal({ message, onClose }) {
  const [showModal, setShowModal] = useState(true);

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
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

CustomModal.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CustomModal;
