import { Clock } from 'lucide-react';
import { daysLeft } from '../data/constants';
import '../styles/DeadlinePill.css';

function DeadlinePill({ deadline }) {
  const d = daysLeft(deadline);
  const label = d <= 0 ? "Closed" : d === 1 ? "1 day left" : `${d} days left`;
  let tone = "deadline-pill--safe";
  if (d <= 7) tone = "deadline-pill--urgent";
  else if (d <= 21) tone = "deadline-pill--warning";

  return (
    <span className={`deadline-pill ${tone}`}>
      <Clock size={12} /> {label}
    </span>
  );
}

export default DeadlinePill;
