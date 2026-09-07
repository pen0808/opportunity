import { useState, useMemo } from 'react';
import { OPPORTUNITIES } from './data/constants';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryStrip from './components/CategoryStrip';
import OpportunityCard from './components/OpportunityCard';
import Footer from './components/Footer';
import ListingsPage from './pages/ListingsPage';
import DetailPage from './pages/DetailPage';
import ApplyModal from './components/ApplyModal';
import './App.css';

function App() {
  const [view, setView] = useState("home");
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ type: [], field: [], location: [] });
  const [savedIds, setSavedIds] = useState([]);
  const [applyFor, setApplyFor] = useState(null);

  const toggleSave = (id) => setSavedIds((ids) => ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]);

  const goToListings = () => setView("listings");
  const selectOpportunity = (id) => { setSelectedId(id); setView("detail"); window.scrollTo?.(0, 0); };
  const pickType = (type) => { setFilters({ type: [type], field: [], location: [] }); setView("listings"); };

  const selected = OPPORTUNITIES.find((o) => o.id === selectedId);
  const related = selected
    ? OPPORTUNITIES.filter((o) => o.id !== selected.id && (o.field === selected.field || o.type === selected.type)).slice(0, 2)
    : [];

  return (
    <div className="app">
      <Header
        view={view}
        setView={setView}
        savedCount={savedIds.length}
        query={query}
        setQuery={setQuery}
        onSubmitSearch={goToListings}
      />

      {view === "home" && (
        <>
          <Hero query={query} setQuery={setQuery} onSearch={goToListings} />
          <CategoryStrip onPick={pickType} />
          <div className="home-recent container">
            <div className="home-recent__header">
              <h2 className="home-recent__title font-serif">Recently posted</h2>
              <button onClick={goToListings} className="home-recent__view-all">
                View all <span className="home-recent__arrow">→</span>
              </button>
            </div>
            <div className="home-recent__grid">
              {OPPORTUNITIES.slice()
                .sort((a, b) => new Date(b.posted) - new Date(a.posted))
                .slice(0, 6)
                .map((o) => (
                  <OpportunityCard
                    key={o.id}
                    opp={o}
                    onSelect={selectOpportunity}
                    saved={savedIds.includes(o.id)}
                    onToggleSave={toggleSave}
                  />
                ))}
            </div>
          </div>
        </>
      )}

      {view === "listings" && (
        <ListingsPage
          query={query}
          setQuery={setQuery}
          filters={filters}
          setFilters={setFilters}
          savedIds={savedIds}
          onToggleSave={toggleSave}
          onSelect={selectOpportunity}
          onlySaved={false}
        />
      )}

      {view === "saved" && (
        <ListingsPage
          query={query}
          setQuery={setQuery}
          filters={filters}
          setFilters={setFilters}
          savedIds={savedIds}
          onToggleSave={toggleSave}
          onSelect={selectOpportunity}
          onlySaved={true}
        />
      )}

      {view === "detail" && selected && (
        <DetailPage
          opp={selected}
          onBack={() => setView("listings")}
          saved={savedIds.includes(selected.id)}
          onToggleSave={toggleSave}
          onApply={() => setApplyFor(selected)}
          related={related}
          onSelectRelated={selectOpportunity}
        />
      )}

      {applyFor && <ApplyModal opp={applyFor} onClose={() => setApplyFor(null)} />}

      <Footer />
    </div>
  );
}

export default App;
