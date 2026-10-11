import { useState, useRef } from 'react';
import { loveConfig } from '../config/loveConfig';
import { FloatingHearts } from '../components/FloatingHearts';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { useToast } from '../components/ToastContainer';

interface ApologyFormPageProps {
  onNext: () => void;
  onBack: () => void;
}

const LOADING_STEPS = [
  { label: 'Checking sincerity…', pct: 15 },
  { label: 'Searching for a functioning brain…', pct: 30 },
  { label: 'Removing unnecessary ego…', pct: 48 },
  { label: 'Installing better listening skills…', pct: 65 },
  { label: 'Preparing a genuine apology…', pct: 82 },
  { label: 'Calibrating emotional intelligence…', pct: 91 },
  { label: 'Application processed. Sincerity detected. Ego successfully reduced by 97%.', pct: 100 },
];

export function ApologyFormPage({ onNext, onBack }: ApologyFormPageProps) {
  const [submitted, setSubmitted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  const [progressLabel, setProgressLabel] = useState('Ready to process…');
  const [done, setDone] = useState(false);
  const stepRef = useRef(0);
  const { addToast } = useToast();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (processing || done) return;
    setSubmitted(true);
    setProcessing(true);
    addToast('Processing your extremely sincere apology… 📋', '🔄');

    let step = 0;
    function runStep() {
      if (step >= LOADING_STEPS.length) {
        setProcessing(false);
        setDone(true);
        addToast('Application approved! Ego successfully removed. ✅', '🎉');
        return;
      }
      const s = LOADING_STEPS[step];
      setProgressPct(s.pct);
      setProgressLabel(s.label);
      stepRef.current = step;
      step++;
      setTimeout(runStep, step < LOADING_STEPS.length ? 900 : 0);
    }
    setTimeout(runStep, 400);
  }

  return (
    <div
      className="page-wrapper page-enter"
      style={{ background: 'var(--gradient-apology)', minHeight: '100svh' }}
    >
      <FloatingHearts />

      <div className="page-content" style={{ gap: 'var(--space-5)', paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>

        <ProgressIndicator current={3} total={7} />

        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div className="section-eyebrow">🏢 Department of Extremely Serious Apologies</div>
          <h1 className="section-headline">
            Official Apology Application 📝
          </h1>
          <p className="section-sub">
            Please review the pre-filled information below. All fields are accurate and extremely embarrassing.
          </p>
        </div>

        {/* Form Card */}
        <form className="card" onSubmit={handleSubmit} style={{ width: '100%' }} aria-label="Official apology application form">

          <div style={{ display: 'grid', gap: 'var(--space-4)' }}>

            <div className="form-group">
              <label className="form-label" htmlFor="guilty-name">Name of the Guilty Person</label>
              <div className="form-value-display" id="guilty-name" aria-readonly="true">
                {loveConfig.fianceName} 🙈
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="important-person">Name of the Most Important Person</label>
              <div className="form-value-display" id="important-person" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
                {loveConfig.fianceeName} (aka {loveConfig.fianceeNickname}) 💗
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="offense">Offense Committed</label>
              <div className="form-value-display" id="offense">
                {loveConfig.incidentDescription}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="emotional-status">Emotional Status</label>
                <div className="form-value-display" id="emotional-status" style={{ fontSize: 'var(--text-sm)' }}>
                  Nervous but very much in love 💖
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="regret-level">Regret Level</label>
                <div className="form-value-display" id="regret-level" style={{ color: 'var(--color-coral)', fontWeight: 800, fontSize: 'var(--text-sm)' }}>
                  1,000,000% 📈
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="brain-status">Brain Status During Incident</label>
              <div className="form-value-display" id="brain-status">
                Temporarily Unavailable 🔌 (Update pending since forever)
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="commitment">Commitment to Improvement</label>
              <div className="form-value-display" id="commitment" style={{ fontStyle: 'italic', color: 'var(--color-plum)' }}>
                Not just words — actual, demonstrable, consistent actions 💪
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="additional-notes">
                Additional Notes
                <span className="optional-tag">(Optional — use this space to write something sweet)</span>
              </label>
              <textarea
                id="additional-notes"
                className="form-textarea"
                placeholder="Anything you'd like to add here…"
                rows={3}
                disabled={submitted}
              />
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ margin: 'var(--space-5) 0' }}>
            <div className="progress-bar-label" role="status" aria-live="polite">
              {progressLabel}
            </div>
            <div className="progress-bar-container" role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100}>
              <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: '#B89EC4', fontWeight: 600 }}>
              <span>Processing brain cells…</span>
              <span>{progressPct}%</span>
            </div>
          </div>

          {!done && (
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-full"
              disabled={processing}
              aria-label="Submit official apology application"
            >
              {processing ? '⏳ Processing Apology…' : '📤 Submit Official Apology'}
            </button>
          )}
        </form>

        {/* Done state */}
        {done && (
          <div className="bounce-in card" style={{ textAlign: 'center', background: 'linear-gradient(145deg, rgba(107,203,119,0.08), rgba(255,255,255,0.95))', border: '2px solid rgba(107,203,119,0.3)' }}>
            <div style={{ fontSize: 'clamp(40px, 10vw, 60px)', marginBottom: 'var(--space-3)' }} aria-hidden="true">✅</div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 800, color: '#4CAF73', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 'var(--space-3)' }}>
              Application Approved
            </div>
            <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-plum)', fontWeight: 600, lineHeight: 1.7, marginBottom: 'var(--space-5)' }}>
              Jokes aside, I know that saying sorry is not enough. I care about how you feel, and I want to understand 
              what hurt you instead of making excuses. You deserve better, and I want to be better. 💗
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-ghost btn-sm" onClick={onBack}>← Back</button>
              <button className="btn btn-primary" onClick={onNext}>Continue to Love Quiz 💘</button>
            </div>
          </div>
        )}

        {!done && (
          <button className="btn btn-ghost btn-sm" onClick={onBack} style={{ alignSelf: 'center' }}>← Back to Court</button>
        )}

      </div>
    </div>
  );
}
