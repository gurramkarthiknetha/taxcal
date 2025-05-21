import React, { useState } from 'react';
import HowItWorksTooltip from './HowItWorksTooltip';

const Header = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <span className="logo-text">KoinX</span>
      </div>
      <div className="title-container">
        <h1 className="title">Tax Harvesting</h1>
        <div className="tooltip-wrapper">
          <button
            className="how-it-works"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            How it works?
          </button>
          <HowItWorksTooltip isVisible={showTooltip} />
        </div>
      </div>
    </header>
  );
};

export default Header;
