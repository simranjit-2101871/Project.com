// Modal.js
import React from 'react';
//import './Modal.css'; // you'll define the CSS below

export default function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
}
