import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { OPPORTUNITIES } from '../data/constants';
import OpportunityCard from '../components/OpportunityCard';
import EmptyState from '../components/EmptyState';
import FilterPanel from '../components/FilterPanel';
import Button from '../components/Button';
import '../styles/ListingsPage.css';

function ListingsPage({ query, setQuery, filters, setFilters, savedIds, onToggleSave, onSelect, onlySaved }) {
  const [sort, setSort] = useState("deadline");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = OPPORTUNITIES.filter((o) => {
      if (onlySaved && !savedIds.includes(o.id)) return false;
      const q = query.trim().toLowerCase();
      if (q && !(o.title.toLowerCase().includes(q) || o.org.toLowerCase().includes(q) || o.field.toLowerCase().includes(q))) return false;
      if (filters.type.length && !filters.type.includes(o.type)) return false;
      if (filters.field.length && !filters.field.includes(o.field)) return false;
      if (filters.location.length && !filters.location.includes(o.location)) return false;
      return true;
    });
    list = list.slice().sort((a, b) =>
      sort === "deadline"
        ? new Date(a.deadline) - new Date(b.deadline)
        : new Date(b.posted) - new Date(a.posted)
    );
    return list;
  }, [query, filters, sort, onlySaved, savedIds]);

  const counts = useMemo(() => {
    const c = { type: {}, field: {}, location: {} };
    OPPORTUNITIES.forEach((o) => {
      c.type[o.type] = (c.type[o.type] || 0) + 1;
      c.field[o.field] = (c.field[o.field] || 0) + 1;
      c.location[o.location] = (c.location[o.location] || 0) + 1;
    });
    return c;
  }, []);

  const clearFilters = () => setFilters({ type: [], field: [], location: [] });

  return (
    <div className="listings container">
      <div className="listings__header">
        <h2 className="listings__title font-serif">{onlySaved ? "Saved opportunities" : "Browse opportunities"}</h2>
        <p className="listings__count">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
      </div>

      <div className="listings__layout">
        <aside className="listings__sidebar">
          <FilterPanel filters={filters} setFilters={setFilters} counts={counts} onClear={clearFilters} />
        </aside>

        <div className="listings__main">
          <div className="listings__toolbar">
            <div className="listings__search-wrapper">
              <Search size={16} className="listings__search-icon" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, organization, or field"
                className="listings__search-input"
              />
            </div>
            <button onClick={() => setMobileFiltersOpen(true)} className="listings__filter-btn">
              <SlidersHorizontal size={15} /> Filters
            </button>
            <div className="listings__sort-wrapper">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="listings__sort-select"
              >
                <option value="deadline">Deadline: soonest</option>
                <option value="posted">Newest posted</option>
              </select>
              <ChevronDown size={14} className="listings__sort-icon" />
            </div>
          </div>

          <div className="listings__grid">
            {filtered.length ? filtered.map((o) => (
              <OpportunityCard key={o.id} opp={o} onSelect={onSelect} saved={savedIds.includes(o.id)} onToggleSave={onToggleSave} />
            )) : <EmptyState onReset={() => { clearFilters(); setQuery(""); }} />}
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="listings__mobile-overlay">
          <div className="listings__mobile-backdrop" onClick={() => setMobileFiltersOpen(false)} />
          <div className="listings__mobile-panel">
            <div className="listings__mobile-header">
              <p className="listings__mobile-title font-serif">Filters</p>
              <button onClick={() => setMobileFiltersOpen(false)}><X size={20} className="listings__mobile-close" /></button>
            </div>
            <FilterPanel filters={filters} setFilters={setFilters} counts={counts} onClear={clearFilters} />
            <Button variant="primary" className="listings__mobile-apply" onClick={() => setMobileFiltersOpen(false)}>
              Show {filtered.length} results
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListingsPage;
