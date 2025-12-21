import "./Works.css";

import FloraHiveLogo from "./images/FloraHiveLogo.png";
import NET from "./images/NET.png";
import CSharp from "./images/CSharp.png";
import Unity from "./images/Unity.png";
import Django from "./images/Django.png";
import Docker from "./images/Docker.png";
import PostgreSQL from "./images/PostgreSQL.png";
import Python from "./images/Python.png";
import ConversioHub from "./images/ConversioHub2.png";
import WorkCard from "./WorkCard";

function Works() {
  const projectData = [
      {
        title: "FloraHive",
        subtitle: "Roguelite Tower Defense",
        description: (
          <>
          With two friends I started working on this game in 2023 as part of our studies. It can be found on Steam and is currently under development.
          <br></br><br></br>
          My main role has been working on the more complex systems. Not only game mechanics but also a backend system that collects metrics data on the players, used to balance the game. 
          <br></br><br></br>
          The game is made in Unity with C#. The backend uses ASP.NET and is implemented with Docker, PostgreSQL using micro services
          </>
        ),
        mainImage: FloraHiveLogo,
        techStack: [NET, CSharp, Unity, Docker, PostgreSQL],
        buttons: [{ label: "Code examples" }, { label: "Metrics backend" }]
      },
      {
        title: "Conversio Hub",
        subtitle: "Marketing Analysis Tools",
        description: (
          <>
          During my backend developer internship in 2025 at Conversio I learned to program with Django and Python.
          <br></br><br></br>
          As part of their team I contributed by improving code architecture and optimizing performance as well as create monitoring tools to help maintain their systems.
          <br></br><br></br>
          I worked with making endpoints that provided useful insights for their B2B customers.</>
        ),
        mainImage: ConversioHub,
        techStack: [Django, Python, Docker, PostgreSQL],
        buttons: []
      }
    ];

  return (
    <>
      <section className="content-2 header-spacing-2 d-flex justify-content-center">
          <h2>Projects I have worked on.</h2>
        </section>
      <section className="content-2 d-flex flex-column align-items-center pb-5">
        {projectData.map((project, index) => (
          <WorkCard key={index} project={project} />
        ))}
      </section>
    </>
  )
}

export default Works;