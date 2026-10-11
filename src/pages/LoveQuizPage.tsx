import { useState } from 'react';
import { loveConfig } from '../config/loveConfig';
import { FloatingHearts } from '../components/FloatingHearts';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { useToast } from '../components/ToastContainer';

interface LoveQuizPageProps {
  onNext: () => void;
  onBack: () => void;
}

const QUESTIONS = [
  {
    id: 1,
    question: '🤔 Who is currently the biggest idiot in this relationship?',
    options: ['A) Me.', 'B) Definitely me.', 'C) Why are there other options?'],
    correctIndex: 2,
    reactions: [
      'Partially correct… but consider the other options. 🤭',
      'Getting warmer! But think carefully… 😏',
      'CORRECT! Look at you, being smarter than your fiancé already. 😂',
    ],
  },
  {
    id: 2,
    question: '💭 What should I have done instead of what I did?',
    options: [
      'A) Listened properly.',
      'B) Understood your feelings.',
      'C) Put my ego in airplane mode.',
      'D) All of the above.',
    ],
    correctIndex: 3,
    reactions: [
      'True, but only 25% of the answer. 🧐',
      "Also correct! But there's more\u2026 \uD83D\uDCA1",
      "Very correct! But you're still missing some. \uD83D\uDEE9\uFE0F",
      'PERFECT ANSWER! All of the above, and then some. 🎯',
    ],
  },
  {
    id: 3,
    question: '🎯 What is my current mission?',
    options: [
      'A) Defend my ego.',
      'B) Win an imaginary argument.',
      'C) Make things right and become a better partner.',
    ],
    correctIndex: 2,
    reactions: [
      'Absolutely not. Mission failed. 💀',
      'Incorrect! There are no imaginary arguments, only real feelings. 😬',
      'EXACTLY RIGHT! Mission accepted. No ego involved. 💪',
    ],
  },
  {
    id: 4,
    question: '📊 How serious am I about this apology?',
    options: [
      'A) Not serious at all.',
      'B) Serious enough to build this entire website.',
      'C) Serious enough to back my words up with actual actions.',
    ],
    correctIndex: 2,
    reactions: [
      'Wrong! Evidence suggests otherwise. 🕵️',
      "True! But words (and websites) alone aren't enough. \uD83D\uDCBB",
      'THE CORRECT ANSWER! Actions > promises. Always. 💯',
    ],
  },
  {
    id: 5,
    question: '💗 Who deserves patience, respect, love, and a sincere apology?',
    options: [
      `A) My favorite human (${loveConfig.fianceeName}).`,
      `B) My favorite human (${loveConfig.fianceeName}).`,
      `C) MY FAVORITE HUMAN (${loveConfig.fianceeName.toUpperCase()}).`,
    ],
    correctIndex: 2,
    reactions: [
      `Correct! ${loveConfig.fianceeName} absolutely deserves all that. 💗`,
      `Also correct! ${loveConfig.fianceeName} deserves all that and more. 💝`,
      `OBVIOUSLY CORRECT! 🎉 ${loveConfig.fianceeName} deserves the universe. And I will try harder to show it.`,
    ],
  },
];

