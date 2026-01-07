import { WorkCard2, WorkSection } from "../../../components/WorkSection/WorkSection";
import FrequencyStats from "./frequency stats.png";
import LineAnalysis from "./line analysis.png";
import AdService from "./ad service.png";
import AdModel from "./ad model.png";
import SetParams from "./set platform params.png";
import SyncCompetitor from "./sync competitor.png";
import fetchAds from "./fetch ads from source.png";
import fetchAds2 from "./fetch ads from source 2.png";

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
      <WorkSection
        title="LinkedIn Ad API"
        image={[SetParams, SyncCompetitor]}
        text={
          <>
            <p>Python is dynamically typed and also and doesn't give me many warnings if I do something wrong. Therefore I make sure to add variable types and return types to help provide linter warnings.</p>
            <p>Now that the code is more maintainable we can see that for LinkedIn SearchAPI requires a specific engine name and parameters that were all found in their documentation.</p>
            <br></br>
            <br></br>
            <p>The key to saving the ads for different pages is the sync_single_competitor function</p>
            <p>I define the dictionary at the start which will be returned by this function.</p>
            <p>The flow is pretty simple, first SearchAPI is fetched and then saved to the database if anything was found. Same goes with the LinkedIn API.</p>
            <p>This is the service layer so all the error handling is in the controller (views.py class)</p>
          </>
        }
      />
      <WorkSection
        title="Fetching ads"
        image={[fetchAds, fetchAds2]}
        text={
          <>
            <p>Fetching from their API uses tokens, so to save on those the first thing we do is check the cache.</p>
            <p>This cache is based on the date range and page so that we fetch again on new pages or new date ranges</p>
            <br></br>
            <p>Some APIs are easier to navigate than others. For LinkedIn it was really troublesome to set the country param to Denmark in the param dictionary. Therefore I manually encode it when building the request url.</p>
            <br></br>
            <p>To make a request I just followed the documentation, which required these specific headers. I add a timeout to the request so when the frontend uses our endpoint it won't hang indefinitely.</p>
            <p>The response data is to the records list because the API uses pagination and we will have to make multiple requests.</p>
            <p>Lastly the response is saved to the cache. I chose 12 hours after having used the API and noticed that almost daily new ads are made by companies.</p>
            <p>For me it is important as a programmer to figure these things out when given a task so that the end product will end up being more useful.</p>
            <p>The value ad fetching provides to the customers for Conversio would be in the form of a daily notification that their competitors have  made new ads. A syncing task in the code runs every 24 hours so caching should at least be lower than this.</p>           
          </>
        }
      />
      <section className="content-2 align-items-center d-flex flex-column">
        <WorkCard2 className="w-100 mb-5">
          <h3>Saving fetched ads</h3>
          <p>Saving the ads to the database is a simple mapping task. So it is pretty boring and no code example for you!</p>
          <p>Fields are added or updated if they exist, and the many to many relational table is updated with the team that fetched the ads and therefore has access to them due to their API token.</p>
          <p>All the data is just text and while it is small I made sure to tell the Senior Backend Developer that they should make a periodic task which checks the size of ad data so they don't run into problems down the road.</p>
        </WorkCard2>
      </section>
    </>
  )
}

export default FloraHiveWorks;