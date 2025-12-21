import MetricsPreview2 from "../FloraHiveMetrics/MetricsPreview2";
import "./Interactive.css";

function Interactive() {
  return (
    <>
    <section className="header-spacing-2 content-2 d-flex justify-content-center mb-4">
        <h2>FloraHive Metrics</h2>
    </section>
    <section className="m-header-spacing content-2">
      <div className="interactive-card">
        <div className="card-line"></div>
        <MetricsPreview2></MetricsPreview2>
      </div>
    </section>
    </>
  )
}

export default Interactive;