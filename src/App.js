import React, { useState, useEffect } from 'react';

import './App.css';

const App = () => {
  const [voteTypes, setVoteTypes] = useState([["Loading...", 1.0]]);
  const [votes, setVotes] = useState(0);
  const [guideurl, setGuideURL] = useState("http://nymillennials.rocks");
  const [seasonNumber, setSeasonNumber] = useState("?");
  const [voteTotals, setVoteTotals] = useState({});
  const [votesToCast, setVotesToCast] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [guideowner, setGuideOwner] = useState("our team");
  const [includeWills, setIncludeWills] = useState(true);
  const [idols, setIdols] = useState([]);
  const [idolRandom, setIdolRandom] = useState(Math.floor(Math.random() * 100) + 1);
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
    setReverse(configJson.reverse ?? false);
    setGuideOwner(configJson.guideowner ?? "our team");
    setIdols(configJson.idols ?? []);
  };

  useEffect(() => {
    loadData();
  }, [])

  useEffect(() => {
    let votesleft = votes;
    const totalPct = voteTypes.map(({type, value}) => (includeWills || type !== "will") ? value : 0).reduce((a, b) => a + b, 0);
    let pctleft = 1.0;
    let castVotes = 0;
    const totals = {};
    voteTypes.filter(votetype => includeWills || votetype.type !== "will").forEach(({label, value, includeInTotal, type}, idx) => {
      if (idx === voteTypes.length - 1) {
        totals[label] = votesleft;
        if (includeInTotal) {
          castVotes += votesleft;
        }
      } else {
        console.log(label, value);
        const adjValue = (value * (1 / totalPct));
        console.log(adjValue);
        const calculatedVotes = Math.round((adjValue / pctleft) * votesleft);
        console.log(calculatedVotes);
        const votesToAdd = calculatedVotes || Math.min(votesleft, 1);
        totals[label] = votesToAdd;
        if (includeInTotal) {
          castVotes += votesToAdd;
          console.log("adding to total", votesToAdd);
        }
        pctleft -= adjValue;
        votesleft -= totals[label]
      }
    });
    setVoteTotals(totals);
    setVotesToCast(castVotes);
  }, [votes, voteTypes, includeWills]);

  const getLValue = (val) => {
    return maxL - ((maxL - minL) * val);
  };

  const getIdolizedPlayer = () => {
    let idol = idols[0];
    for (let x=1; x<idols.length; x++) {
      if (idols[x].value >= idolRandom) {
        return idol;
      }
      idol = idols[x];
    }
    return idol;
  };

  const chosenIdol = getIdolizedPlayer();

  return (
    <div className="container">
      <label>How many votes do you have?</label>
      <input id="votes" type="number" inputMode="numeric" pattern="[0-9]*" min="0" step="1" value={votes} onChange={e => setVotes(e.target.value)} />
      <label className="includeWills"><input type="checkbox" checked={includeWills} onClick={() => setIncludeWills(!includeWills)}/> Include Wills?</label>
      <br />
      <br />
      {(reverse ? voteTypes.slice(0).reverse() : voteTypes).filter(votetype => includeWills || votetype.type !== "will").map((votetype) => {
        return (
          <div key={votetype.label} className="voteType" style={{ "color": votetype.value > .8 ? "white": "black", "backgroundColor": `hsl(${colorH}, ${colorS}%, ${getLValue(votetype.value)}%)` }}>
            {debug ?
              `${votetype.label}: ${voteTotals[votetype.label] ?? 0} vote${voteTotals[votetype.label] === 1 ? "" : "s"} - ${votes <= 0 ? (0).toFixed(2) : (((voteTotals[votetype.label] ?? 0) / votes) * 100.0).toFixed(2)}%` :
              `${votetype.label}: ${voteTotals[votetype.label] ?? 0} vote${voteTotals[votetype.label] === 1 ? "" : "s"}`
            }
          </div>
        );
      })}
      <br />
      <div>Total Votes to Cast: {votesToCast}</div>
      {(!!idols.length && <h2>
        Idolize: <a href={`https://www.blaseball.com/player/${chosenIdol.id}`}>{chosenIdol.name}</a> (rolled {idolRandom})
        </h2>)}
    <br />
    <div>Why these picks? <a target="_blank" rel="noopener noreferrer" href={guideurl}>{`Read ${guideowner}'s awesome voting guide for Season ${seasonNumber}!`}</a></div>
    </div>
  )
};

export default App;
