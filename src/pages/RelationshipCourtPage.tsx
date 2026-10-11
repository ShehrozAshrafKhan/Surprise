import { useState } from 'react';
import { loveConfig } from '../config/loveConfig';
import { FloatingHearts } from '../components/FloatingHearts';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { useToast } from '../components/ToastContainer';

interface RelationshipCourtPageProps {
  onNext: () => void;
  onBack: () => void;
}

export function RelationshipCourtPage({ onNext, onBack }: RelationshipCourtPageProps) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [guiltyClicked, setGuiltyClicked] = useState(false);
  const [moreEvidenceClicked, setMoreEvidenceClicked] = useState(false);
  const { addToast } = useToast();

  const revealedCount = revealed.size;

  function toggleReveal(count: number) {
    setRevealed(prev => {
      const next = new Set(prev);
      if (next.has(count)) {
        next.delete(count);
      } else {
        next.add(count);
        addToast('Confession unlocked! 😭', '📜');
      }
      return next;
    });
  }

  function handleGuilty() {
    setGuiltyClicked(true);
    addToast('Verdict recorded: GUILTY on all counts! 😭', '⚖️');
  }

  function handleMoreEvidence() {
    setMoreEvidenceClicked(true);
    addToast('Your Honor, the defendant requests more time to embarrass himself further. 🙈', '🧐');
  }

  return (
    <div
      className="page-wrapper page-enter"
      style={{ background: 'var(--gradient-court)', minHeight: '100svh' }}
    >
      <FloatingHearts />

      <div className="page-content" style={{ gap: 'var(--space-5)', paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>

        {/* Progress */}
        <ProgressIndicator current={2} total={7} />

        {/* Court Header */}
        <div className="card" style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>
          <div className="case-file-header">
            <span>⚖️ THE HIGH COURT OF BAD BEHAVIOR</span>
            <span style={{ opacity: 0.75 }}>Case No. LOVE-001-SORRY</span>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.92)',
            borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
            padding: 'var(--space-6)',
            border: '2px solid rgba(57,38,56,0.12)',
            borderTop: 'none',
          }}>
            <div className="section-eyebrow">You Are Now Entering</div>
            <h1 className="section-headline" style={{ fontSize: 'var(--text-3xl)' }}>
              The High Court of My Bad Behavior ⚖️
            </h1>
            <p className="section-sub">
              <strong style={{ color: 'var(--color-plum)' }}>The Defendant:</strong> Your fiancé. &nbsp;
              <strong style={{ color: 'var(--color-primary)' }}>The Judge:</strong> {loveConfig.fianceeName}. &nbsp;
              <strong style={{ color: 'var(--color-secondary)' }}>The Jury:</strong> Your mood.
            </p>
          </div>
        </div>

        {/* Official seal decoration */}
        <div style={{ textAlign: 'center', fontSize: 'var(--text-xs)', color: '#B89EC4', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          🏛️ Tap each charge to hear the defendant's pathetic confession 🏛️
        </div>

        {/* Accusation Cards */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 0 }}>
          {loveConfig.crimes.map(crime => (
            <div
              key={crime.count}
              className={`accusation-card${revealed.has(crime.count) ? ' revealed' : ''}`}
              onClick={() => toggleReveal(crime.count)}
              role="button"
              tabIndex={0}
              aria-expanded={revealed.has(crime.count)}
              aria-label={`Count ${crime.count}: ${crime.accusation}. Click to ${revealed.has(crime.count) ? 'hide' : 'reveal'} confession.`}
              onKeyDown={e => e.key === 'Enter' && toggleReveal(crime.count)}
            >
              <div className="accusation-count">Count {crime.count} of 5</div>
              <p className="accusation-text">{crime.accusation}</p>
              {revealed.has(crime.count) && (
                <p className="confession-text">
                  🗣️ {crime.confession}
                </p>
              )}
              <div style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-xs)', color: '#B89EC4', fontWeight: 600 }}>
                {revealed.has(crime.count) ? '▲ Hide confession' : '▼ Tap to hear his confession'}
              </div>
            </div>
          ))}
        </div>

        {/* Verdict counter */}
        {revealedCount > 0 && (
          <div className="slide-up" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
            padding: 'var(--space-3) var(--space-5)',
            background: 'rgba(255,255,255,0.85)',
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-plum)',
            boxShadow: 'var(--shadow-sm)',
          }}>
            📋 {revealedCount} of {loveConfig.crimes.length} confessions unlocked
          </div>
        )}

        {/* Verdict Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: '100%' }}>
          {!guiltyClicked ? (
            <button className="btn btn-primary btn-lg btn-full" onClick={handleGuilty}>
              GUILTY AS CHARGED 😭
            </button>
          ) : (
            <div className="bounce-in card card-sm" style={{ textAlign: 'center', background: 'rgba(255,107,154,0.08)', border: '2px solid rgba(255,107,154,0.3)' }}>
              <p style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: 'var(--text-md)' }}>
                🔨 VERDICT: GUILTY on all 5 counts. Sentence: Maximum apology required.
              </p>
            </div>
          )}

          {!moreEvidenceClicked ? (
            <button className="btn btn-outline" onClick={handleMoreEvidence}>
              This Idiot Needs More Evidence 👀
            </button>
          ) : (
            <div className="fade-in card card-sm" style={{ textAlign: 'center' }}>
              <p style={{ fontWeight: 600, color: 'var(--color-plum)', fontSize: 'var(--text-sm)' }}>
                🧐 Your Honor, after reviewing ALL available evidence (which is basically my entire life history), 
                the prosecution has determined that the defendant is, in fact, a certified idiot who owes someone 
                a very sincere apology. The evidence is overwhelmingly embarrassing. 🫠
              </p>
            </div>
          )}
        </div>

        {/* Sentencing */}
        <div className="card card-sm" style={{ textAlign: 'center', background: 'rgba(255,255,255,0.75)' }}>
          <p style={{ fontSize: 'var(--text-sm)', color: '#7A6A8A', fontStyle: 'italic', marginBottom: 'var(--space-3)' }}>
            ⚖️ Sentence pending. The judge may proceed to the next stage.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-ghost btn-sm" onClick={onBack} aria-label="Go back to previous page">
              ← Back
            </button>
            <button className="btn btn-secondary" onClick={onNext} aria-label="Proceed to next stage">
              Proceed to Sentencing 📋
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
