import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

// Khmer Unicode block: U+1780–U+17FF
// If text contains Khmer characters, we must NOT split into individual spans —
// Khmer uses combining characters (vowels, subscripts) that must stay with
// their base consonant in the same text node.
function containsKhmer(text) {
  return /[\u1780-\u17FF]/.test(text);
}

export default function SplitText({
  text = "",
  className = "",
  delay = 0,
  duration = 800,
  stagger: staggerInterval = 40,
  animationFrom = { opacity: 0, translateY: 30, rotateX: -30 },
  animationTo = { opacity: 1, translateY: 0, rotateX: 0 },
}) {
  const containerRef = useRef(null);
  const isKhmer = containsKhmer(text);

  useEffect(() => {
    if (!containerRef.current) return;

    if (isKhmer) {
      // For Khmer: animate the whole container as one unit — no character splitting
      animate(containerRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: duration,
        delay: delay * 1000,
        easing: 'easeOutExpo',
      });
      return;
    }

    const letters = containerRef.current.querySelectorAll('.split-char');

    // Set initial state in anime v4 (duration 0)
    animate(letters, {
      opacity: animationFrom.opacity,
      translateY: animationFrom.translateY,
      rotateX: animationFrom.rotateX,
      duration: 0
    });

    // Animate using anime.js v4
    const anim = animate(letters, {
      opacity: [animationFrom.opacity, animationTo.opacity],
      translateY: [animationFrom.translateY, animationTo.translateY],
      rotateX: [animationFrom.rotateX, animationTo.rotateX],
      delay: stagger(staggerInterval, { start: delay * 1000 }),
      duration: duration,
      easing: 'easeOutElastic(1, 0.8)'
    });

    return () => {
      anim.pause();
    };
  }, [text, delay, duration, staggerInterval, isKhmer]);

  // Khmer: render as unsplit plain text with a simple fade-in
  if (isKhmer) {
    return (
      <span
        ref={containerRef}
        className={`split-text-container ${className}`}
        style={{ display: 'inline-block', opacity: 0 }}
      >
        {text}
      </span>
    );
  }

  // Latin / other scripts: render character-by-character for stagger animation
  const words = text.split(' ');

  return (
    <span ref={containerRef} className={`split-text-container ${className}`} style={{ display: 'inline-block', perspective: '1000px' }}>
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
          className="split-word"
        >
          {word.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              className="split-char"
              style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
            >
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && (
            <span className="split-char-space" style={{ display: 'inline-block' }}>
              &nbsp;
            </span>
          )}
        </span>
      ))}
    </span>
  );
}
