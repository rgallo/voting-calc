import React, { useState, useEffect } from 'react';

import './App.css';

const App = () => {
  const [voteTypes, setVoteTypes] = useState([["Loading...", 1.0]]);
  const [votes, setVotes] = useState(0);
  const [guideurl, setGuideURL] = useState("http://nymillennials.rocks");
  const [seasonNumber, setSeasonNumber] = useState("?");
  const colorH = 115;
  const colorS = 100;
  const maxL = 45;
  const minL = 15;
  const debug = false;

  const loadData = async () => {
    const config = await fetch(`${process.env.PUBLIC_URL}/config.json`);
    const configJson = await config.json();
    setVoteTypes(configJson.votetypes);
    setGuideURL(configJson.guideurl);
    setSeasonNumber(configJson.season);
  };

  useEffect(() => {
    loadData();
  }, [])

  const getVoteTotal = (votetype, islast) => {
    if (!islast) {
      return Math.floor(votes * (votetype[1]));
    }
    let othervotes = 0;
    for (let i = 0; i < voteTypes.length - 1; i++) {
      othervotes += Math.floor(votes * (voteTypes[i][1]));
    }
    return votes - othervotes;
  };

  const getLValue = (val) => {
    return maxL - ((maxL - minL) * val);
  };

  return (
    <div className="container">
      <label>How many votes do you have?</label>
      <input id="votes" type="number" inputMode="numeric" pattern="[0-9]*" value={votes} onChange={e => setVotes(e.target.value)} />
      <br />
      <br />
      {voteTypes.map((votetype, idx, arr) => {
        return (
          <div key={idx} className="voteType" style={{ "backgroundColor": `hsl(${colorH}, ${colorS}%, ${getLValue(votetype[1])}%)` }}>
            {debug ?
              `${votetype[0]}: ${getVoteTotal(votetype, idx === arr.length - 1)} votes - ${votes <= 0 ? (0).toFixed(2) : ((getVoteTotal(votetype, idx === arr.length - 1) / votes) * 100.0).toFixed(2)}%` :
              `${votetype[0]}: ${getVoteTotal(votetype, idx === arr.length - 1)} votes`
            }
          </div>
        );
      })}
      <br />
    <div>Why these picks? <a target="_blank" rel="noopener noreferrer" href={guideurl}>{`Read Newt's awesome voting guide for Season ${seasonNumber}!`}</a></div>
    </div>
  )
};

export default App;
