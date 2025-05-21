import React from 'react';

const HowItWorksTooltip = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="tooltip-container">
      <div className="tooltip-arrow"></div>
      <div className="tooltip-content">
        <ul>
          <li>See your capital gains for FY 2024-25 in the left card</li>
          <li>Check boxes for assets you plan on selling to reduce your tax liability</li>
          <li>Instantly see your updated tax liability in the right card</li>
        </ul>
        
        <div className="tooltip-pro-tip">
          <strong>Pro tip:</strong> Experiment with different combinations of your holdings to optimize your tax liability
        </div>
      </div>
    </div>
  );
};

export default HowItWorksTooltip;
