import { WorkSection } from "../../../components/WorkSection/WorkSection";
import Heatmap from "./Heatmap.png";
import Plot from "./Plot.png";
import BackendCode from "./BackendCode.png";
import Postgres from "./Postgres.png";
import UML from "./UML.png";
import { Link } from "react-router";

function FloraHiveWorks() {
  return (
    <>
      <section className="header-spacing-2 content-2 align-items-center d-flex flex-column">
        <h1 className="work-title">FloraHive Metrics</h1>
        <h4 className="work-subtitle">Data collection for insights & balancing</h4>
      </section>
      <WorkSection
        title=""
        image={Heatmap}
        text={
          <>
            <p>We build this system from the ground up using:</p>
            <ul>
              <li>ASP.NET</li>
              <li>PostgreSQL</li>
              <li>Docker</li>
            </ul>
            <p>I did the primary work designing and implementing the system so that we can collect data from our users and visualize it. On top of that our metrics backend includes a simple frontend for visualization using graphs made with plotly</p>
            <br></br>
            <Link to="/interactive" className="work-button">Metrics Demo</Link>
          </>
        }
      />
      <WorkSection
        title=""
        image={Plot}
        imageSide="left"
        text={
          <>
            <p>My time working on the backend taught me how to design and implement a data collection system from the ground up. The game constantly changes as it is developed and therefore the backend has to be coded with the proper design patterns and architecture.</p>
            <p>The system is scalable using microservices and when the game is closer to being released,the backend will be refactored using a CQRS architecture so that everything will be even more robust.</p>
          </>
        }
      />
      <WorkSection
        title=""
        image={Postgres}
        imageSide="left"
        imgColSize={8}
        text={
          <>
            <p>For data collection instant response is not important and therefore microservices won't have a negative drawback if we reach the point of scaling up.</p>
            <p>It also makes it a lot easier to code as things will be more separated than using a monolith architecture.</p>
          </>
        }
      />
      <section className="header-spacing content-2 align-items-center d-flex flex-column">
        <h1 className="work-title">Architecture</h1>
        <h4 className="work-subtitle">Data collection for insights & balancing</h4>
      </section>
      <WorkSection
        title=""
        image={UML}
        imageSide="left"
        imgColSize={6}
        text={
          <>
            <p>On the left is a pretty simple diagram of the backend we started with. A Server Registry and two services to interact with the Database Management System,</p>
            <ul>
              <li>The game sends data with POST requests to our Metrics Service.</li>
              <li>Visualization can then GET request it through the Data Visualizer service.</li>
            </ul>
            <p></p>
            <p>The services give us the ability to cache reads for optimization and data collection can also be done faster by having more services.</p>
          </>
        }
      />
      <section className="header-spacing content-2 align-items-center d-flex flex-column">
        <h1 className="work-title">The Code</h1>
        <h4 className="work-subtitle">Design and implementation</h4>
      </section>
      <WorkSection
        title=""
        image={BackendCode}
        imageSide="left"
        imgColSize={6}
        text={
          <>
            <p>The original code on the left shows a controller with too much logic in it. But it is good for having all the code in one image</p>
            <ul>
              <li>First there is validation that the player metrics data isn't malformed. This includes proper error handling.</li>
              <li>Afterwards the JSON Web Token validation happens</li>
              <li>Finally a POST to the Database Management System happens.</li>
            </ul>
            <p>With a refactor I would add a service layer and there might even be a need for a lightweight CQRS architecture.</p>
            <p>Which prevents bloated controllers and makes the code more testable and therefore easier to maintain.</p>
          </>
        }
      />
    </>
  )
}

export default FloraHiveWorks;