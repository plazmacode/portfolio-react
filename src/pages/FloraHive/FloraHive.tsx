import { useEffect, useState } from "react";
import "./FloraHive.css";

import TerrainGeneration from "./TerrainGeneration.gif";
import aStarExample from  "./aStarExample.png";
import TerrainMenu from "./TerrainMenu.gif";
import CalculateNodeAreaConnections from "./CalculateNodeAreaConnections.png";
import ConnectInaccessibleAreas from "./ConnectInaccessibleAreas.png"
import Pathfinding from "./Pathfinding.gif"
import GetMultiNodePath from "./GetMultiNodePath.png";
import Localization from "./Localization.png";
import Encyclopedia from "./Encyclopedia.gif";
import Search from "./Search.png";
import GetIndexValues from "./GetIndexValues.png";
import MutationGeneration from "./MutationGeneration.png";
import MutationEffects from "./MutationEffects.png"
import SystemReflection from "./SystemReflection.png";

function FloraHive() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setOffset(window.scrollY * 0.4); 
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <>
      <section className="florahive-title-container">
        <div>
          <div className="florahive-title-image"
            style={{ transform: `translate3d(0px, +${offset}px, 0px)` }}
          ></div>
        </div>
      </section>
      <section className="content header-spacing">
        <h2 className="blue heading">The Complex Systems of FloraHive</h2>
        <div className="row">
          <div className="col-md-6">
            <p>FloraHive is an indie game made from the ground up in Unity. My primary work on the game is designing and implementing compex systems.</p>
            <p>I have worked on:</p>
            <ul>
              <li>Pathfinding</li>
              <li>Terrain Generation</li>
              <li>Searchable menus</li>
              <li>System Reflection to make customized systems tailored to our needs.</li>
            </ul>
          </div>
          <div className="col-md-6" style={{ paddingLeft: "80px" }}>
              <p style={{fontSize: "24px"}}>What is FloraHive?</p>
              <p>FloraHive is a Roguelite Tower Defense game where you can move your towers and your base around. Enemies will also change the path they attack from, requiring the player to constantly come up with new strategies to win. New towers and upgrades for them are unlocked as the player progresses through randomly generated levels set in different biomes.</p>
              <br></br>
              <p>FloraHive is releasing on Steam; the worlds largest videogame retailer. This required us to handle the legal nencessities of releasing a game, and of course learning all the skills required to build a game from the start.</p>
          </div>
        </div>
      </section>
      <section className="content header-spacing">
        <div className="row">
          <div className="col-md-6">
            <h4 className="blue">Terrain Generation</h4>
            <p>Every level in the game is randomly generated using a combination of methods:</p>
            <ul>
              <li>A* pathfinding</li>
              <li>Perlin Noise</li>
              <li>Minimum Spanning Tree (ensure all parts of the level can be accessed)</li>
            </ul>
          </div>
          <div className="col-md-6">
            <img src={TerrainGeneration}></img>
          </div>
        </div>
      </section>
      <section className="content header-spacing">
        <div className="row">
          <div className="col-md-3">
            <p>The A* Algorithm is really simple but effective for ensuring the generated terrain can be used.</p>
            <br></br>
            <p>If a path cannot be found between the player base and enemy spawn location, the two objects will need to be placed again.</p>
          </div>
          <div className="col-md-9">
            <img src={aStarExample}></img>
          </div>
        </div>
      </section>
      <section className="content header-spacing">
        <h4>Minimum Spanning Tree Algorithm - Making every open tile of our level accessible</h4>
        <br></br>
        <img style={{maxWidth: "75%"}}src={TerrainMenu}></img>
        <br></br>
      </section>
      <section className="content header-spacing">
        <div className="row">
          <div className="col-md-6">
            <p>We've made the decision to connect inaccessible areas in the terrain. In order to do that I researched and found the Minimum Spanning Tree algorithm.</p>
            <br></br>
            <p>Imagine you have a neighborhood of houses and plan to connect them with internet cables. Some of the houses  are already connected and you want to find the shortest way to connect them all so that less cable has to be installed.</p>
            <br></br>
            <p>We start by finding all the 'areas', which is the open terrain without obstacles. An area is every open tile so that means we will have multiple areas if some open tiles cannot connect to others.</p>
            <br></br>
            <p>Afterwards we can find the closest distance between each of thte areas and finally at the end of the while loop add to our list of nodes that we need to clear obstacles from, in order to connect or areas of nodes.</p>
          </div>
          <div className="col-md-6">
            <img src={CalculateNodeAreaConnections}></img>
          </div>
        </div>
      </section>
      <section className="content header-spacing">
        <div className="row">
          <div className="col-md-5">
            <p>Removing the obstacle nodes is done inside this method which is a part of our larger terrain generation call.</p>
            <br></br>
            <p>We start by getting our list of walkable nodes. Call our MST algorithm and then update the resulting nodes so that their properties of HasObstacle and IsPermanentObstacle is false.</p>
            <br></br>
            <p>These bools check whether a tile has an obstacle or not, which of course gets used by our pathfinding for when the enemies move or towers move.</p>
          </div>
          <div className="col-md-7">
            <img src={ConnectInaccessibleAreas}></img>
          </div>
        </div>
      </section>
      <section className="content header-spacing">
        <h4 className="blue">Pathfinding</h4>
        <div className="row header-spacing">
          <div className="col-md-7">
            <img src={Pathfinding}></img>
          </div>
          <div className="col-md-5">
            <p>It's just A* pathfinding, with some extra functions to work better with our game.</p>
            <ul>
              <li>HashSet for performance</li>
              <li>Multinode paths</li>
              <li>Filtering of nodes for different types of terrain</li>
              <li>Getting walkable nodes with recursion and a filter.</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="content header-spacing">
        <div className="row">
          <div className="col-md-6">
            <img src={GetMultiNodePath}></img>
          </div>
          <div className="col-md-6">
            <p>Here we make use of our A* GetPath() method to get a path between multiple node positions. In most cases this is used to find the path from the enemy factory, to the platform and then to the player crystal.</p>
            <p>We use a list of allowed and blocked nodes to navigate the path. Blocked nodes are important since we're not allowed to go diagonally if there's obstacles in the way.</p>
          </div>
        </div>
      </section>
       <section className="content header-spacing">
        <h2 className="blue heading">Mutations and Evolutions - The upgrade system of FloraHive</h2>
        <p>Some Features related to our upgrade systems</p>
        <ul>
          <li>System Reflection</li>
          <li>Searchable Encyclopedia</li>
          <li>Localization System</li>
          <li>Balancing System (JSON serialization of all stats so they can be modified without recompiling the game.)</li>
        </ul>
        <img className="header-spacing" src={Localization}></img>
        <p className="header-spacing">All text is localized and read from a CSV file, this makes all our evolutions and mutations searchable inside the game.</p>
        <img className="header-spacing" src={Encyclopedia}></img>
      </section>
      <section className="content header-spacing">
        <div className="row">
          <div className="col-md-6">
            <img src={Search}></img>
          </div>
          <div className="col-md-6">
            <p>To easily make everything searchable we use an IEncyclopediaIndexable interface on our Mutation, Evolution, Enemy etc. classes.</p>
            <p>In our enemy class we can then return the key to were our localized text can be found which is used to match our search query. With interfaces these keys can of course be varied from class to class.</p>
            <img src={GetIndexValues}></img>
          </div>
        </div>
      </section>
      <section className="content header-spacing footer-spacing">
        <h2 className="blue heading">System Reflection and our Mutation System</h2>
        <p>Adding mutation upgrades to our game has to be very simple. So I've created a system that should make it easy for the rest of our great 3 person team :)</p>
        <div className="row">
          <div className="col-md-6">
            <img className="header-spacing" src={MutationGeneration}></img>
            <img className="header-spacing" src={MutationEffects}></img>
            <img className="header-spacing" src={SystemReflection}></img>
          </div>
          <div className="col-md-6 header-spacing">
            <ul>
              <li>Mutation Name</li>
              <li>Math Operation</li>
              <li>Property name on the class</li>
              <li>Value to change property by</li>
              <li>Weight used to calculate chance of mutation (and many other optional parameters.)</li>
            </ul>
            <p className="header-spacing">With these simple parameters we're actually using system reflection to modify our TowerScriptableObject class. Doing it this way allows us to have many hundreds of mutations without having to manually write how each property change is done.</p>
            <p>There is a neglible performance cost to using System Reflection, but this also allows us to easily undo properties of any mutation without writing much extra code.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default FloraHive;