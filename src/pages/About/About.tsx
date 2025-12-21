import "./about.css";

import Flumina from "../../assets/Flumina.wav";
import Gegenschein from "../../assets/Gegenschein v2.wav";
import Tobias from "./tobias.jpg";

function About() {
  return (
    <>
      <section className="content-2 header-spacing-2">
        <div className="row">
          <div className="col-md-6">
            <p>I'm Tobias Krogshede a software developer interested in the technical aspects of designing and implementing systems.</p>
            <p>
              Performance optimization and good architecture are what I strive for, always researching and trying to get a deeper understanding of new technologies.
            </p>
            <p className="mt-4">
              When I'm not programming I'll be reading about science and history, but more interestingly I like producing music.
            </p>
            <p className="mt-5">These two tracks were made for the game FloraHive.</p>
          <h4 className="fw-3 mt-5">Flumina</h4>
          <audio controls>
            <source src={Flumina} type="audio/wav"/>
          </audio>
          <h4 className="fw-3 mt-3">Gegenschein</h4>
          <audio controls>
            <source src={Gegenschein} type="audio/wav"/>
          </audio>
          </div>
          <div className="col-md-6">
            <img src={Tobias} className="img-fluid rounded" style={{ width: '320px' }} alt="Tobias" />
          </div>
        </div>
      </section>
    </>
  )
}
export default About;