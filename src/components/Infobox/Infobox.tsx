import { useEffect, useRef, useState, type ReactNode } from 'react';
import './Infobox.css';

interface InfoboxProps {
  topText: string;
  bottomText: string;
}

function Infobox({ topText, bottomText }: InfoboxProps) {
  const scramble_chars = "*01{}/\\";

  const [displayTop, setDisplayTop] = useState<ReactNode[]>([]);
  const [displayBottom, setDisplayBottom] = useState<ReactNode[]>([]);

  const topRequestRef = useRef<number | null>(null);
  const bottomRequestRef = useRef<number | null>(null);

  // Scramble top text
  useEffect(() => {
    scrambleText(topText, setDisplayTop, topRequestRef);
    const currentRef = topRequestRef.current;
    return () => { if (currentRef) cancelAnimationFrame(currentRef); };
  }, [topText]);

  // Scramble bottom text
  useEffect(() => {
    scrambleText(bottomText, setDisplayBottom, bottomRequestRef);
    const currentRef = bottomRequestRef.current;
    return () => { if (currentRef) cancelAnimationFrame(currentRef); };
  }, [bottomText]);

  function scrambleText(
    target: string,
    setter: (val: ReactNode[]) => void,
    ref: React.RefObject<number | null>
  ) {
    if (ref.current) cancelAnimationFrame(ref.current);

    let iteration = 0;
    
    const animate = () => {
      const scrambled = target.split("").map((_, index) => {
        if (index < iteration) {
          return <span key={index}>{target[index]}</span>;
        }
        return (
          <span key={index} className="scrambling">
            {scramble_chars[Math.floor(Math.random() * scramble_chars.length)]}
          </span>
        );
      });

      setter(scrambled);

      if (iteration < target.length) {
        iteration += 0.5;
        ref.current = requestAnimationFrame(animate);
      }
    };

    ref.current = requestAnimationFrame(animate);
  }

  return (
    <>
      <h1 className="infobox-main">{displayTop}</h1>
      <h1 className="infobox-main">{displayBottom}</h1>
    </>
  );
}

export default Infobox;