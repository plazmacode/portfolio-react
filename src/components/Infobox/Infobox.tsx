import { useEffect, useRef, useState } from 'react';
import './Infobox.css';

interface InfoboxProps {
  topText: string;
  bottomText: string;
}

function Infobox({ topText, bottomText }: InfoboxProps) {
  const chars = "0123456789ABCDEF";

  const [displayTop, setDisplayTop] = useState(topText);
  const [displayBottom, setDisplayBottom] = useState(bottomText);

  const topIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bottomIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    scrambleText(topText, setDisplayTop, topIntervalRef);
    return () => {
        if (topIntervalRef.current) clearInterval(topIntervalRef.current);
    };
  }, [topText]);

  useEffect(() => {
    scrambleText(bottomText, setDisplayBottom, bottomIntervalRef);
    return () => {
        if (bottomIntervalRef.current) clearInterval(bottomIntervalRef.current);
    };
  }, [bottomText]);

  function scrambleText(
    target: string, 
    setter: (val: string) => void, 
    ref: React.MutableRefObject<ReturnType<typeof setInterval> | null>
  ) {
    if (ref.current) clearInterval(ref.current);

    let iteration = 0;
    ref.current = setInterval(() => {
      setter(
        target
          .split("")
          .map((_, index) => {
            if (index < iteration) {
              return target[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= target.length) {
        if (ref.current) clearInterval(ref.current);
      }

      iteration += 1; 
    }, 30);
  }

  return (
    <>
      <h1 className="infobox-main">{displayTop}</h1>
      <h1 className="infobox-main">{displayBottom}</h1>
    </>
  )
}

export default Infobox;