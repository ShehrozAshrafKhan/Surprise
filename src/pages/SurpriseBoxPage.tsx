import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { loveConfig } from '../config/loveConfig';
import { FloatingHearts } from '../components/FloatingHearts';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { useToast } from '../components/ToastContainer';

interface SurpriseBoxPageProps {
  onNext: () => void;
  onBack: () => void;
}

const COMPLIMENTS = [
  'Your smile has more power than my entire argument.',
  'You are my favorite notification, even when my phone is on silent.',
  'The universe did something suspiciously perfect when it brought you into my life.',
  `Being loved by you is the best thing that ever happened to me, ${loveConfig.fianceeName}.`,
  'Your laugh should be illegal for how quickly it fixes everything.',
  `You are breathtakingly beautiful, ${loveConfig.fianceeName}, inside and out.`,
  loveConfig.favoriteCompliment,
  "You deserve someone who matches your energy every single day. I'm working on it.",
  "The way you care for people you love? That's the most beautiful thing about you.",
  `You are not just my fiancée, ${loveConfig.fianceeName}. You are my home.`,
];



function launchConfetti() {
  const colors = ['#FF6B9A', '#B8A1FF', '#FF8C69', '#FFD6E5', '#C8B8FF', '#FFAEC9'];

  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.55 },
    colors,
    shapes: ['circle', 'square'],
    scalar: 1.1,
  });

  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors,
    });
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors,
    });
  }, 300);
}

