import React from 'react';

const SummaryPanel = ({ title, data = {}, isAfterHarvesting = false, taxSavings = 0 }) => {
  // Set default values to prevent undefined errors
  const {
    stcgProfit = 0,
    stcgLoss = 0,
    ltcgProfit = 0,
    ltcgLoss = 0,
    stcgNet = 0,
    ltcgNet = 0,
    totalNet = 0
  } = data;

  // Helper function to safely format numbers
  const formatNumber = (num) => {
    return (num || 0).toLocaleString();
  };

  return (
    <div className={`summary-panel ${isAfterHarvesting ? 'after-harvesting' : 'pre-harvesting'}`}>
      <h2 className="panel-title">{title}</h2>

      <div className="gains-table">
        <div className="table-header">
          <div className="header-item"></div>
          <div className="header-item">Short-term</div>
          <div className="header-item">Long-term</div>
        </div>

        <div className="table-row">
          <div className="row-label">Profits</div>
          <div className="row-value">$ {formatNumber(stcgProfit)}</div>
          <div className="row-value">$ {formatNumber(ltcgProfit)}</div>
        </div>

        <div className="table-row">
          <div className="row-label">Losses</div>
          <div className="row-value negative">- $ {formatNumber(stcgLoss)}</div>
          <div className="row-value negative">- $ {formatNumber(ltcgLoss)}</div>
        </div>

        <div className="table-row net-row">
          <div className="row-label">Net Capital Gains</div>
          <div className="row-value">$ {formatNumber(stcgNet)}</div>
          <div className="row-value">$ {formatNumber(ltcgNet)}</div>
        </div>
      </div>

      <div className="total-gains">
        <div className="total-label">{isAfterHarvesting ? 'Effective Capital Gains:' : 'Realised Capital Gains:'}</div>
        <div className={`total-value ${totalNet < 0 ? 'negative' : ''}`}>
          {totalNet < 0 ? '- ' : ''}$ {formatNumber(Math.abs(totalNet))}
        </div>
      </div>

      {isAfterHarvesting && taxSavings > 0 && (
        <div className="tax-savings">
          <span className="savings-icon">💰</span>
          <span className="savings-text">You are going to save upto: $ {formatNumber(taxSavings)}</span>
        </div>
      )}
    </div>
  );
};

export default SummaryPanel;
