import tobias from "./tobias.jpg";
import "./intro.css";

function Introduction() {
  return (
    <div className="intro content">
      <div className="home-title blue">
          <h1>I am Tobias Krogshede</h1>
          <h2>Software Developer</h2>
      </div>
      <div className="profile">
        <img src={tobias} className="img-fluid w-50" alt="tobias" height={300}/>
      </div>
    </div>
  )
}

export default Introduction;