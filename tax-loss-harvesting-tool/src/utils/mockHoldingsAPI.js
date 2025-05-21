/**
 * Mock API for fetching holdings data
 */
export const fetchHoldings = async () => {
  try {
    const response = await fetch('/mock/holdings.json');
    if (!response.ok) {
      throw new Error('Failed to fetch holdings data');
    }
    const data = await response.json();
    return data.holdings;
  } catch (error) {
    console.error('Error fetching holdings:', error);
    return [];
  }
};
