import { useRef, useEffect } from 'react';
import { SKILLS_SPEED_PX_PER_FRAME } from '../constants.js';


const SkillsMarquee = ({ skills: items }) => {
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const loopWidthRef = useRef(0);
  const draggingRef = useRef(false);
  const hoveringRef = useRef(false);
  const pointerStartXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const reducedMotionRef = useRef(false);

  const doubledItems = [...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const measure = () => {
      loopWidthRef.current = track.scrollWidth / 2;
    };
    measure();

    let rafId;

    const applyTransform = () => {
      const loopWidth = loopWidthRef.current;
      if (loopWidth > 0) {
        let normalized = offsetRef.current % loopWidth;
        if (normalized < 0) normalized += loopWidth;
        offsetRef.current = normalized;
      }
      track.style.transform = `translateX(${-offsetRef.current}px)`;
    };

    const tick = () => {
      if (!draggingRef.current && !hoveringRef.current && !reducedMotionRef.current) {
        offsetRef.current += SKILLS_SPEED_PX_PER_FRAME;
      }
      applyTransform();
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const handleResize = () => measure();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePointerDown = (event) => {
    draggingRef.current = true;
    pointerStartXRef.current = event.clientX;
    startOffsetRef.current = offsetRef.current;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add('is-dragging');
  };

  const handlePointerMove = (event) => {
    if (!draggingRef.current) return;
    const delta = event.clientX - pointerStartXRef.current;
    offsetRef.current = startOffsetRef.current - delta;
  };

  const endDrag = (event) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    event.currentTarget.classList.remove('is-dragging');
  };

  return (
    <div
      className="skills-marquee"
      onMouseEnter={() => {
        hoveringRef.current = true;
      }}
      onMouseLeave={() => {
        hoveringRef.current = false;
      }}
    >
      <div
        className="skills-track"
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        {doubledItems.map((skill, index) => (
          <div
            className={`skill-card ${skill.tone}`}
            key={`${skill.name}-${index}`}
          >
            <span className="skill-mark">{skill.mark}</span>
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SkillsMarquee;