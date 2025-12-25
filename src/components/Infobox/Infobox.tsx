import './Infobox.css';

interface InfoboxProps {
  topText: string;
  bottomText: string;
}

function Infobox({ topText, bottomText }: InfoboxProps) {
  return (
    <>
      <h1 className="infobox-main">{topText}</h1>
      <h1 className="infobox-main">{bottomText}</h1>
    </>
  )
}

export default Infobox;