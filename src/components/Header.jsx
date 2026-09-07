import { useState } from 'react';
import { Search, X, Menu } from 'lucide-react';
import '../styles/Header.css';

function Header({ view, setView, savedCount, query, setQuery, onSubmitSearch }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavLink = ({ target, children }) => (
    <button
      onClick={() => { setView(target); setMobileOpen(false); }}
      className={`header__nav-link ${view === target ? 'header__nav-link--active' : ''}`}
    >
      {children}
    </button>
  );

  return (
    <header className="header">
      <div className="header__inner container">
        <button onClick={() => setView("home")} className="header__logo">
          <span className="header__logo-mark">P</span>
          <span className="header__logo-text">PenJobs</span>
        </button>

        <nav className="header__nav">
          <NavLink target="home">Home</NavLink>
          <NavLink target="listings">Browse</NavLink>
          <NavLink target="saved">Saved{savedCount > 0 ? ` (${savedCount})` : ""}</NavLink>
        </nav>

        <div className="header__search">
          <form
            onSubmit={(e) => { e.preventDefault(); onSubmitSearch(); }}
            className="header__search-form"
          >
            <Search size={16} className="header__search-icon" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search opportunities"
              className="header__search-input"
            />
          </form>
        </div>

        <button className="header__menu-btn" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="header__mobile">
          <form onSubmit={(e) => { e.preventDefault(); onSubmitSearch(); setMobileOpen(false); }} className="header__mobile-search">
            <Search size={16} className="header__search-icon" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search opportunities"
              className="header__search-input"
            />
          </form>
          <div className="header__mobile-nav">
            <NavLink target="home">Home</NavLink>
            <NavLink target="listings">Browse</NavLink>
            <NavLink target="saved">Saved{savedCount > 0 ? ` (${savedCount})` : ""}</NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
