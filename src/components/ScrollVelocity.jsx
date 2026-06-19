import { useEffect, useRef, useState } from 'react';
import './ScrollVelocity.css';

export default function ScrollVelocity({ text = "SERVICELOGI • EXCELLENCE • DESIGN • SECURITY • PERFORMANCE • SCALE • MANAGEMENT • ENTERPRISE", speed = 1.2 }) {
  const [velocity, setVelocity] = useState(1);
  const requestRef = useRef(null);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const trackRef1 = useRef(null);
  const trackRef2 = useRef(null);
  const xPos1 = useRef(0);
  const xPos2 = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDiff = Math.max(currentTime - lastTime.current, 1);
      const scrollDiff = Math.abs(currentScrollY - lastScrollY.current);
      
      // Calculate scroll velocity (pixels per ms), scaled
      const scrollVelocity = scrollDiff / timeDiff;
      const targetVelocity = Math.min(scrollVelocity * 10 + 1, 15);
      
      setVelocity(targetVelocity);
      
      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation tick loop
    const animate = () => {
      // Interpolate velocity back to baseline (1) smoothly
      setVelocity((prev) => {
        const next = prev - (prev - 1) * 0.06;
        return next;
      });

      // Update positions based on speed and velocity multiplier
      const step = speed * velocity;
      xPos1.current -= step;
      xPos2.current += step;

      // Wrap around threshold (half width since we repeat content twice)
      if (trackRef1.current) {
        const width = trackRef1.current.offsetWidth / 2;
        if (Math.abs(xPos1.current) >= width) {
          xPos1.current = 0;
        }
        trackRef1.current.style.transform = `translate3d(${xPos1.current}px, 0, 0)`;
      }

      if (trackRef2.current) {
        const width = trackRef2.current.offsetWidth / 2;
        if (xPos2.current >= 0) {
          xPos2.current = -width;
        }
        trackRef2.current.style.transform = `translate3d(${xPos2.current}px, 0, 0)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(requestRef.current);
    };
  }, [speed, velocity]);

  // Generate repeated texts to guarantee seamless loop covering the viewport
  const repeatedText = Array(4).fill(text).join(" • ");

  return (
    <div className="scroll-velocity-wrapper">
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
