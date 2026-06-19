import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

export default function SplitText({
  text = "",
  className = "",
  delay = 0,
  duration = 800, // in ms
  stagger: staggerInterval = 40, // renamed to avoid name collision with stagger function
  animationFrom = { opacity: 0, translateY: 30, rotateX: -30 },
  animationTo = { opacity: 1, translateY: 0, rotateX: 0 },
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
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
      // Clean up / pause animation on unmount
      anim.pause();
    };
  }, [text, delay, duration, staggerInterval]);

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
