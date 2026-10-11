import { useState, useEffect } from 'react';
import { loveConfig } from '../config/loveConfig';
import { FloatingHearts } from '../components/FloatingHearts';
import { useToast } from '../components/ToastContainer';

interface WelcomePageProps {
  onNext: () => void;
}

const FULL_MESSAGE = `You have received an extremely important message from the person who sometimes behaves like a certified idiot. Please review carefully. Your patience is appreciated. 💌`;

export function WelcomePage({ onNext }: WelcomePageProps) {
  const [typedText, setTypedText] = useState('');
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [btnReady, setBtnReady] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    let i = 0;
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        setTypedText(FULL_MESSAGE.slice(0, i + 1));
        i++;
        if (i >= FULL_MESSAGE.length) {
          clearInterval(interval);
          setTimeout(() => setBtnReady(true), 400);
        }
      }, 28);
      return () => clearInterval(interval);
    }, 1200);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      addToast(loveConfig.relationshipInsideJoke, '💭');
    }, 5000);
    return () => clearTimeout(timer);
  }, [addToast]);

  function handleEnvelopeClick() {
    if (!btnReady) return;
    setEnvelopeOpen(true);
    setTimeout(() => setShowReveal(true), 600);
    addToast('Opening your extremely important case file… 📂', '💗');
  }

  function handleNext() {
    addToast('Entering the High Court… ⚖️', '🚨');
    setTimeout(onNext, 500);
  }

  return (
    <div
      className="page-wrapper page-enter"
      style={{ background: 'var(--gradient-hero)', minHeight: '100svh' }}
    >
      <FloatingHearts />

      <div className="page-content" style={{ justifyContent: 'center', paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)', gap: 'var(--space-6)' }}>

        {/* Alert Badge */}
        <div className="stagger-children" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span className="badge badge-alert">🚨 URGENT: Apology Required</span>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.85)', color: 'var(--color-plum)', border: '1px solid rgba(255,107,154,0.3)' }}>Case No. LOVE-001-SORRY</span>
          </div>

          {/* Main Headline */}
          <div style={{ textAlign: 'center' }}>
            <div className="section-eyebrow">Official Romantic Emergency Notice</div>
            <h1 className="section-headline" style={{ fontSize: 'var(--text-4xl)' }}>
              WAIT, MY LOVE! 💌
            </h1>
          </div>

          {/* Character */}
          <div style={{ fontSize: 'clamp(70px, 20vw, 110px)', filter: 'drop-shadow(0 8px 20px rgba(255,107,154,0.3))', animation: 'envelope-float 3s ease-in-out infinite', lineHeight: 1 }} aria-hidden="true">
            🥺
          </div>
        </div>

        {/* Typing text card */}
        <div className="card" style={{ textAlign: 'center', maxWidth: '600px' }}>
          <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-plum)', lineHeight: 1.7, fontWeight: 600 }}>
            {typedText}
            {typedText.length < FULL_MESSAGE.length && <span className="typing-cursor" aria-hidden="true" />}
          </p>
        </div>

        {/* Envelope */}
        <div
          className={`envelope-wrapper${envelopeOpen ? ' open' : ''}`}
          onClick={handleEnvelopeClick}
          role="button"
          aria-label="Open your extremely important case file"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && handleEnvelopeClick()}
          style={{ cursor: btnReady ? 'pointer' : 'default', opacity: btnReady ? 1 : 0.5 }}
        >
          <div className="envelope-body">
            <div className="envelope-flap" aria-hidden="true" />
            <div className="envelope-letter" aria-hidden="true">💌</div>
          </div>
        </div>

        {/* Revealed content after envelope opens */}
        {showReveal && (
          <div className="bounce-in" style={{ textAlign: 'center', width: '100%', maxWidth: '520px' }}>
            <div className="card" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.97), rgba(255,240,250,0.95))' }}>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-coral)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>
                🔒 Department of Sorry — Classified Document
              </div>
              <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-plum)', fontWeight: 600, marginBottom: 'var(--space-5)' }}>
                Dear <strong style={{ color: 'var(--color-primary)' }}>{loveConfig.fianceeName}</strong>, this file contains 
                one (1) genuine apology, five (5) ridiculous confessions, and an unreasonable number of hearts. Please proceed with caution. 💗
              </p>
              <button
                className="btn btn-primary btn-lg btn-full"
                onClick={handleNext}
                aria-label="Open your extremely important case file"
              >
                Open Your Extremely Important Case File 💗
              </button>
            </div>
          </div>
        )}

        {!showReveal && btnReady && (
          <p style={{ fontSize: 'var(--text-sm)', color: '#9A7BAE', textAlign: 'center', maxWidth: '360px' }}>
            👆 Tap the envelope to open it, {loveConfig.fianceeName}
          </p>
        )}

        {/* Disclaimer */}
        <p style={{ fontSize: 'var(--text-xs)', color: '#B89EC4', textAlign: 'center', maxWidth: '380px', fontStyle: 'italic', marginTop: 'auto' }}>
          ⚖️ No lawyers were harmed in the making of this apology. My ego, however, has been severely damaged.
        </p>

        {/* Fake status bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) var(--space-4)',
          background: 'rgba(255,255,255,0.7)', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255,107,154,0.2)',
          fontSize: 'var(--text-xs)', color: 'var(--color-plum)', fontWeight: 600,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#6BCB77', display: 'inline-block', animation: 'pulse-badge 2s ease-in-out infinite' }} aria-hidden="true" />
          Boyfriend-to-fiancé emotional intelligence update: Installing… 23%
        </div>
      </div>
    </div>
  );
}
