import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/**
 * DeleteConfirmationModal component displays a modal for confirming deletion using portals.
 *
 * This component provides a modal dialog for confirming the deletion of an item. It uses
 * React Portals to render the modal outside of its parent DOM hierarchy, ensuring proper
 * layering and isolation.
 *
 * @component
 * @param {boolean} show - Determines whether the modal is visible.
 * @param {function} onClose - Callback function to close the modal.
 * @param {function} onDelete - Callback function to confirm and execute the deletion.
 * @returns {JSX.Element|null} The DeleteConfirmationModal component.
 */
const DeleteConfirmationModal = ({ show, onClose, onDelete }) => {
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        show ? 'block' : 'hidden'
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-40"></div>
      <div className="bg-white p-4 rounded shadow-md z-10">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete this item?</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 mr-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

DeleteConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteConfirmationModal;
