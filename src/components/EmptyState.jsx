import { Search } from 'lucide-react';
import Button from './Button';
import '../styles/EmptyState.css';

function EmptyState({ onReset }) {
  return (
    <div className="empty-state">
      <Search size={28} className="empty-state__icon" />
      <p className="empty-state__title font-serif">Nothing matches those filters</p>
      <p className="empty-state__text">Try a broader search term or clear a filter to see more opportunities.</p>
      <Button variant="outline" className="empty-state__btn" onClick={onReset}>Clear filters</Button>
    </div>
  );
}

export default EmptyState;
