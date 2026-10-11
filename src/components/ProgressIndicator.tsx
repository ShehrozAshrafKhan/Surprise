interface ProgressIndicatorProps {
  current: number;
  total: number;
}

const STAGE_LABELS = [
  'Entrance',
  'The Court',
  'Apology Form',
  'Love Quiz',
  'Surprise Box',
  'From My Heart',
  'Final Question',
];

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  return (
    <div className="progress-indicator" role="status" aria-label={`Stage ${current} of ${total}: ${STAGE_LABELS[current - 1]}`}>
      <div className="progress-dots" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`progress-dot${i + 1 === current ? ' active' : i + 1 < current ? ' done' : ''}`}
          />
        ))}
      </div>
      <span>Stage {current}/{total} — {STAGE_LABELS[current - 1]}</span>
    </div>
  );
}
