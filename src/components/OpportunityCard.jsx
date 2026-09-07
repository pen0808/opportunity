import { MapPin, Calendar, ChevronRight, Building2, Bookmark, BookmarkCheck, Briefcase, GraduationCap, Award, Sprout, PenLine } from 'lucide-react';
import { TYPE_META, daysLeft } from '../data/constants';
import Badge from './Badge';
import DeadlinePill from './DeadlinePill';
import '../styles/OpportunityCard.css';

const ICONS = {
  Briefcase, GraduationCap, Award, Sprout, PenLine,
};

function OpportunityCard({ opp, onSelect, saved, onToggleSave }) {
  const meta = TYPE_META[opp.type];
  const Icon = ICONS[meta.icon];
  const closed = daysLeft(opp.deadline) <= 0;

  return (
    <div className={`opp-card ${closed ? 'opp-card--closed' : ''}`}>
      <button
        onClick={() => onToggleSave(opp.id)}
        aria-label={saved ? "Unsave" : "Save"}
        className="opp-card__save-btn"
      >
        {saved ? <BookmarkCheck size={18} className="opp-card__save-icon--active" /> : <Bookmark size={18} />}
      </button>

      <div className="opp-card__header">
        <span className={`opp-card__icon opp-card__icon--${meta.color}`}>
          <Icon size={16} />
        </span>
        <Badge color={meta.color}>{opp.type}</Badge>
      </div>

      <button onClick={() => onSelect(opp.id)} className="opp-card__title-btn">
        <h3 className="opp-card__title font-serif">
          {opp.title}
        </h3>
      </button>
      <p className="opp-card__org">
        <Building2 size={13} /> {opp.org}
      </p>
      <p className="opp-card__summary line-clamp-2">{opp.summary}</p>

      <div className="opp-card__meta">
        <span className="opp-card__meta-item"><MapPin size={12} /> {opp.location}</span>
        <span className="opp-card__meta-dot">•</span>
        <span className="opp-card__meta-item"><Calendar size={12} /> {opp.stipend}</span>
      </div>

      <div className="opp-card__footer">
        <DeadlinePill deadline={opp.deadline} />
        <button onClick={() => onSelect(opp.id)} className="opp-card__details-btn">
          Details <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default OpportunityCard;