export function LoveQuizPage({ onNext, onBack }: LoveQuizPageProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const { addToast } = useToast();

  const question = QUESTIONS[currentQ];

  function handleAnswer(optionIndex: number) {
    if (answered) return;
    setSelected(optionIndex);
    setAnswered(true);
    const isCorrect = optionIndex === question.correctIndex;
    if (isCorrect) setScore(s => s + 1);
    addToast(question.reactions[optionIndex], isCorrect ? '✅' : '💭');
  }

  function handleNext() {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
      addToast(`Quiz complete! Your fiancé's IQ: Still under investigation. 📊`, '📋');
    }
  }

  const optionLetters = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div
      className="page-wrapper page-enter"
      style={{ background: 'linear-gradient(135deg, #FFF0F8 0%, #F0EEFF 100%)', minHeight: '100svh' }}
    >
      <FloatingHearts />

      <div className="page-content" style={{ gap: 'var(--space-5)', paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>

        <ProgressIndicator current={4} total={7} />

        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div className="section-eyebrow">💘 Certified Scientific Love Test</div>
          <h1 className="section-headline">
            The Extremely Scientific Love Quiz 🔬
          </h1>
          <p className="section-sub">
            Before proceeding, {loveConfig.fianceeName} must complete this highly accurate compatibility assessment.
          </p>
        </div>

        {!finished ? (
          <div className="card" style={{ width: '100%' }}>
            {/* Question Progress */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 800, color: 'var(--color-coral)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Question {currentQ + 1} of {QUESTIONS.length}
              </span>
              <div style={{ display: 'flex', gap: 4 }}>
                {QUESTIONS.map((_, i) => (
                  <div key={i} style={{
                    width: 24, height: 6, borderRadius: 3,
                    background: i < currentQ ? 'var(--color-secondary)' : i === currentQ ? 'var(--color-primary)' : 'rgba(255,107,154,0.15)',
                    transition: 'background 0.3s',
                  }} />
                ))}
              </div>
            </div>

            <p className="quiz-question">{question.question}</p>

            <div className="quiz-options" role="group" aria-label={`Question ${currentQ + 1} options`}>
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  className={`quiz-option${selected === i ? ' selected' : ''}`}
                  onClick={() => handleAnswer(i)}
                  disabled={answered}
                  aria-pressed={selected === i}
                  style={{
                    background: answered
                      ? i === question.correctIndex
                        ? 'rgba(107,203,119,0.15)'
                        : selected === i
                          ? 'rgba(255,107,154,0.1)'
                          : 'rgba(255,255,255,0.7)'
                      : undefined,
                    borderColor: answered
                      ? i === question.correctIndex
                        ? '#6BCB77'
                        : selected === i
                          ? 'var(--color-primary)'
                          : 'rgba(255,107,154,0.2)'
                      : undefined,
                    cursor: answered ? 'default' : 'pointer',
                    transform: answered ? 'none' : undefined,
                  }}
                >
                  <span className="quiz-option-letter" style={{
                    background: answered && i === question.correctIndex
                      ? 'linear-gradient(135deg, #6BCB77, #4CAF73)'
                      : 'var(--gradient-primary)',
                  }}>
                    {optionLetters[i]}
                  </span>
                  {opt.replace(/^[A-D]\) /, '')}
                  {answered && i === question.correctIndex && (
                    <span style={{ marginLeft: 'auto', fontSize: 'var(--text-base)' }} aria-label="Correct answer">✓</span>
                  )}
                </button>
              ))}
            </div>

            {/* Reaction message */}
            {answered && selected !== null && (
              <div className="slide-up" style={{
                marginTop: 'var(--space-5)',
                padding: 'var(--space-4)',
                background: 'rgba(184,161,255,0.1)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(184,161,255,0.3)',
              }}>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-plum)', fontStyle: 'italic' }}>
                  {question.reactions[selected]}
                </p>
              </div>
            )}

            {answered && (
              <button className="btn btn-primary btn-full" style={{ marginTop: 'var(--space-5)' }} onClick={handleNext}>
                {currentQ < QUESTIONS.length - 1 ? 'Next Question →' : 'See My Results 📊'}
              </button>
            )}
          </div>
        ) : (
          /* Results Card */
          <div className="bounce-in card" style={{ textAlign: 'center', width: '100%' }}>
            <div style={{ fontSize: 'clamp(50px, 12vw, 70px)', marginBottom: 'var(--space-3)' }} aria-hidden="true">📊</div>
            <div className="section-eyebrow">Quiz Complete!</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--color-plum)', marginBottom: 'var(--space-4)' }}>
              Your Results Are In, {loveConfig.fianceeName}! 💘
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', margin: 'var(--space-5) 0' }}>
              <div style={{ padding: 'var(--space-4)', background: 'rgba(255,107,154,0.08)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,107,154,0.2)' }}>
                <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>{score}/{QUESTIONS.length}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: '#9A7BAE', fontWeight: 700, textTransform: 'uppercase' }}>Your Smart Answers</div>
              </div>
              <div style={{ padding: 'var(--space-4)', background: 'rgba(184,161,255,0.08)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(184,161,255,0.2)' }}>
                <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--color-secondary)', fontFamily: 'var(--font-display)' }}>100%</div>
                <div style={{ fontSize: 'var(--text-xs)', color: '#9A7BAE', fontWeight: 700, textTransform: 'uppercase' }}>Adorable Rating</div>
              </div>
            </div>

            <div style={{ padding: 'var(--space-4)', background: 'rgba(255,140,105,0.08)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,140,105,0.2)', marginBottom: 'var(--space-5)' }}>
              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-plum)', fontStyle: 'italic' }}>
                📋 Compatibility Report: 100% adorable. Fiancé's common-sense score: still under investigation.
                Recommended prescription: more listening, fewer ego-driven decisions. 💊
              </p>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-ghost btn-sm" onClick={onBack}>← Back</button>
              <button className="btn btn-primary" onClick={onNext}>Open Your Surprise 🎁</button>
            </div>
          </div>
        )}

        {!finished && (
          <button className="btn btn-ghost btn-sm" onClick={onBack} style={{ alignSelf: 'center' }}>← Back</button>
        )}

      </div>
    </div>
  );
}
