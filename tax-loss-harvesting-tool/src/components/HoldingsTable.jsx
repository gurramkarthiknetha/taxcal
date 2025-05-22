import React, { useState } from 'react';

const HoldingsTable = ({ holdings = [], selectedIds = [], toggleSelection }) => {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [showAll, setShowAll] = useState(false);

  // Helper function to safely format numbers
  const formatNumber = (num) => {
    return (num || 0).toLocaleString();
  };

  // Sort holdings based on the selected field
  const sortedHoldings = [...holdings].sort((a, b) => {
    if (!sortField) return 0;

    let valueA, valueB;

    if (sortField === 'stcg') {
      valueA = a.stcg?.amount || 0;
      valueB = b.stcg?.amount || 0;
    } else if (sortField === 'ltcg') {
      valueA = a.ltcg?.amount || 0;
      valueB = b.ltcg?.amount || 0;
    } else if (sortField === 'value') {
      valueA = (a.totalHolding || 0) * (a.currentPrice || 0);
      valueB = (b.totalHolding || 0) * (b.currentPrice || 0);
    } else {
      valueA = a[sortField] || 0;
      valueB = b[sortField] || 0;
    }

    if (sortDirection === 'asc') {
      return valueA - valueB;
    } else {
      return valueB - valueA;
    }
  });

  // Handle sort click
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get sort indicator
  const getSortIndicator = (field) => {
    if (sortField !== field) return null;
    return (
      <span className={`sort-indicator ${sortDirection}`}>
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  // Limit the number of visible holdings unless showAll is true
  const visibleHoldings = showAll ? sortedHoldings : sortedHoldings.slice(0, 4);

  return (
    <div className="holdings-section">
      <h2 className="section-title">Holdings</h2>
      <div className="table-responsive">
        <div className="holdings-table">
        <div className="table-header">
          <div className="checkbox-cell">
            <input
              type="checkbox"
              checked={selectedIds.length === holdings.length && holdings.length > 0}
              onChange={() => {
                if (selectedIds.length === holdings.length) {
                  // Deselect all
                  toggleSelection([]);
                } else {
                  // Select all
                  toggleSelection(holdings.map(h => h.id));
                }
              }}
            />
          </div>
          <div className="asset-cell">Asset</div>
          <div className="holdings-cell">
            Holdings
            <div className="subtext">Current Market Rate</div>
          </div>
          <div className="value-cell" onClick={() => handleSort('value')}>
            Total Current Value {getSortIndicator('value')}
          </div>
          <div className="stcg-cell sortable" onClick={() => handleSort('stcg')}>
            Short-term {getSortIndicator('stcg')}
          </div>
          <div className="ltcg-cell sortable" onClick={() => handleSort('ltcg')}>
            Long-Term {getSortIndicator('ltcg')}
          </div>
          <div className="amount-cell">Amount to Sell</div>
        </div>

        {visibleHoldings.length > 0 ? (
          visibleHoldings.map((holding) => {
            const isSelected = selectedIds.includes(holding.id);
            const coinLogo = holding.logo || `/mock/images/${holding.coin.toLowerCase()}.svg`;

            // Safely access nested properties
            const stcgAmount = holding.stcg?.amount || 0;
            const stcgCoins = holding.stcg?.coins || 0;
            const ltcgAmount = holding.ltcg?.amount || 0;
            const ltcgCoins = holding.ltcg?.coins || 0;

            return (
              <div
                key={holding.id}
                className={`table-row ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleSelection([holding.id])}
              >
                <div className="checkbox-cell">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleSelection([holding.id]);
                    }}
                  />
                </div>

                <div className="asset-cell">
                  <div className="coin-info">
                    <div className="coin-logo">
                      {/* Placeholder for coin logo */}
                      <div className="logo-placeholder">{holding.coin?.charAt(0) || '?'}</div>
                    </div>
                    <div className="coin-details">
                      <div className="coin-name">{holding.coinName || 'Unknown'}</div>
                      <div className="coin-symbol">{holding.coin || '???'}</div>
                    </div>
                  </div>
                </div>

                <div className="holdings-cell">
                  <div>{formatNumber(holding.totalHolding)} {holding.coin}</div>
                  <div className="rate-subtext">$ {formatNumber(holding.averageBuyPrice)}/{holding.coin}</div>
                </div>

                <div className="value-cell">
                  $ {formatNumber(holding.totalHolding * holding.currentPrice)}
                </div>

                <div className={`stcg-cell ${stcgAmount < 0 ? 'negative' : 'positive'}`}>
                  {stcgAmount < 0 ? '-$' : '$'} {formatNumber(Math.abs(stcgAmount))}
                  <div className="coins-subtext">{formatNumber(stcgCoins)} {holding.coin}</div>
                </div>

                <div className={`ltcg-cell ${ltcgAmount < 0 ? 'negative' : 'positive'}`}>
                  {ltcgAmount < 0 ? '-$' : '+'} {formatNumber(Math.abs(ltcgAmount))}
                  <div className="coins-subtext">{formatNumber(ltcgCoins)} {holding.coin}</div>
                </div>

                <div className="amount-cell">
                  {isSelected ? `${formatNumber(holding.totalHolding)} ${holding.coin}` : '-'}
                </div>
              </div>
            );
          })
        ) : (
          <div className="table-row">
            <div className="empty-message" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px' }}>
              No holdings data available
            </div>
          </div>
        )}
      </div>
      </div>

      {holdings.length > 4 && (
        <div className="view-all">
          <button
            className="view-all-button"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show less' : 'View all'}
          </button>
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;
