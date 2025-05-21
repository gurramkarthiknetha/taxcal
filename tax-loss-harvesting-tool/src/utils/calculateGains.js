/**
 * Calculate total gains before and after harvesting
 */

// Calculate total gains before harvesting (all holdings)
export const calculateBeforeHarvesting = (holdings) => {
  if (!holdings || holdings.length === 0) return { stcgProfit: 0, stcgLoss: 0, ltcgProfit: 0, ltcgLoss: 0 };

  const result = holdings.reduce((acc, holding) => {
    // Short-term capital gains
    if (holding.stcg.amount > 0) {
      acc.stcgProfit += holding.stcg.amount;
    } else {
      acc.stcgLoss += Math.abs(holding.stcg.amount);
    }

    // Long-term capital gains
    if (holding.ltcg.amount > 0) {
      acc.ltcgProfit += holding.ltcg.amount;
    } else {
      acc.ltcgLoss += Math.abs(holding.ltcg.amount);
    }

    return acc;
  }, { stcgProfit: 0, stcgLoss: 0, ltcgProfit: 0, ltcgLoss: 0 });

  return {
    ...result,
    stcgNet: result.stcgProfit - result.stcgLoss,
    ltcgNet: result.ltcgProfit - result.ltcgLoss,
    totalNet: (result.stcgProfit - result.stcgLoss) + (result.ltcgProfit - result.ltcgLoss)
  };
};

// Calculate total gains after harvesting (only selected holdings)
export const calculateAfterHarvesting = (holdings, selectedIds) => {
  if (!holdings || holdings.length === 0) return { stcgProfit: 0, stcgLoss: 0, ltcgProfit: 0, ltcgLoss: 0 };

  const selectedHoldings = holdings.filter(holding => selectedIds.includes(holding.id));
  return calculateBeforeHarvesting(selectedHoldings);
};

// Calculate tax savings
export const calculateTaxSavings = (beforeGains, afterGains) => {
  // Simple calculation - actual tax calculations would be more complex
  const beforeTax = beforeGains.totalNet > 0 ? beforeGains.totalNet * 0.15 : 0;
  const afterTax = afterGains.totalNet > 0 ? afterGains.totalNet * 0.15 : 0;
  
  return beforeTax - afterTax;
};
