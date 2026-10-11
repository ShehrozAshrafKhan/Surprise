import { useEffect, useRef } from 'react';

const HEART_EMOJIS = ['💕', '💗', '💖', '💝', '🌸', '✨', '💫', '🌷', '💞', '🩷'];
const SPARKLE_EMOJIS = ['✨', '⭐', '🌟', '💫', '🌸'];

export function FloatingHearts() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hearts: HTMLSpanElement[] = [];

    function createHeart() {
      if (!container) return;
      const heart = document.createElement('span');
      heart.className = 'floating-heart';
      heart.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
      heart.style.left = `${Math.random() * 100}%`;
      const duration = 6 + Math.random() * 10;
      heart.style.animationDuration = `${duration}s`;
      heart.style.animationDelay = `${Math.random() * 4}s`;
      heart.style.fontSize = `${14 + Math.random() * 18}px`;
      heart.style.opacity = String(0.3 + Math.random() * 0.5);
      container.appendChild(heart);
      hearts.push(heart);

      setTimeout(() => {
        heart.remove();
        const idx = hearts.indexOf(heart);
        if (idx > -1) hearts.splice(idx, 1);
      }, (duration + 4) * 1000);
    }

    // Initial burst
    for (let i = 0; i < 8; i++) {
      setTimeout(() => createHeart(), i * 400);
    }

    const interval = setInterval(createHeart, 1800);
    return () => {
      clearInterval(interval);
      hearts.forEach(h => h.remove());
    };
  }, []);

  return <div className="floating-hearts-container" ref={containerRef} aria-hidden="true" />;
}

// Cursor sparkle — desktop only
export function CursorSparkle() {
  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    let lastMove = 0;

    function onMouseMove(e: MouseEvent) {
      const now = Date.now();
      if (now - lastMove < 80) return;
      lastMove = now;

      const sparkle = document.createElement('span');
      sparkle.className = 'sparkle';
      sparkle.textContent = SPARKLE_EMOJIS[Math.floor(Math.random() * SPARKLE_EMOJIS.length)];
      sparkle.style.left = `${e.clientX - 8}px`;
      sparkle.style.top  = `${e.clientY - 8}px`;
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 900);
    }

    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, []);

  return null;
}
