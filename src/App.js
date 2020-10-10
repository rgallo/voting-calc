import React, { useState } from 'react';

import './App.css';

const App = () => {
  const votetypes = [
    ["Affinity for Crows", .36],
    ["Subleague Swap", .20],
    ["Replacement Elbows", .10],
    ["Composite", .10],
    ["Who? You Too?", .10],
    ["Precognition", .05],
    ["Astroturf", .025],
    ["Base Insticts", .025],
    ["Forever Physical", .01],
    ["Anti Burnout", .01],
    ["Home Field Advantage", .01],
    ["Barrel of Tiny Eggs", .01]
  ];
  const [votes, setVotes] = useState(0);
  const colorH = 115;
  const colorS = 100;
  const maxL = 45;
  const minL = 15;
  const [idolRandom, setIdolRandom] = useState(Math.floor(Math.random() * 100) + 1);
  const debug = false;

  const getIdolizedPlayer = () => {
    if (idolRandom <= 76) return "Winnie Mccall";
    if (idolRandom <= 78) return "Thomas Dracena";
    if (idolRandom <= 80) return "Sandie Turner";
    if (idolRandom <= 82) return "Dominic Marijuana";
    if (idolRandom <= 84) return "Ren Hunter";
    if (idolRandom <= 86) return "Andrew Solis";
    if (idolRandom <= 88) return "Wesley Dudley";
    if (idolRandom <= 90) return "Schneider Bendie";
    if (idolRandom <= 92) return "Penelope Mathews";
    if (idolRandom <= 94) return "Theodore Cervantes";
    if (idolRandom <= 96) return "Patty Fox";
    if (idolRandom <= 98) return "Fynn Doyle";
    if (idolRandom <= 100) return "Bates Bentley";
  }

  const getVoteTotal = (votetype, islast) => {
    if (!islast) {
      return Math.floor(votes * (votetype[1]));
    }
    let othervotes = 0;
    for (let i = 0; i < votetypes.length - 1; i++) {
      othervotes += Math.floor(votes * (votetypes[i][1]));
    }
    return votes - othervotes;
  };

  const getLValue = (val) => {
    return maxL - ((maxL - minL) * val);
  };

  return (
    <div className="container">
      <label>How many votes do you have?</label>
      <input id="votes" type="number" inputmode="numeric" pattern="[0-9]*" value={votes} onChange={e => setVotes(e.target.value)} />
      <br />
      <br />
      {votetypes.map((votetype, idx, arr) => {
        return (
          <div key={idx} className="voteType" style={{ "background-color": `hsl(${colorH}, ${colorS}%, ${getLValue(votetype[1])}%)` }}>
            {debug ?
              `${votetype[0]}: ${getVoteTotal(votetype, idx === arr.length - 1)} votes - ${votes <= 0 ? (0).toFixed(2) : ((getVoteTotal(votetype, idx === arr.length - 1) / votes) * 100.0).toFixed(2)}%` :
              `${votetype[0]}: ${getVoteTotal(votetype, idx === arr.length - 1)} votes`
            }
          </div>
        );
      })}
      { /* <h2>Idolize: {`${getIdolizedPlayer()} (rolled ${idolRandom})`}</h2> */}
      <br />
      <div>Why these picks? <a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/document/d/1GDTko9PU039u5Way8tlgztP2GkB6WtycaHYg33kyRCs/edit?usp=sharing">Read Newt's awesome voting guide for Season <span class="strikethrough">∞</span> 8!</a><br />(right click and open link in new window or tab if it doesn't work)</div>
    </div>
  )
};

export default App;