export function SurpriseBoxPage({ onNext, onBack }: SurpriseBoxPageProps) {
  const [boxOpened, setBoxOpened] = useState(false);
  const [compliment, setCompliment] = useState(COMPLIMENTS[0]);
  const [complimentIdx, setComplimentIdx] = useState(0);
  const [hugActive, setHugActive] = useState(false);
  const [promiseRevealed, setPromiseRevealed] = useState(false);
  const { addToast } = useToast();

  function openBox() {
    if (boxOpened) return;
    setBoxOpened(true);
    launchConfetti();
    addToast('🎁 A surprise is opening just for you!', '✨');
  }

  const nextCompliment = useCallback(() => {
    const next = (complimentIdx + 1) % COMPLIMENTS.length;
    setComplimentIdx(next);
    setCompliment(COMPLIMENTS[next]);
    addToast('New compliment loaded! 💌', '💝');
  }, [complimentIdx, addToast]);

  function sendHug() {
    setHugActive(true);
    addToast('Hug sent! No expiry date. 🤗', '💞');
    setTimeout(() => setHugActive(false), 3200);
  }

  function revealPromise() {
    setPromiseRevealed(true);
    addToast('A pinky promise, recorded forever. 🤙', '💜');
  }

  return (
    <div
      className="page-wrapper page-enter"
      style={{ background: 'linear-gradient(135deg, #FFF5EC 0%, #FFF0F8 60%, #F5EEFF 100%)', minHeight: '100svh' }}
    >
      <FloatingHearts />

      <div className="page-content" style={{ gap: 'var(--space-5)', paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>

        <ProgressIndicator current={5} total={7} />

        <div style={{ textAlign: 'center' }}>
          <div className="section-eyebrow">🎁 Surprise Time</div>
          <h1 className="section-headline">
            Okay, Enough Legal Drama…<br />I Have Something For You. 🎁
          </h1>
          <p className="section-sub">Tap the gift box, {loveConfig.fianceeName}. Trust me on this one.</p>
        </div>

        {/* Gift Box */}
        <div
          className={`gift-box${boxOpened ? ' opened' : ''}`}
          onClick={openBox}
          role="button"
          tabIndex={0}
          aria-label="Open surprise gift box"
          onKeyDown={e => e.key === 'Enter' && openBox()}
        >
          <div className="gift-box-emoji" aria-hidden="true">
            {boxOpened ? '🎊' : '🎁'}
          </div>
        </div>

        {/* Revealed message */}
        {boxOpened && (
          <div className="bounce-in card" style={{ textAlign: 'center', width: '100%', background: 'linear-gradient(145deg, rgba(255,255,255,0.97), rgba(255,240,250,0.95))' }}>
            <div style={{ fontSize: 'clamp(36px, 9vw, 52px)', marginBottom: 'var(--space-3)' }} aria-hidden="true">💝</div>
            <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-plum)', lineHeight: 1.8, fontWeight: 600 }}>
              If I could rewind the moments when I hurt you, I would choose to handle them differently. 
              You deserve to feel heard, respected, safe, and loved. I cannot change what happened, 
              but I can take responsibility for how I behaved and do better moving forward.
            </p>
          </div>
        )}

        {/* Three mini surprise cards */}
        {boxOpened && (
          <div className="surprise-cards-grid">

            {/* Compliment Machine */}
            <div className="surprise-mini-card stagger-children" style={{ animationDelay: '0.1s' }}>
              <div className="surprise-mini-card-icon" aria-hidden="true">💬</div>
              <div className="surprise-mini-card-title">Compliment Machine</div>
              <div className="surprise-mini-card-desc" style={{ marginBottom: 'var(--space-4)', fontStyle: 'italic', minHeight: '3em', color: 'var(--color-plum)', fontWeight: 600 }}>
                "{compliment}"
              </div>
              <button
                className="btn btn-primary btn-sm btn-full"
                onClick={nextCompliment}
                aria-label="Generate new compliment"
              >
                Next Compliment 💌
              </button>
            </div>

            {/* Virtual Hug */}
            <div className="surprise-mini-card stagger-children" style={{ animationDelay: '0.2s' }}>
              <div className="surprise-mini-card-icon" aria-hidden="true">🤗</div>
              <div className="surprise-mini-card-title">Virtual Hug</div>
              <div className="surprise-mini-card-desc" style={{ marginBottom: 'var(--space-4)' }}>
                A gigantic hug with no expiration date.
              </div>
              {hugActive ? (
                <div className="bounce-in" style={{ textAlign: 'center' }}>
                  <div className="hug-emoji" role="img" aria-label="Hug emoji">🤗</div>
                  <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-secondary)', marginTop: 'var(--space-2)' }}>
                    Sending hug… redeemable IRL! 💜
                  </p>
                </div>
              ) : (
                <button
                  className="btn btn-secondary btn-sm btn-full"
                  onClick={sendHug}
                  aria-label="Send virtual hug"
                >
                  Send Hug 🤗
                </button>
              )}
            </div>

            {/* Little Promise */}
            <div className="surprise-mini-card stagger-children" style={{ animationDelay: '0.3s' }}>
              <div className="surprise-mini-card-icon" aria-hidden="true">🤙</div>
              <div className="surprise-mini-card-title">A Little Promise</div>
              <div className="surprise-mini-card-desc" style={{ marginBottom: 'var(--space-4)' }}>
                A pinky promise, written down.
              </div>
              {!promiseRevealed ? (
                <button
                  className="btn btn-outline btn-sm btn-full"
                  onClick={revealPromise}
                  aria-label="Reveal promise"
                >
                  Reveal Promise 🤙
                </button>
              ) : (
                <div className="fade-in" style={{ fontFamily: 'var(--font-script)', fontSize: 'var(--text-md)', color: 'var(--color-plum)', lineHeight: 1.6, fontWeight: 600 }}>
                  "I will try to listen before reacting, understand before defending myself, 
                  and show through my actions that your feelings matter to me. 💗"
                </div>
              )}
            </div>

          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap', marginTop: 'var(--space-2)' }}>
          <button className="btn btn-ghost btn-sm" onClick={onBack}>← Back</button>
          {boxOpened && (
            <button className="btn btn-primary" onClick={onNext} aria-label="Read heartfelt apology letter">
              Read Something Real ❤️
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
