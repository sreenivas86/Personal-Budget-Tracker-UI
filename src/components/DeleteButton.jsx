import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

function DeleteButton({ onClick }) {
  return (
    <button className="btn btn-danger btn-sm" onClick={onClick}>
      <i className="bi bi-trash me-1"></i> Delete
    </button>
  );
}

export default DeleteButton;
