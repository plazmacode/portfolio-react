import './App.css';
// import BlogList from './components/BlogList/BlogList'
import Introduction from './components/Introduction/Introduction';
import SelectedWorks from './components/SelectedWorks/SelectedWorks';

function App() {
  return (
    <>
      <Introduction></Introduction>
      <SelectedWorks></SelectedWorks>
      <div className="content">
        <div>
          <h4>Work Experience</h4>
          <p>[2023] - [2025]</p>
          <p>[FloraHive - Stranded Ocean I/S]</p>
          <p>C# Software Developer, Unity Game Development, Music, SFX</p>
          <p>Working on the game FloraHive with 2 others.</p>
        </div>
        <div>
          <h4>Education</h4>
          <p>[2024]  - [2025]</p>
          <p>[Dania Academy, Grenaa - Bachelor in Software Development]</p>
          <p>[2021]  - [2024]</p>
          <p>[Dania Academy, Grenaa - AP Graduate in Computer Science]</p>
          <br></br>
          <p>During both my time of education at Dania Academy I learned a lot of different things:</p>
          <ul>
            <li>C# in .NET both for game development, RESTful web services.</li>
            <li>Design patterns</li>
            <li>We used scrum in many of our projects. Also learned about LeSS, SAFe & Unified Process</li>
            <li>Scalable systems with Docker and Kubernetes</li>
            <li>PostgreSQL and MongoDB database implenetations.</li>
            <li>Machine Learning with Python</li>
          </ul>
          <br></br>
        </div>
        <div>
          <h4>Programming Languages</h4>
          <p>Programming Languages I have experience in, from most to least:</p>
          <ul>
            <li>C#</li>
            <li>JavaScript, TypeScript & React</li>
            <li>Python</li>
            <li>C++</li>
          </ul>
          <br></br>
          <p>Languages that I am less familiar with but have tried:</p>
          <ul>
            <li>GLSL</li>
            <li>Rust</li>
            <li>Java</li>
            <li>Kotlin</li>
          </ul>
        </div>
      </div>
      <div className="home-footer blue">
        <p>Get in touch at tobiaskrogshede@gmail.com</p>
      </div>
    </>
  )
}

export default App
