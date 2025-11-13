import Heatmap from "./Heatmap.png";
import MetricsPreview from "./MetricsPreview";
import Plot from "./Plot.png";

function FloraHiveMetrics() {
    

  return (
    <>
      <div className="page-title">
        <p>FloraHive Metrics</p>
      </div>

      <section className="content header-spacing">
        <MetricsPreview></MetricsPreview>
      </section>

      <section className="content header-spacing">
        <div className="row">
          <div className="col-md-6">
            <p>We build this system from the ground up using:</p>
            <ul>
              <li>C#</li>
              <li>ASP.NET</li>
              <li>PostgreSQL</li>
            </ul>
            <p>I did the primary work designing and implementing the system so that we could collect data from our users and visualize it. I even made a website where  we could see the gathered information displayed in various graphs.</p>
          </div>
          <div className="col-md-6">
            <img src={Heatmap}></img>
          </div>
        </div>
      </section>
      <section className="content header-spacing">
        <div className="row">
          <div className="col-md-6">
            <img src={Plot}></img>
          </div>
          <div className="col-md-6">
            <p>I have plenty of knowledge when it comes to working with backends and databases. I had to build it all from the ground up and as you can see on the left we have made visualizations from all the data gathered.</p>
            <p>The system is scalable and uses Plotly to display tables gotten through our REST API form our PostgreSQL database.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default FloraHiveMetrics;