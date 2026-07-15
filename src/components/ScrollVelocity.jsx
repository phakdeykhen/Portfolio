import { useEffect, useRef } from 'react';
import './ScrollVelocity.css';

export default function ScrollVelocity({ text = 'SERVICELOGI • EXCELLENCE • DESIGN • SECURITY • PERFORMANCE • SCALE • MANAGEMENT • ENTERPRISE', speed = 1.2 }) {
  const wrapperRef = useRef(null);
  const trackRef1 = useRef(null);
  const trackRef2 = useRef(null);
  const requestRef = useRef(null);
  const velocityRef = useRef(1);
  const lastScrollY = useRef(0);
  const lastTime = useRef(0);
  const xPos1 = useRef(0);
  const xPos2 = useRef(0);
  const widths = useRef({ first: 0, second: 0 });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const firstTrack = trackRef1.current;
    const secondTrack = trackRef2.current;
    if (!wrapper || !firstTrack || !secondTrack) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    lastScrollY.current = window.scrollY;
    lastTime.current = performance.now();

    const updateWidths = () => {
      widths.current.first = firstTrack.offsetWidth / 2;
      widths.current.second = secondTrack.offsetWidth / 2;
      if (xPos2.current === 0) xPos2.current = -widths.current.second;
    };

    const handleScroll = () => {
      const currentTime = performance.now();
      const timeDiff = Math.max(currentTime - lastTime.current, 1);
      const scrollDiff = Math.abs(window.scrollY - lastScrollY.current);
      velocityRef.current = Math.min((scrollDiff / timeDiff) * 10 + 1, 15);
      lastScrollY.current = window.scrollY;
      lastTime.current = currentTime;
    };

    const animate = () => {
      requestRef.current = null;
      velocityRef.current -= (velocityRef.current - 1) * 0.06;
      const step = speed * velocityRef.current;
      const firstWidth = widths.current.first;
      const secondWidth = widths.current.second;

      xPos1.current -= step;
      xPos2.current += step;

      if (firstWidth && Math.abs(xPos1.current) >= firstWidth) xPos1.current = 0;
      if (secondWidth && xPos2.current >= 0) xPos2.current = -secondWidth;

      firstTrack.style.transform = `translate3d(${xPos1.current}px, 0, 0)`;
      secondTrack.style.transform = `translate3d(${xPos2.current}px, 0, 0)`;
      requestRef.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!reducedMotion && requestRef.current === null) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    const stopAnimation = () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    };

    updateWidths();
    const resizeObserver = new ResizeObserver(updateWidths);
    resizeObserver.observe(firstTrack);
    resizeObserver.observe(secondTrack);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? startAnimation() : stopAnimation()),
      { rootMargin: '100px 0px' }
    );
    visibilityObserver.observe(wrapper);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  const repeatedText = Array(4).fill(text).join(' • ');

  return (
    <div ref={wrapperRef} className="scroll-velocity-wrapper">
      <div className="marquee-row row-left">
        <div ref={trackRef1} className="marquee-track">
          <span>{repeatedText} • {repeatedText}</span>
        </div>
      </div>
      <div className="marquee-row row-right">
        <div ref={trackRef2} className="marquee-track">
          <span>{repeatedText} • {repeatedText}</span>
        </div>
      </div>
    </div>
  );
}
