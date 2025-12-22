import React from 'react';
import { WorkSection, WorkCard2 } from '../../../components/WorkSection/WorkSection';
import TerrainGeneration from "./TerrainGeneration.gif";
import aStarExample from "./aStarExample.png";
import TerrainMenu from "./TerrainMenu.gif";
import CalculateNodeAreas from "./CalculateNodeAreaConnections.png";
import ConnectInaccessibleAreas from "./ConnectInaccessibleAreas.png";
import Pathfinding from "./Pathfinding.gif";
import GetMultiNodePath from "./GetMultiNodePath.png";
import Localization from "./Localization.png";
import Encyclopedia from "./Encyclopedia.gif";
import Search from "./Search.png";
import GetIndexValues from "./GetIndexValues.png";
import MutationGeneration from "./MutationGeneration.png";
import MutationEffects from "./MutationEffects.png";
import SystemReflection from "./SystemReflection.png";

function FloraHiveWorks() {
  return (
    <>
      <section className="header-spacing-2 content-2 align-items-center d-flex flex-column">
        <h1 className="work-title">The Complex Systems of FloraHive</h1>
      </section>

      <section className="content-2 d-flex flex-column align-items-center pb-5">
        <div className="row justify-content-between w-100">
          <div className="col-md-6">
            <WorkCard2>
              <p>FloraHive is an indie game made from the ground up in Unity. My primary work is designing and implementing complex systems.</p>
              <p>I have worked on:</p>
              <ul>
                <li>Pathfinding</li>
                <li>Terrain Generation</li>
                <li>Searchable menus</li>
                <li>System Reflection</li>
              </ul>
            </WorkCard2>
          </div>
          <div className="col-md-6">
            <WorkCard2>
              <p className="text-decoration-underline">What is FloraHive?</p>
              <p>FloraHive is a Roguelite Tower Defense game where you can move your towers and your base around. Enemies will also change the path they attack from, requiring the player to constantly come up with new strategies to win. New towers and upgrades for them are unlocked as the player progresses through randomly generated levels set in different biomes.
                <br></br>
                <br></br>
                FloraHive is releasing on Steam; the worlds largest videogame retailer. This required us to handle the legal nencessities of releasing a game, and of course learning all the skills required to build a game from the start.</p>
            </WorkCard2>
          </div>
        </div>
      </section>
      <WorkSection
        title="Terrain Generation"
        image={TerrainGeneration}
        text={
          <>
            <p>Every level is randomly generated using a combination of methods:</p>
            <ul>
              <li>A* pathfinding</li>
              <li>Perlin Noise</li>
              <li>Minimum Spanning Tree (ensure all parts of the level can be accessed)</li>
            </ul>
          </>
        }
      />
      <WorkSection
        image={aStarExample}
        imgColSize={9}
        imageSide="right"
        text={
          <>
            <p>The A* Algorithm is really simple but effective for ensuring the generated terrain can be used.</p>
            <p>If a path cannot be found between the player base and enemy spawn location, the two objects will need to be placed again.</p>
          </>
        }
      />

      <section className="header-spacing content-2 align-items-center d-flex flex-column">
        <h1 className="work-title text-center">Minimum Spanning Tree Algorithm</h1>
        <h4 className="work-subtitle">Making every open tile of our level accessible</h4>
        <WorkCard2 className="w-75">
          <img src={TerrainMenu} className="img-fluid" alt="MST Algorithm" />
        </WorkCard2>
      </section>

      <WorkSection
        image={CalculateNodeAreas}
        text={
          <>
            <p>We've made the decision to connect inaccessible areas in the terrain. In order to do that I researched and found the Minimum Spanning Tree algorithm.</p>
            <p>Imagine you have a neighborhood of houses and plan to connect them with internet cables. Some of the houses are already connected and you want to find the shortest way to connect them all so that less cable has to be installed.</p>
            <p>We start by finding all the 'areas', which is the open terrain without obstacles. An area is every open tile so that means we will have multiple areas if some open tiles cannot connect to others.</p>
            <p>Afterwards we can find the closest distance between each of thte areas and finally at the end of the while loop add to our list of nodes that we need to clear obstacles from, in order to connect or areas of nodes.</p>
          </>
        }
      />
      <WorkSection
        image={ConnectInaccessibleAreas}
        imgColSize={7}
        imageSide="right"
        text={
          <>
            <p>Removing the obstacle nodes is done inside this method which is a part of our larger terrain generation call.</p>
            <p>We start by getting our list of walkable nodes. Call our MST algorithm and then update the resulting nodes so that their properties of HasObstacle and IsPermanentObstacle is false.</p>
            <p>These bools check whether a tile has an obstacle or not, which of course gets used by our pathfinding for when the enemies move or towers move.</p>
          </>
        }
      />
      <section className="header-spacing content-2 align-items-center d-flex flex-column">
        <h1 className="work-title text-center">Pathfinding</h1>
        <h4 className="work-subtitle">Used by enemies and for moving the towers</h4>
      </section>
      <WorkSection
        image={Pathfinding}
        imgColSize={7}
        imageSide="left"
        text={
          <>
            <p>It's just A* pathfinding, with some extra functions to work better with our game.</p>
            <ul>
              <li>HashSet for performance</li>
              <li>Multinode paths</li>
              <li>Filtering of nodes for different types of terrain</li>
              <li>Getting walkable nodes with recursion and a filter.</li>
            </ul>
          </>
        }
      />
      <WorkSection
        image={GetMultiNodePath}
        imgColSize={6}
        imageSide="left"
        text={
          <>
            <p>Here we make use of our A* GetPath() method to get a path between multiple node positions. In most cases this is used to find the path from the enemy factory, to the platform and then to the player crystal.</p>
            <p>We use a list of allowed and blocked nodes to navigate the path. Blocked nodes are important since we're not allowed to go diagonally if there's obstacles in the way.</p>
          </>
        }
      />
      <section className="header-spacing content-2 align-items-center d-flex flex-column">
        <h1 className="work-title text-center">Mutations and Evolutions</h1>
        <h4 className="work-subtitle">The upgrade system of FloraHive</h4>
        <WorkCard2 className="w-100">
          <p>Some Features related to our upgrade systems</p>
          <ul>
            <li>System Reflection</li>
            <li>Searchable Encyclopedia</li>
            <li>Localization System</li>
            <li>Balancing System (JSON serialization of all stats so they can be modified without recompiling the game.)</li>
          </ul>
          <img src={Localization} className="img-fluid mb-4"></img>
          <p>All text is localized and read from a CSV file, this makes all our evolutions and mutations searchable inside the game.</p>
          <img src={Encyclopedia} className="img-fluid mt-4"></img>
        </WorkCard2>
      </section>
      <WorkSection
        image={Search}
        imgColSize={6}
        imageSide="left"
        text={
          <>
            <p>To easily make everything searchable we use an IEncyclopediaIndexable interface on our Mutation, Evolution, Enemy etc. classes.</p>
            <p>In our enemy class we can then return the key to were our localized text can be found which is used to match our search query. With interfaces these keys can of course be varied from class to class.</p>
            <img src={GetIndexValues} className="img-fluid"></img>
          </>
        }
      />
      <section className="header-spacing content-2 align-items-center d-flex flex-column">
        <h1 className="work-title text-center">System Reflection</h1>
        <h4 className="work-subtitle">The backbone of the Mutation & Evolution Systems</h4>
        <WorkCard2>
          <p>Adding mutation upgrades to our game has to be very simple. So I've created a system that should make it easy for the rest of our great 3 person team :)</p>
        </WorkCard2>
      </section>
      <WorkSection
        image={[MutationGeneration, MutationEffects, SystemReflection]}
        imgColSize={6}
        imageSide="left"
        text={
          <>
            <ul>
              <li>Mutation Name</li>
              <li>Math Operation</li>
              <li>Property name on the class</li>
              <li>Value to change property by</li>
              <li>Weight used to calculate chance of mutation (and many other optional parameters.)</li>
            </ul>
            <p>With these simple parameters we're actually using system reflection to modify our TowerScriptableObject class. Doing it this way allows us to have many hundreds of mutations without having to manually write how each property change is done.</p>
            <p>There is a neglible performance cost to using System Reflection, but this also allows us to easily undo properties of any mutation without writing lots of code.</p>
          </>
        }
      />
    </>
  );
}

export default FloraHiveWorks;