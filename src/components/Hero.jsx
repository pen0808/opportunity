import { Search, ChevronRight, Clock } from 'lucide-react';
import { OPPORTUNITIES, daysLeft, FIELDS } from '../data/constants';
import Button from './Button';
import '../styles/Hero.css';

function Hero({ query, setQuery, onSearch }) {
  const sorted = OPPORTUNITIES.slice().sort((a, b) => daysLeft(a.deadline) - daysLeft(b.deadline));
  const closest = sorted[0];

  return (
    <section className="hero">
      <div className="hero__inner container">
        <div className="hero__content">
          <h1 className="hero__title font-serif">
            Find the opportunity that moves you forward.
          </h1>
          <p className="hero__subtitle">
            Jobs, internships, scholarships, fellowships, and grants — gathered in one place, with deadlines that actually stay current.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); onSearch(); }} className="hero__form">
            <div className="hero__input-wrapper">
              <Search size={18} className="hero__input-icon" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Try "frontend developer" or "scholarship"'
                className="hero__input"
              />
            </div>
            <Button type="submit" variant="accent" className="hero__submit-btn">
              Search <ChevronRight size={16} />
            </Button>
          </form>
        </div>

        <div className="hero__sidebar">
          <div className="hero__sidebar-card">
            <p className="hero__sidebar-label">Closing soon</p>
            <p className="hero__sidebar-title font-serif">{closest.title}</p>
            <p className="hero__sidebar-org">{closest.org}</p>
            <div className="hero__sidebar-deadline">
              <Clock size={14} />
              {daysLeft(closest.deadline)} days left to apply
            </div>
            <div className="hero__sidebar-stats">
              <div>
                <p className="hero__sidebar-stat-num font-serif">{OPPORTUNITIES.length}</p>
                <p className="hero__sidebar-stat-label">Open now</p>
              </div>
              <div>
                <p className="hero__sidebar-stat-num font-serif">{new Set(OPPORTUNITIES.map(o => o.org)).size}</p>
                <p className="hero__sidebar-stat-label">Organizations</p>
              </div>
              <div>
                <p className="hero__sidebar-stat-num font-serif">{FIELDS.length}</p>
                <p className="hero__sidebar-stat-label">Fields</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
