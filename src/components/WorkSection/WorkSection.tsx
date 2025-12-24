import { type ReactNode } from 'react';

interface WorkCardProps {
  children: ReactNode;
  className?: string;
}

const WorkCard2 = ({ children, className = "" }: WorkCardProps) => (
  <div className={`work-card-2 mt-5 ${className}`}>
    <div className="card-line"></div>
    <div className="p-3">{children}</div>
  </div>
);

interface WorkSectionProps {
  title?: string;
  text?: ReactNode; // ReactNode allows strings, numbers, or JSX
  image?: string | string[];
  imageSide?: "left" | "right";
  imgColSize?: number;
  children?: ReactNode;
}

const WorkSection = ({ title, text, image, imageSide = "right", imgColSize = 6, children }: WorkSectionProps) => {
  const textColSize = 12 - imgColSize;
  
  const textCol = (
    <div className={`col-md-${textColSize}`}>
      <WorkCard2>
        {title && <h4>{title}</h4>}
        {text}
        {children}
      </WorkCard2>
    </div>
  );

  const imageCol = (
    <div className={`col-md-${imgColSize}`}>
      <WorkCard2>
        {Array.isArray(image) ? ( // Multiple images
          image.map((imgSrc, index) => (
            <img 
              key={index} 
              src={imgSrc} 
              className={`img-fluid ${index > 0 ? 'mt-3' : ''}`} 
              alt={`${title || "Work graphic"} ${index}`} 
            />
          ))
        ) : ( // Single image
          image && <img src={image} className="img-fluid" alt={title || "Work graphic"} />
        )}
      </WorkCard2>
    </div>
  );

  return (
    <section className="content-2 d-flex flex-column align-items-center pb-5">
      <div className="row w-100">
        {imageSide === "left" ? <>{imageCol}{textCol}</> : <>{textCol}{imageCol}</>}
      </div>
    </section>
  );
};

export { WorkSection, WorkCard2 as WorkCard2 };