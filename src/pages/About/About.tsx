import "./about.css";
import Gamebox2 from "./Gamebox2.png"

import Flumina from "../../assets/Flumina.wav";
import Gegenschein from "../../assets/Gegenschein v2.wav";

function About() {
  return (
    <>
      <div className="page-title">
        <p>About Me</p>
      </div>
      <div className="content header-spacing">
        <p>I  grew up in Østbirk and then moved to Grenaa to study Software Development at Dania Academy. This is were I met the two other people that I work on the game FloraHive with. We have been doing it in our spare time to improve our coding proficiency and because most of the school projects are only a week to a month. Working on a project for several years has given me the experience to work at something that is of a larger scope than small assignments.</p>
        <br></br>
        <p>I've always enjoyed coding since I was about 12 years old and made a bunch of small coding projects since then, most are of course lost to time or maybe I've become better at coding and just don't want to look at them anymore :P</p>
        <p>During my HTX education I learned C++ and used it to create small games. I've made a lot of really rough, dare I say bad looking websites while studying UI and UX.  Which everyone is really lucky to never see. However, it did teach me how important it is to design a system before jumping into the code without any idea of what I'm even trying to create.</p>
        <ul>
          <li>I love listening to music</li>
          <li>I love making my own music</li>
          <li>I sometimes read books because I like to learn. Be it coding to anthropology</li>
          <li>Big surprise I also play video games a lot</li>
        </ul>
        <br></br>
        <div className="split">
          <img src={Gamebox2}></img>
          <div>
            <p>Showing our game FloraHive at GameBox Festival and seeing so many people enjoy it is one of my favourite experiences.</p>
            <p>I really like programming because of how it can bring joy to other people. With games it's obvious that people will become happy, and with software I'll be happy knowing that it brings value to the users in some way.</p>
          </div>
        </div>
        <br></br>
        <h3 className="blue">Here are two songs I've made for the game FloraHive.</h3>
        <div className="content split">
          <div>
            <h4>Flumina</h4>
            <audio controls>
              <source src={Flumina} type="audio/wav"/>
            </audio>

          </div>
          <div>
            <h4>Gegenschein</h4>
            <audio controls>
              <source src={Gegenschein} type="audio/wav"/>
            </audio>
          </div>
        </div>
      </div>
    </>
  )
}
export default About;