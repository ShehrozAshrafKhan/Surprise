import { loveConfig } from '../config/loveConfig';
import { FloatingHearts } from '../components/FloatingHearts';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { useToast } from '../components/ToastContainer';

interface HeartfeltApologyPageProps {
  onNext: () => void;
  onBack: () => void;
}

export function HeartfeltApologyPage({ onNext, onBack }: HeartfeltApologyPageProps) {
  const { addToast } = useToast();

  function handleNext() {
    addToast('Almost there, my love… 💌', '❤️');
    setTimeout(onNext, 400);
  }

  return (
    <div
      className="page-wrapper page-enter"
      style={{ background: 'linear-gradient(160deg, #FFF9F5 0%, #FFF0F5 50%, #F8F5FF 100%)', minHeight: '100svh' }}
    >
      <FloatingHearts />

      <div className="page-content" style={{ gap: 'var(--space-5)', paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>

        <ProgressIndicator current={6} total={7} />

        {/* Headline */}
        <div style={{ textAlign: 'center' }}>
          <div className="section-eyebrow">❤️ From My Heart</div>
          <h1 className="section-headline" style={{ fontFamily: 'var(--font-script)', fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
            Jokes Aside, My Love.<br />Please Read This Part. ❤️
          </h1>
        </div>

        {/* Decorative glowing hearts */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)', fontSize: 'clamp(18px, 4vw, 24px)' }} aria-hidden="true">
          {['💕', '❤️', '💖', '❤️', '💕'].map((h, i) => (
            <span key={i} style={{ animation: `floatUp ${3 + i * 0.5}s ease-in-out ${i * 0.3}s infinite alternate`, display: 'inline-block' }}>
              {h}
            </span>
          ))}
        </div>

        {/* The Letter */}
        <div className="letter-card slide-up" style={{ width: '100%' }}>
          <div className="letter-salutation">My dearest {loveConfig.fianceeName},</div>

          <div className="letter-body">
            <p>
              I made this little website because I wanted to make you smile — but behind every silly animation, 
              terrible joke, and ridiculous button is something very real.
            </p>

            <p>
              I'm sorry for my behavior and for the way it made you feel. I don't want to minimize what happened, 
              make excuses, or expect you to forget it just because I said sorry.
            </p>

            <p>
              You matter to me. Your feelings matter to me. And being your fiancé means I should keep learning 
              how to listen better, communicate more thoughtfully, and treat your heart with the care it deserves.
            </p>

            <p>
              I know that trust and understanding are built through actions, not fancy websites or pretty words. 
              I want to show you that I mean this by <em>doing better</em> — not simply promising that I will.
            </p>

            <p>
              You are not responsible for making me feel better about my mistake. And you don't have to forgive 
              me before you're ready. I won't rush you or pressure you. Your feelings, your timeline, your space — 
              all of it is valid and respected.
            </p>

            <p>
              I love you, {loveConfig.fianceeNickname}. I'm sorry. And when you're ready, I would really like 
              the chance to listen, understand your side, and work through this together.
            </p>
          </div>

          <div className="letter-sign">
            Forever your slightly foolish, very apologetic, and hopefully improving fiancé. ❤️<br />
            — {loveConfig.fianceName}
          </div>
        </div>

        {/* Commitments */}
        <div style={{ width: '100%' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--color-plum)', marginBottom: 'var(--space-4)', textAlign: 'center' }}>
            Three Things I Commit To 🤝
          </h2>
          <div className="commitments-list stagger-children">
            <div className="commitment-item">
              <div className="commitment-icon" aria-hidden="true">👂</div>
              <div className="commitment-text">
                I will listen without immediately becoming defensive or thinking of how to win.
              </div>
            </div>
            <div className="commitment-item">
              <div className="commitment-icon" aria-hidden="true">💗</div>
              <div className="commitment-text">
                I will take your feelings seriously, even when I see a situation differently.
              </div>
            </div>
            <div className="commitment-item">
              <div className="commitment-icon" aria-hidden="true">🌱</div>
              <div className="commitment-text">
                I will show improvement through consistent actions — not just promises or a cute website.
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap', marginTop: 'var(--space-2)' }}>
          <button className="btn btn-ghost btn-sm" onClick={onBack}>← Back</button>
          <button className="btn btn-primary btn-lg" onClick={handleNext} aria-label="Read my final important question">
            Read My Final Question 💌
          </button>
        </div>

      </div>
    </div>
  );
}
