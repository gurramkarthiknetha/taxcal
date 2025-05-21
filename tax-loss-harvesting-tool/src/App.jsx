import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Disclaimer from './components/Disclaimer';
import SummaryPanel from './components/SummaryPanel';
import HoldingsTable from './components/HoldingsTable';
import { fetchHoldings } from './utils/mockHoldingsAPI';
import { calculateBeforeHarvesting, calculateAfterHarvesting, calculateTaxSavings } from './utils/calculateGains';

function App() {
  const [holdings, setHoldings] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [beforeGains, setBeforeGains] = useState({
    stcgProfit: 1540,
    stcgLoss: 743,
    ltcgProfit: 1200,
    ltcgLoss: 650,
    stcgNet: 787,
    ltcgNet: 550,
    totalNet: 1337
  });
  const [afterGains, setAfterGains] = useState({
    stcgProfit: 1540,
    stcgLoss: 2343,
    ltcgProfit: 1200,
    ltcgLoss: 3650,
    stcgNet: -803,
    ltcgNet: -2450,
    totalNet: -3253
  });
  const [taxSavings, setTaxSavings] = useState(862);

  useEffect(() => {
    const loadHoldings = async () => {
      const data = await fetchHoldings();
      setHoldings(data);
      // Initially select all holdings
      setSelectedIds(data.map(h => h.id));

      // Calculate initial gains
      const before = calculateBeforeHarvesting(data);
      setBeforeGains(before);

      // Initially after = before since all are selected
      setAfterGains(before);
    };

    loadHoldings();
  }, []);

  const toggleSelection = (ids) => {
    let newSelectedIds;

    if (ids.length === 0) {
      // Deselect all
      newSelectedIds = [];
    } else if (ids.length === 1) {
      const id = ids[0];
      if (selectedIds.includes(id)) {
        // Remove if already selected
        newSelectedIds = selectedIds.filter(selectedId => selectedId !== id);
      } else {
        // Add if not selected
        newSelectedIds = [...selectedIds, id];
      }
    } else {
      // Select all
      newSelectedIds = ids;
    }

    setSelectedIds(newSelectedIds);

    // Recalculate after gains
    const after = calculateAfterHarvesting(holdings, newSelectedIds);
    setAfterGains(after);

    // Calculate tax savings
    const savings = calculateTaxSavings(beforeGains, after);
    setTaxSavings(savings);
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Disclaimer />

        <div className="summary-panels">
          <SummaryPanel
            title="Pre Harvesting"
            data={beforeGains}
          />
          <SummaryPanel
            title="After Harvesting"
            data={afterGains}
            isAfterHarvesting={true}
            taxSavings={taxSavings}
          />
        </div>

        <HoldingsTable
          holdings={holdings}
          selectedIds={selectedIds}
          toggleSelection={toggleSelection}
        />
      </main>
    </div>
  );
}

export default App;
