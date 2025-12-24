import type { ReactNode } from "react";
import { Link } from "react-router";

function WorkCard({project}: WorkCardProps) {
  return (
    <div className="work-card mt-5" id={project.title}>
      <div className="card-line"></div>
      <div className="p-4">
        <h1 className="work-title">{project.title}</h1>
        <p className="work-subtitle">{project.subtitle}</p>

        <div className="row justify-content-between">
          <div className="col-md-5">
            <p>{project.description}</p>
          </div>
          <div className="col-md-6">
            <div className="d-flex">
              <img src={project.mainImage} className="img-fluid work-image" alt={project.title} />
            </div>
            <div className="d-flex justify-content-between px-5 mt-5">
              {project.techStack.map((tech, index) => (
                <img key={index} src={tech} className="img-fluid rounded" style={{height: '96px'}} alt="tech icon" />
              ))}
            </div>
          </div>
          <div>
            {project.buttons.map((btn, index) => (
              <Link key={index} to={btn.link || "#"} className="work-button">{btn.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkCard;


interface ProjectButton {
  label: string;
  link?: string; // Optional if you want to add links later
}

interface ProjectData {
  title: string;
  subtitle: string;
  description: ReactNode;
  mainImage: string;
  techStack: string[];
  buttons: ProjectButton[];
}

interface WorkCardProps {
  project: ProjectData;
}