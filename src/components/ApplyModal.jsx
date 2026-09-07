import { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import Button from './Button';
import '../styles/ApplyModal.css';

function ApplyModal({ opp, onClose }) {
  const [step, setStep] = useState("form");
  const [form, setForm] = useState({ name: "", email: "", note: "" });

  const submit = (e) => {
    e.preventDefault();
    setStep("done");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-panel">
        <button onClick={onClose} className="modal-close"><X size={20} /></button>

        {step === "form" ? (
          <>
            <p className="modal-label">Applying to</p>
            <h3 className="modal-title font-serif">{opp.title}</h3>
            <p className="modal-org">{opp.org}</p>
            <form onSubmit={submit} className="modal-form">
              <div className="modal-field">
                <label className="modal-field-label">Full name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="modal-field-input"
                  placeholder="Your full name"
                />
              </div>
              <div className="modal-field">
                <label className="modal-field-label">Email address</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="modal-field-input"
                  placeholder="you@example.com"
                />
              </div>
              <div className="modal-field">
                <label className="modal-field-label">
                  Why are you a fit? <span className="modal-field-optional">(optional)</span>
                </label>
                <textarea
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  rows={3}
                  className="modal-field-textarea"
                  placeholder="A sentence or two is plenty"
                />
              </div>
              <Button type="submit" variant="accent" className="modal-submit">Submit application</Button>
            </form>
          </>
        ) : (
          <div className="modal-success">
            <div className="modal-success-icon">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="modal-success-title font-serif">Application sent</h3>
            <p className="modal-success-text">
              {opp.org} will reach out to {form.email || "your email"} if you're shortlisted for {opp.title}.
            </p>
            <Button variant="primary" className="modal-success-btn" onClick={onClose}>Done</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplyModal;
