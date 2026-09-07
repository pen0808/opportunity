import { Briefcase, GraduationCap, Award, Sprout, PenLine } from 'lucide-react';
import { TYPE_META } from '../data/constants';
import '../styles/CategoryStrip.css';

const ICONS = {
  Briefcase, GraduationCap, Award, Sprout, PenLine,
};

function CategoryStrip({ onPick }) {
  const cats = Object.entries(TYPE_META);

  return (
    <div className="category-strip container">
      <p className="category-strip__label">Browse by type</p>
      <div className="category-strip__list">
        {cats.map(([type, meta]) => {
          const Icon = ICONS[meta.icon];
          return (
            <button
              key={type}
              onClick={() => onPick(type)}
              className="category-strip__item"
            >
              <Icon size={15} className={`color-${meta.color}`} />
              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryStrip;
