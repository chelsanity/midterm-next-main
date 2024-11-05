"use client";

import { useState } from "react";

//TODO
// add button
// fetch data
// add data to state
// responsiveness
// clear data
// data
// component for empty state - check
// component for data state - check
// error handling - bonus

export default function Home() {
  //if useState isnt null, probably fetching or loading data or have data
  //if useState === data, we can display our data
  const [astronomyData, setAstronomyData] = useState(null);
  const [loading, setLoading] = useState(null);

  async function fetchAstronomyData() {
    //build the function that grabs data
    setLoading(true);
    const response = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5"
    ); //use await because you are waiting for data

    const data = await response.json();

    setAstronomyData(data);
    setLoading(false);
  }

  const DisplayAstronomyData = () => {
    //display if we have data
    //loading state
    //fulfilled state (data exists)
    //empty state (!data)
    // let formattedData = JSON.stringify(astronomyData);
    if (loading) return <div>im loading girl please wait!</div>;
    if (astronomyData) {
      const dataThatIsBeingFormattedDisplayed = [];
      astronomyData.forEach((entry, i) => {
        dataThatIsBeingFormattedDisplayed.push(
          <article key={i}>
            <h1>{entry.title}</h1>
            <h1>{entry.date}</h1>
            <img src={entry.url}></img>
          </article>
        );
      });
      return <ul>{dataThatIsBeingFormattedDisplayed}</ul>;
    }
    return <div>empty, nothing. data fetched</div>;
  };

  const Header = () => {
    //build the UI
    return (
      <header>
        welcome to my midterm prep
        <br />
        <button
          className="text-white font-semibold bg-violet-400 p-2 rounded-full"
          onClick={fetchAstronomyData}
        >
          grr lets fetch
        </button>
      </header>
    );
  };
  return (
    <div className="m-8">
      <Header />
      <DisplayAstronomyData />
    </div>
  );
}
