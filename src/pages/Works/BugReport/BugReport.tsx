import { WorkCard2, WorkSection } from "../../../components/WorkSection/WorkSection";
import Dashboard from "./bug dashboard.png";
import DashboardDetails from "./bug dashboard details.png";
import BugReportUI from "./report a bug.png";
import Filters from "./bug dashboard filters.png";
import Logs from "./logs.png";

function FloraHiveWorks() {
  return (
    <>
      <section className="header-spacing-2 content-2 align-items-center d-flex flex-column">
        <h1 className="work-title">FloraHive Bug Reporting</h1>
        <h4 className="work-subtitle">We no longer need to backseat game all of our users</h4>
      </section>
      <WorkSection
        title="From Unity to the backend in milliseconds!"
        image={BugReportUI}
        text={
          <>
            <p>The simple bug reporting systems is build using:</p>
            <ul>
              <li>ASP.NET</li>
              <li>PostgreSQL</li>
              <li>Docker</li>
              <li>React, Tailwind CSS and shadcn/ui</li>
            </ul>
            <p>There are two ways for bugs to be reported in FloraHive:</p>
            <ol>
              <li>The in-game reporting system</li>
              <li>Automatic reporting of errors, exceptions and warnings</li>
            </ol>
            <p>On the shown image a simple input field allows users to describe the bug they encountered. When submitted there save state as well as the previous rounds will be sent.</p>
          </>
        }
      />
      <section className="header-spacing content-2 align-items-center d-flex flex-column">
        <h1 className="work-title text-center">FloraHive Bug Dashboard</h1>
        <h4 className="work-subtitle">Having the save file automatically sent is a life safer!</h4>
        <WorkCard2 className="w-75">
          <img src={Dashboard} className="img-fluid" alt="FloraHive Bug Dashboard" />
        </WorkCard2>
      </section>
      <WorkSection
        title="Viewing Details"
        image={DashboardDetails}
        text={
          <>
            <p>Being new to shadcn/ui I was able to quickly implement the dashboard using AI. Of course having to go over a lot of it again.
            </p>
            <ul>
              <li>I manually removed unnecessary styling the AI produced</li>
              <li>Added adjustments to fit with the simple vision I had in mind</li>
              <li>Read up on documentation from shadcn/ui and Tailwind CSS</li>
            </ul>
            <p>Overall I'm very satisfied with the result! Only 2 days of work setting up the frontend, backend and using the API with the game. <br></br><br></br></p>
            
            <p>The image on the right shows one of my coworkers bug reports. I was able to download their game's current and previous state to easily analyze the issues. Not having to reproduce the bug saves a lot of time.</p>
          </>
        }
      />
      <WorkSection
        title="Filtering bugs"
        image={Filters}
        imgColSize={7}
        text= {
          <>
            <p>I added some pretty useful filters. Maybe I'll add a swearword filter in the future!</p>
            <p>When bug reports are sent, there type is determined automatically. This way I can tell if it's my coworker swearing or the user!</p>
            <p>In all seriousness, there's many more filters to add. I will likely continue to use AI as it seems capable of implementing simple web features.</p>
          </>
        }
      />
      <WorkSection
        title="Viewing Logs"
        image={Logs}
        imgColSize={7}
        text= {
          <>
            <p>The most useful featuer is the ability to view logs that are sent without downloading them first.</p>
            <p>It includes the full trace information from Unity along with colorization for warnings versus errors.</p>
            <br></br>
            <br></br>
            <p>While FloraHive is still more of a hobby project, I would like to add:</p>
            <ul>
              <li>More filters and sorting options</li>
              <li>Automatic notifications for new bug reports</li>
              <li>Automatic sorting of similar bugs</li>
              <li>Dashboard with visual analytics for bug trends</li>
              <li>Backups and monitoring notifications if the system is down</li>
            </ul>
          </>
        }
      />
    </>
  )
}

export default FloraHiveWorks;