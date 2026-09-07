import { TYPE_META, FIELDS, LOCATIONS } from '../data/constants';
import '../styles/FilterPanel.css';

function CheckRow({ checked, onChange, label, count }) {
  return (
    <label className="filter-check">
      <span className="filter-check__left">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="filter-check__input"
        />
        <span className="filter-check__label">{label}</span>
      </span>
      <span className="filter-check__count">{count}</span>
    </label>
  );
}

function FilterPanel({ filters, setFilters, counts, onClear }) {
  const toggle = (key, value) => {
    setFilters((f) => {
      const set = new Set(f[key]);
      set.has(value) ? set.delete(value) : set.add(value);
      return { ...f, [key]: Array.from(set) };
    });
  };

  return (
    <div className="filter-panel">
      <div className="filter-panel__header">
        <p className="filter-panel__title">Filters</p>
        <button onClick={onClear} className="filter-panel__clear">Clear all</button>
      </div>

      <div className="filter-panel__section">
        <p className="filter-panel__section-title">Type</p>
        {Object.keys(TYPE_META).map((t) => (
          <CheckRow key={t} label={t} count={counts.type[t] || 0} checked={filters.type.includes(t)} onChange={() => toggle("type", t)} />
        ))}
      </div>

      <div className="filter-panel__section">
        <p className="filter-panel__section-title">Field</p>
        {FIELDS.map((f) => (
          <CheckRow key={f} label={f} count={counts.field[f] || 0} checked={filters.field.includes(f)} onChange={() => toggle("field", f)} />
        ))}
      </div>

      <div className="filter-panel__section">
        <p className="filter-panel__section-title">Location</p>
        {LOCATIONS.map((l) => (
          <CheckRow key={l} label={l} count={counts.location[l] || 0} checked={filters.location.includes(l)} onChange={() => toggle("location", l)} />
        ))}
      </div>
    </div>
  );
}

export default FilterPanel;
