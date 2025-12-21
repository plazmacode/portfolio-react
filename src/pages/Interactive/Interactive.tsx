import MetricsPreview2 from "../FloraHiveMetrics/MetricsPreview2";
import "./Interactive.css";

function Interactive() {
  return (
    <>
      <section className="m-header-spacing-2 content">
        <h1>FloraHive Metrics</h1>
        <div className="interactive-card">
          <div className="card-line"></div>
          <MetricsPreview2></MetricsPreview2>
        </div>
      </section>
    </>
  )
}

export default Interactive;