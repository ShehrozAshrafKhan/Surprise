import { useState } from 'react';
import confetti from 'canvas-confetti';
import { loveConfig } from '../config/loveConfig';
import { FloatingHearts } from '../components/FloatingHearts';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { useToast } from '../components/ToastContainer';

interface FinalQuestionPageProps {
  onRestart: () => void;
}

type Response = 'talk' | 'time' | 'affection' | null;

const RESPONSE_CONTENT: Record<NonNullable<Response>, { emoji: string; title: string; message: string }> = {
  talk: {
    emoji: '❤️',
    title: 'Thank you, my love.',
    message: `Thank you for giving me the chance to listen. No dramatic speeches required this time. Just you, me, honesty, and a real conversation. I promise to show up better — and I mean it, ${loveConfig.fianceeName}. ❤️`,
  },
  time: {
    emoji: '🥹',
    title: "That's completely okay.",
    message: `Take all the time you need, ${loveConfig.fianceeName}. I won't rush you or make you feel guilty for needing space. Your feelings and your pace matter far more to me than my comfort. When you're ready, I'll be right here. 🌸`,
  },
  affection: {
    emoji: '😭',
    title: 'OBJECTION!',
    message: `😭 The court finds the defendant GUILTY of being willing to negotiate an extremely generous affection package! Terms and conditions: unlimited hugs, acts of kindness, terrible jokes on demand, and your favorite snacks — whenever you want them. Terms are non-negotiable. ❤️`,
  },
};

function launchFinalConfetti() {
  const colors = ['#FF6B9A', '#B8A1FF', '#FFD6E5', '#FF8C69', '#C8B8FF'];
  confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 }, colors, scalar: 1.2 });
}

export function FinalQuestionPage({ onRestart }: FinalQuestionPageProps) {
  const [response, setResponse] = useState<Response>(null);
  const { addToast } = useToast();

  function handleResponse(r: NonNullable<Response>) {
    setResponse(r);
    if (r === 'talk') {
      launchFinalConfetti();
      addToast("\uD83D\uDC97 Thank you for this chance. I won't waste it.", '\u2764\uFE0F');
    } else if (r === 'time') {
      addToast('I respect that. Take all the time you need. 🌸', '🥹');
    } else {
      addToast('AFFECTION PACKAGE APPROVED! 😭💝', '🎉');
      launchFinalConfetti();
    }
  }

  return (
    <div
      className="page-wrapper page-enter"
      style={{ background: 'var(--gradient-final)', minHeight: '100svh' }}
    >
      <FloatingHearts />

      <div className="page-content" style={{ gap: 'var(--space-5)', paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>

        <ProgressIndicator current={7} total={7} />

        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div className="section-eyebrow">🥹 The Final Question</div>
          <h1 className="section-headline" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)' }}>
            One Last Question, My Love…
          </h1>
        </div>

        {/* Animated floating hearts cluster */}
        <div style={{ display: 'flex', justifyContent: 'center', fontSize: 'clamp(40px, 10vw, 60px)', gap: 'var(--space-4)' }} aria-hidden="true">
          {['💗', '🥹', '💗'].map((h, i) => (
            <span key={i} style={{ animation: `gift-bounce ${2 + i * 0.4}s ease-in-out ${i * 0.3}s infinite`, display: 'inline-block' }}>
              {h}
            </span>
          ))}
        </div>

        {/* Main message */}
        {!response && (
          <div className="card" style={{ textAlign: 'center', width: '100%' }}>
            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-plum)', fontWeight: 700, lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>
              I know I can't press a button and undo what happened. But if and when you're ready…
            </p>
            <p style={{ fontFamily: 'var(--font-script)', fontSize: 'var(--text-2xl)', color: 'var(--color-primary)', lineHeight: 1.4, marginBottom: 'var(--space-6)' }}>
              "Would you give me a chance to make things right?"
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: '#9A7BAE', fontWeight: 600, marginBottom: 'var(--space-5)' }}>
              (All answers are valid. No wrong choice here, {loveConfig.fianceeName}.)
            </p>

            <div className="final-buttons">
              <button
                className="btn btn-primary btn-lg btn-full"
                onClick={() => handleResponse('talk')}
                aria-label="I'm ready to talk"
              >
                Okay, let's talk. ❤️
              </button>
              <button
                className="btn btn-secondary btn-full"
                onClick={() => handleResponse('time')}
                aria-label="I need a little time"
              >
                I need a little time. 🥹
              </button>
              <button
                className="btn btn-outline btn-full"
                onClick={() => handleResponse('affection')}
                aria-label="You owe me extra affection"
              >
                You owe me extra affection. 😤
              </button>
            </div>
          </div>
        )}

        {/* Response revealed */}
        {response && (
          <div className="bounce-in" style={{ width: '100%' }}>
            <div className="final-response">
              <div style={{ fontSize: 'clamp(50px, 12vw, 70px)', marginBottom: 'var(--space-3)' }} role="img" aria-label={RESPONSE_CONTENT[response].emoji}>
                {RESPONSE_CONTENT[response].emoji}
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-plum)', marginBottom: 'var(--space-4)' }}>
                {RESPONSE_CONTENT[response].title}
              </h2>
              <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-plum)', lineHeight: 1.7, fontWeight: 600 }}>
                {RESPONSE_CONTENT[response].message}
              </p>
            </div>

            {/* Show other options too */}
            {response !== 'talk' && (
              <div style={{ textAlign: 'center', marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-2)', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-ghost btn-sm" onClick={() => handleResponse('talk')}>Okay, let's talk ❤️</button>
                {response !== 'affection' && (
                  <button className="btn btn-ghost btn-sm" onClick={() => handleResponse('affection')}>Extra affection 😤</button>
                )}
                {response !== 'time' && (
                  <button className="btn btn-ghost btn-sm" onClick={() => handleResponse('time')}>Need more time 🥹</button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Certificate */}
        <div className="certificate slide-up" style={{ width: '100%' }}>
          <div className="certificate-title">Officially Certified by the Department of Sorry</div>
          <div className="certificate-heading">
            Still Learning, Still Trying,<br />Still Crazy About You 💕
          </div>
          <div className="certificate-divider" />
          <p style={{ fontSize: 'var(--text-sm)', color: '#7A6A8A', fontWeight: 600, lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>
            {loveConfig.closingMessage}
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center', fontSize: 'var(--text-lg)' }} aria-hidden="true">
            💗 💕 💖 💝 💗
          </div>
        </div>

        {/* Replay / Footer */}
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={onRestart}
            aria-label="Replay the experience from the beginning"
          >
            🔄 Replay from the Start
          </button>
        </div>

        <footer style={{ textAlign: 'center', fontSize: 'var(--text-xs)', color: '#C4A8D4', fontStyle: 'italic', paddingTop: 'var(--space-2)' }}>
          Made with love, a little panic, and an unreasonable number of hearts. 💕
        </footer>

      </div>
    </div>
  );
}
