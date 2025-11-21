import React from 'react';

const ContactButton = ({ icon, backgroundColor, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: backgroundColor,
        color: 'white',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        border: 'none',
        cursor: 'pointer',
        zIndex: 1000,
      }}
    >
      {icon}
    </button>
  );
};

export default ContactButton;
