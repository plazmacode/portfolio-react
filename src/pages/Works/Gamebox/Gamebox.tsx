import { WorkSection } from "../../../components/WorkSection/WorkSection";
import GameboxPoster from "./Gamebox.jpg";

function Gamebox() {
  return (
    <>
      <section className="header-spacing-2 content-2 align-items-center d-flex flex-column">
        <h1 className="work-title">Gamebox Festival</h1>
        <h4 className="work-subtitle">Denmark's largest gaming event</h4>
      </section>
      <WorkSection
        image={GameboxPoster}
        text= {
          <>
            <p>Our indie game was showcased at GameBox Festival 2025. Were hundreds of people got to try a build of our game.</p>
            <p>Showcasing our innovative game design was very rewarding, given that most of the people found our novel ideas to be fun and interesting.</p>
            <p>It was a great exercise in learning how the end user understands and interacts with the various game mechanics. It also showed how valuable real feedback can be compared to the user tests we have done previously.</p>
          </>
        }
      />
    </>
  )
}

export default Gamebox;