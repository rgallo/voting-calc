import React, { useState, useEffect } from 'react';

import './App.css';

const App = () => {

  const useStateWithLocalStorageBool = (localStorageKey, defaultVal) => {
    const localStorageValue = localStorage.getItem(localStorageKey);
    let initialStateVal;
    if (localStorageValue === "true") {
      initialStateVal = true;
    } else if (localStorageValue === "false") {
      initialStateVal = false;
    } else {
      initialStateVal = defaultVal;
    }
    const [value, setValue] = React.useState(initialStateVal);
   
    React.useEffect(() => {
      localStorage.setItem(localStorageKey, value);
    }, [localStorageKey, value]);
   
    return [value, setValue];
  };

  const [voteTypes, setVoteTypes] = useState([["Loading...", 1.0]]);
  const [votes, setVotes] = useState(0);
  const [guideurl, setGuideURL] = useState("http://nymillennials.rocks");
  const [seasonNumber, setSeasonNumber] = useState("?");
  const [voteTotals, setVoteTotals] = useState({});
  const [votesToCast, setVotesToCast] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [guideowner, setGuideOwner] = useState("our team");
  const [idols, setIdols] = useState([]);
  const [idolRandom, setIdolRandom] = useState(Math.floor(Math.random() * 100) + 1);
  const [siesta, setSiesta] = useState(false);
  const [rawWimdys, setRawWimdys] = useState([]);
  const [wimdys, setWimdys] = useState([]);
  const colorH = 115;
  const colorS = 100;
  const maxL = 45;
  const minL = 15;
  const debug = false;
  const [showOptions, setShowOptions] = useState(false);
  const [includeWills, setIncludeWills] = useStateWithLocalStorageBool("includeWills", true);
  const [orderWimdys, setOrderWimdys] = useStateWithLocalStorageBool("orderWimdys", false);
  const [showWimdyPct, setShowWimdyPct] = useStateWithLocalStorageBool("showWimdyPct", false);

  const loadData = async () => {
    const config = await fetch(`${process.env.PUBLIC_URL}/config.json`);
    const configJson = await config.json();
    setVoteTypes(configJson.votetypes);
    setGuideURL(configJson.guideurl ?? "http://nymillennials.rocks");
    setSeasonNumber(configJson.season ?? "?");
    setReverse(configJson.reverse ?? false);
    setGuideOwner(configJson.guideowner ?? "our team");
    setIdols(configJson.idols ?? []);
    setSiesta(configJson.siesta ?? false);
    setRawWimdys(configJson.wimdys ?? []);
  };

  useEffect(() => {
    loadData();
  }, [])

  useEffect(() => {
    if (rawWimdys.length) {
      setWimdys(orderWimdys ? rawWimdys : [...rawWimdys].sort(() => Math.random() - 0.5));
    }
  }, [orderWimdys, rawWimdys])

  useEffect(() => {
    let votesleft = votes;
    const totalPct = voteTypes.map(({type, value}) => (includeWills || type !== "will") ? parseFloat(value) : 0).reduce((a, b) => a + b, 0);
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
        const adjValue = (parseFloat(value) * (1 / totalPct));
        const calculatedVotes = Math.round((adjValue / pctleft) * votesleft);
        const votesToAdd = calculatedVotes || Math.min(votesleft, 1);
        totals[label] = votesToAdd;
        if (includeInTotal) {
          castVotes += votesToAdd;
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

  const changeValue = (votetype, newvalue) => {
    const newVoteTypes = [];
    voteTypes.forEach(newVoteType => {
      if (newVoteType.label === votetype.label) {
        const voteTypeCopy = {...newVoteType};
        voteTypeCopy.value = newvalue;
        newVoteTypes.push(voteTypeCopy)
      } else {
        newVoteTypes.push(newVoteType);
      }
    });
    setVoteTypes(newVoteTypes);
  }

  const renderVote = votetype => {
    const debugText = debug ? ` - ${votes <= 0 ? (0).toFixed(2) : (((voteTotals[votetype.label] ?? 0) / votes) * 100.0).toFixed(2)}%` : "";
    const wimdyVoteSplit = (showWimdyPct && rawWimdys.length) ? ` (~${(voteTotals["WIMDY!"] / rawWimdys.length).toFixed(2)} votes each)` : "";
    const slider = (votetype.min ? <input type="range" style={{"marginLeft": "10px"}} min={votetype.min} max={votetype.max} value={votetype.value} step="0.01" onChange={e => changeValue(votetype, e.target.value)} /> : null);
    return (
      <div key={`${votetype.label}`} className="voteType" style={{ "color": votetype.value > .8 ? "white": "black", "backgroundColor": `hsl(${colorH}, ${colorS}%, ${getLValue(votetype.value)}%)` }}>
        {`${votetype.label + (votetype.type === "wimdy" ? " *" : "")}: ${voteTotals[votetype.label] ?? 0} vote${voteTotals[votetype.label] === 1 ? "" : "s"}${debugText}${votetype.type === "wimdy" ? wimdyVoteSplit : ""}`}
        {slider}
      </div>
    );
  };

  return (
    <div className="container">
      <label>How many votes do you have?</label>
      <input id="votes" type="number" inputMode="numeric" pattern="[0-9]*" min="0" step="1" value={votes} onChange={e => setVotes(e.target.value)} />
      <button className="showOptions" onClick={() => setShowOptions(!showOptions)}>{showOptions ? "Hide" : "Show"} Options</button>
      <br />
      {showOptions && (
        <div>
          <br />
          <label className="option"><input type="checkbox" defaultChecked={includeWills} onClick={() => setIncludeWills(!includeWills)}/> Include Wills</label>
          <label className="option"><input type="checkbox" defaultChecked={orderWimdys} onClick={() => setOrderWimdys(!orderWimdys)}/> Keep Wimdys In Order</label>
          <label className="option"><input type="checkbox" defaultChecked={showWimdyPct} onClick={() => setShowWimdyPct(!showWimdyPct)}/> Show Wimdy Percentage Split</label>
          <br />
        </div>
      )}
      <br />
      {(reverse ? voteTypes.slice(0).reverse() : voteTypes).sort((a, b) => a.order - b.order).filter(votetype => includeWills || votetype.type !== "will").map((votetype) => renderVote(votetype))}
      <br />
      <div>Total Votes to Cast: {votesToCast}</div>
      {(!!idols.length && <h2>
        Idolize: <a target="_blank" rel="noopener noreferrer" href={`https://www.blaseball.com/player/${chosenIdol.id}`}>{chosenIdol.name}</a> (rolled {idolRandom})
        </h2>)}
    <br />
    { 
      wimdys.length ? (
      <>
        <div>* Vote with your heart on any of the following: <br />
        <ul>
          {wimdys.map(wimdy => <li key={wimdy}>{wimdy}</li>)}
        </ul>
        </div>
      </>
      ) : ""
    }
    {
      siesta ? (
        <div><span style={{"color": "red"}}>&lt;3</span>, The New York Millennials Voting Guide Team</div>
      ) : (
        <div>Why these picks? <a target="_blank" rel="noopener noreferrer" href={guideurl}>{`Read ${guideowner}'s awesome voting guide for Season ${seasonNumber}!`}</a></div>
      )
    }
    </div>
  )
};

export default App;
