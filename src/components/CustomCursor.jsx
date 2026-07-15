import { useEffect, useRef } from 'react';
import './CustomCursor.css';

const interactiveSelector = 'a, button, select, input, textarea, .interactive-hover, [role="button"]';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const trail = trailRef.current;
    if (!dot || !trail || !window.matchMedia('(min-width: 1025px)').matches) return undefined;

    const pointer = { x: 0, y: 0 };
    const trailPosition = { x: 0, y: 0 };
    let animationFrameId;

    const setClass = (className, enabled) => {
      dot.classList.toggle(className, enabled);
      trail.classList.toggle(className, enabled);
    };

    const handleMouseMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      dot.style.left = `${pointer.x}px`;
      dot.style.top = `${pointer.y}px`;
      setClass('hidden', false);
      setClass('hovered', Boolean(event.target.closest(interactiveSelector)));
    };

    const updateTrail = () => {
      trailPosition.x += (pointer.x - trailPosition.x) * 0.15;
      trailPosition.y += (pointer.y - trailPosition.y) * 0.15;
      trail.style.left = `${trailPosition.x}px`;
      trail.style.top = `${trailPosition.y}px`;
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    const handleMouseLeave = () => setClass('hidden', true);
    const handleMouseEnter = () => setClass('hidden', false);
    const handleMouseDown = () => setClass('clicked', true);
    const handleMouseUp = () => setClass('clicked', false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    animationFrameId = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot hidden" />
      <div ref={trailRef} className="custom-cursor-trail hidden" />
    </>
  );
}
