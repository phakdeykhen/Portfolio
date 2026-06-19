import { useEffect, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Setup interactive hover listeners
    const addHoverListeners = () => {
      const targets = document.querySelectorAll('a, button, select, input, textarea, .interactive-hover, [role="button"]');
      targets.forEach((target) => {
        target.addEventListener('mouseenter', () => setHovered(true));
        target.addEventListener('mouseleave', () => setHovered(false));
      });
    };

    // Run listeners after components mount
    const timeout = setTimeout(addHoverListeners, 500);

    // Set up trailing element lag animation
    let animationFrameId;
    const updateTrail = () => {
      setTrailPosition((prev) => {
        // Linear interpolation for smooth lag
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animationFrameId = requestAnimationFrame(updateTrail);
    };
    updateTrail();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeout);
    };
  }, [position.x, position.y]);

  if (hidden) return null;

  return (
    <>
      <div
        className={`custom-cursor-dot ${clicked ? 'clicked' : ''} ${hovered ? 'hovered' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className={`custom-cursor-trail ${clicked ? 'clicked' : ''} ${hovered ? 'hovered' : ''}`}
        style={{ left: `${trailPosition.x}px`, top: `${trailPosition.y}px` }}
      />
    </>
  );
}
