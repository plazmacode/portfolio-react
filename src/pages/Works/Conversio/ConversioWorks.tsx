import { WorkSection } from "../../../components/WorkSection/WorkSection";
import FrequencyStats from "./frequency stats.png";
import LineAnalysis from "./line analysis.png";
import AdService from "./ad service.png";
import AdModel from "./ad model.png";

function FloraHiveWorks() {
  return (
    <>
      <section className="header-spacing-2 content-2 align-items-center d-flex flex-column">
        <h1 className="work-title">Conversio Hub</h1>
        <h2 className="work-subtitle">The Beginning</h2>
      </section>

      <WorkSection
        title="Frequency Analysis"
        image={FrequencyStats}
        text={
          <>
            <p>The first feature I implemented for Conversio Hub was an endpoint which would return useful insights about emails.</p>
            <br></br>
            <p>Conversio is a marketing bureau and their customers can perform analysis on emails. In the example is a snippet of some of the endpoints implementation.</p>
            <br></br>
            <p>This code is found in the views.py, which handles the endpoints permissions, error handling and serialization.</p>
            <p>As can be seen in the example some of the logic is in the view, which is something I have done differently in later features I made, as I was still learning at this point.</p>
            <p>The actual code on the right is quite simple, but there is a few hundred lines of different queries to provide meaningful insights by filtering the data.</p>
            <p>This is another reason why moving all the logic into the service layer is an architecture I now follow to make code more maintainable.</p>
          </>
        }
      />
      <WorkSection
        title="Learning Django"
        image={LineAnalysis}
        text={
          <>
           <p>I had not coded a lot of Python when my internship began. But they believed in me and I showed them even before I started that I could learn Django on my own so my inexperience wouldn't be a problem.</p>
           <br></br>
           <p>In the code we're doing very basic analysis on the text. Trying to count the upper case and lower case letters, which could be meaningful in marketing emails. On top of that I use stop words to extract the most common words written in emails. My task was mainly to check the frequency of when emails were most often send. But I added some useful analysis on top of that.</p>
           <p>Other analysis includes avg letter/word count and emoji usage.</p>
          </>
        }
      />
      <section className="header-spacing content-2 align-items-center d-flex flex-column">
        <h1 className="work-title">My Best Code</h1>
        <h2 className="work-subtitle">Ad Fetching API</h2>
      </section>
      <WorkSection
        title="Good code requires good architecture"
        image={[AdService, AdModel]}
        text={
          <>
            <div className="d-flex">
            <p className="font-weight-bold">Problem:&nbsp;</p>
            <p>Customers have to manually check competitors ads through Meta, LinkedIn and Google API's.</p>
            </div>
            <p>The different Ad APIs we're fetching from all provide different data. Instead of implementing each one of them as their own class, we're inherting from the abstract AdServices class.</p>
            <p>This code structure meant new APIs were implemented much quicker since code could be reused.</p>
            <p>All the ad APIs shared the same logic for SearchAPI fetching and validation as can be seen by the functions without the @abstractmethod decorator.</p>
            <br></br>
            <hr className="bg-danger border-2 border-top border-danger" />
            <p>The same inheritance can be done with the database. All the API's have some form of id for each page that publishes ads. Each ad has a name, date range, creation time etc.</p>
            <p>For the Database I wrote this model with Django's ORM to convert into SQL for the PostgreSQL database. <br></br>Object Relation Mapping makes things easier and faster to write, but if more performance is needed I would implement queries in SQL, which would be a good way to make it run faster without costly upgrades to the infrastructure.</p>
          </>
        }
      />
    </>
  )
}

export default FloraHiveWorks;