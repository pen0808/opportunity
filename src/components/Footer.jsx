import { OPPORTUNITIES } from '../data/constants';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <p>© 2026 PenJobs. A place to find your next step.</p>
        <p>{OPPORTUNITIES.length} opportunities listed</p>
      </div>
    </footer>
  );
}

export default Footer;
