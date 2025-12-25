import { useEffect, useRef, useState, type ReactNode } from 'react';
import './Infobox.css';

interface InfoboxProps {
  topText: string;
  bottomText: string;
}

function Infobox({ topText, bottomText }: InfoboxProps) {
  const chars = "*01{}/\\";

  const [displayTop, setDisplayTop] = useState<ReactNode[]>([]);
  const [displayBottom, setDisplayBottom] = useState<ReactNode[]>([]);

  const topIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bottomIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    scrambleText(topText, setDisplayTop, topIntervalRef);
    const currentTopRef = topIntervalRef.current;
    return () => {
      if (currentTopRef) clearInterval(currentTopRef);    };
  }, [topText]);

  useEffect(() => {
    scrambleText(bottomText, setDisplayBottom, bottomIntervalRef);
    const currentBottomRef = bottomIntervalRef.current;
    return () => {
        if (currentBottomRef) clearInterval(currentBottomRef);
    };
  }, [bottomText]);

  function scrambleText(
    target: string, 
    setter: (val: ReactNode[]) => void, 
    ref: React.RefObject<ReturnType<typeof setInterval> | null>  ) {
    if (ref.current) clearInterval(ref.current);

    let iteration = 0;
    ref.current = setInterval(() => {
      const scrambled = target.split("").map((letter, index) => {
        if (index < iteration) { // Finished letters
          return <span key={index}>{target[index]}</span>;
        }
        return ( // transparent scrambling letters
          <span key={index} className="scrambling">
            {chars[Math.floor(Math.random() * chars.length)]}
          </span>
        );
      });

      setter(scrambled);

      if (iteration >= target.length) {
        if (ref.current) clearInterval(ref.current);
      }

      iteration += 0.5;
    }, 5);
  }

  return (
    <>
      <h1 className="infobox-main">{displayTop}</h1>
      <h1 className="infobox-main">{displayBottom}</h1>
    </>
  )
}

export default Infobox;