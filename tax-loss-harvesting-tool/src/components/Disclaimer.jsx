import React, { useState } from 'react';

const Disclaimer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="disclaimer">
      <div className="disclaimer-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="disclaimer-icon">ⓘ</div>
        <div className="disclaimer-title">Important Notes & Disclaimers</div>
        <div className={`disclaimer-arrow ${isOpen ? 'open' : ''}`}>▼</div>
      </div>
      {isOpen && (
        <div className="disclaimer-content">
          <p>
            This tool provides an estimate of potential tax savings through tax loss harvesting.
            The calculations are based on simplified assumptions and should not be considered as
            financial or tax advice. Please consult with a qualified tax professional before
            making any investment decisions.
          </p>
        </div>
      )}
    </div>
  );
};

export default Disclaimer;
