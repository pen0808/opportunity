import { ArrowLeft, CheckCircle2, Building2, MapPin, Calendar, Clock, Bookmark, BookmarkCheck, Briefcase, GraduationCap, Award, Sprout, PenLine } from 'lucide-react';
import { TYPE_META, daysLeft } from '../data/constants';
import Badge from '../components/Badge';
import DeadlinePill from '../components/DeadlinePill';
import Button from '../components/Button';
import OpportunityCard from '../components/OpportunityCard';
import '../styles/DetailPage.css';

const ICONS = {
  Briefcase, GraduationCap, Award, Sprout, PenLine,
};

function DetailPage({ opp, onBack, saved, onToggleSave, onApply, related, onSelectRelated }) {
  const meta = TYPE_META[opp.type];
  const Icon = ICONS[meta.icon];
  const closed = daysLeft(opp.deadline) <= 0;

  return (
    <div className="detail container">
      <button onClick={onBack} className="detail__back">
        <ArrowLeft size={15} /> Back to opportunities
      </button>

      <div className="detail__layout">
        <div className="detail__main">
          <div className="detail__badges">
            <span className={`detail__icon detail__icon--${meta.color}`}>
              <Icon size={18} />
            </span>
            <Badge color={meta.color}>{opp.type}</Badge>
            <Badge color="slate">{opp.field}</Badge>
          </div>
          <h1 className="detail__title font-serif">{opp.title}</h1>
          <p className="detail__org"><Building2 size={15} /> {opp.org} · {opp.city}</p>

          <p className="detail__summary">{opp.summary}</p>

          <div className="detail__requirements">
            <h2 className="detail__section-title font-serif">What you'll need</h2>
            <ul className="detail__req-list">
              {opp.requirements.map((r, i) => (
                <li key={i} className="detail__req-item">
                  <CheckCircle2 size={16} className="detail__req-icon" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {related.length > 0 && (
            <div className="detail__related">
              <h2 className="detail__section-title font-serif">Similar opportunities</h2>
              <div className="detail__related-grid">
                {related.map((r) => (
                  <OpportunityCard key={r.id} opp={r} onSelect={onSelectRelated} saved={false} onToggleSave={() => {}} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="detail__sidebar-wrapper">
          <div className="detail__sidebar">
            <DeadlinePill deadline={opp.deadline} />
            <div className="detail__sidebar-info">
              <p className="detail__sidebar-row"><MapPin size={14} className="detail__sidebar-icon" /> {opp.location}</p>
              <p className="detail__sidebar-row"><Calendar size={14} className="detail__sidebar-icon" /> {opp.stipend}</p>
              <p className="detail__sidebar-row"><Clock size={14} className="detail__sidebar-icon" /> Deadline {new Date(opp.deadline).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</p>
            </div>
            <Button variant="accent" className="detail__apply-btn" disabled={closed} onClick={onApply}>
              {closed ? "Applications closed" : "Apply now"}
            </Button>
            <Button variant="outline" className="detail__save-btn" onClick={() => onToggleSave(opp.id)}>
              {saved ? <><BookmarkCheck size={16} /> Saved</> : <><Bookmark size={16} /> Save for later</>}
            </Button>
          </div>
        </div>
      </div>

      <div className="detail__mobile-bar">
        <button onClick={() => onToggleSave(opp.id)} className="detail__mobile-save">
          {saved ? <BookmarkCheck size={18} className="detail__save-icon--active" /> : <Bookmark size={18} />}
        </button>
        <Button variant="accent" className="detail__mobile-apply" disabled={closed} onClick={onApply}>
          {closed ? "Applications closed" : "Apply now"}
        </Button>
      </div>
    </div>
  );
}

export default DetailPage;
