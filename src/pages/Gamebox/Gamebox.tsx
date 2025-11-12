import GameboxPoster from "./Gamebox.jpg";

function Gamebox() {
  return (
    <>
      <div className="page-title">
        <p>Gamebox</p>
      </div>
      <section className="content header-spacing">
        <div className="row">
          <div className="col-md-6">
            <p>We were a part of a large range of indie games showed at GameBox Festival. We had our own stand were hundreds of people would come by, some sitting for multiple hours and trying out the game.</p>
            <p>Showcasing our innovative game design was very rewarding, given that most of the people found our novel ideas to be fun and interesting.</p>
          </div>
          <div className="col-md-6">
            <img src={GameboxPoster}></img>
          </div>
        </div>
      </section>
    </>
  )
}

export default Gamebox;