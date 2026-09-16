import { useMemo, useState } from "react";

type League = "NFL" | "NBA";

const teams = {
  NFL: ["Atlanta Falcons", "All NFL Teams"],
  NBA: ["Atlanta Hawks", "All NBA Teams"],
};

const players = [
  { name: "Marcus Reed", league: "NFL", pos: "CB", overall: 87, fit: 94, risk: "Moderate" },
  { name: "Jordan Williams", league: "NFL", pos: "EDGE", overall: 91, fit: 89, risk: "Low" },
  { name: "Darius Cole", league: "NBA", pos: "Wing", overall: 88, fit: 93, risk: "Low" },
  { name: "Andre Brooks", league: "NBA", pos: "Center", overall: 84, fit: 96, risk: "Moderate" },
];

const needs = {
  NFL: [
    ["CB", "Critical"], ["DL", "High"], ["OL", "Moderate"], ["WR", "Low"]
  ],
  NBA: [
    ["Rim Protection", "Critical"], ["Two-Way Wing", "High"],
    ["Bench Depth", "High"], ["Shooting", "Moderate"]
  ]
};

export default function App() {
  const [league, setLeague] = useState<League>("NFL");
  const [team, setTeam] = useState(teams.NFL[0]);
  const [question, setQuestion] = useState("What should we do this offseason?");

  const visiblePlayers = useMemo(
    () => players.filter(p => p.league === league),
    [league]
  );

  const changeLeague = (value: League) => {
    setLeague(value);
    setTeam(teams[value][0]);
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand"><span>🏆</span><div>SPORTS GM<small>AI FRONT OFFICE</small></div></div>
        <nav>
          {["Dashboard", "Players", "Contracts", "Trades", "Draft", "Scouting", "Analytics", "AI GM"].map((x, i) =>
            <button className={i === 0 ? "active" : ""} key={x}>{x}</button>
          )}
        </nav>
        <div className="sidebar-bottom">MVP 0.1<br/><span>Decision-support prototype</span></div>
      </aside>

      <main>
        <header>
          <div>
            <p className="eyebrow">FRONT OFFICE / OVERVIEW</p>
            <h1>{team}</h1>
          </div>
          <div className="selectors">
            <div className="segmented">
              <button className={league === "NFL" ? "selected" : ""} onClick={() => changeLeague("NFL")}>🏈 NFL</button>
              <button className={league === "NBA" ? "selected" : ""} onClick={() => changeLeague("NBA")}>🏀 NBA</button>
            </div>
            <select value={team} onChange={e => setTeam(e.target.value)}>
              {teams[league].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </header>

        <section className="hero">
          <div>
            <p className="eyebrow">AI FRONT OFFICE</p>
            <h2>What should we do next?</h2>
            <p>Combine roster needs, player value, team fit, contracts, risk and future flexibility.</p>
          </div>
          <div className="hero-mark">AI<br/><span>GM</span></div>
        </section>

        <section className="grid four">
          <Metric title="Team Rating" value="84" sub="Overall roster model" />
          <Metric title="Cap Space" value={league === "NFL" ? "$42M" : "$18M"} sub="Current flexibility" />
          <Metric title="Critical Needs" value={needs[league].filter(n => n[1] === "Critical").length.toString()} sub="Needs requiring attention" />
          <Metric title="Draft Capital" value={league === "NFL" ? "8 picks" : "4 picks"} sub="Current assets" />
        </section>

        <section className="grid main-grid">
          <div className="panel">
            <div className="panel-head"><div><p className="eyebrow">ROSTER ANALYSIS</p><h3>Priority Needs</h3></div><span className="pill">{league}</span></div>
            <div className="needs">{needs[league].map(([name, priority]) =>
              <div className="need" key={name}><span className={`dot ${priority.toLowerCase()}`}></span><strong>{name}</strong><span className="priority">{priority}</span></div>
            )}</div>
          </div>

          <div className="panel">
            <div className="panel-head"><div><p className="eyebrow">AI GM</p><h3>Decision Copilot</h3></div><span className="status">● LIVE MODEL</span></div>
            <div className="chat"><p className="question">Ask the front office anything.</p><div className="prompt">{question}</div>
            <div className="answer"><b>Analysis</b><p>The model would evaluate team needs, player fit, contract cost, risk and future flexibility before recommending a move.</p></div></div>
            <div className="ask"><input value={question} onChange={e => setQuestion(e.target.value)} /><button>Analyze →</button></div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-head"><div><p className="eyebrow">PLAYER DATABASE</p><h3>Players to Investigate</h3></div><button className="ghost">View all →</button></div>
          <div className="table">
            <div className="row head"><span>PLAYER</span><span>POS</span><span>OVERALL</span><span>TEAM FIT</span><span>RISK</span></div>
            {visiblePlayers.map(p => <div className="row" key={p.name}><span><b>{p.name}</b><small>{p.league}</small></span><span>{p.pos}</span><span className="score">{p.overall}</span><span className="score">{p.fit}</span><span><i className={`risk ${p.risk.toLowerCase()}`}>{p.risk}</i></span></div>)}
          </div>
        </section>

        <footer>AI Sports GM • Data → Analysis → Evaluation → Fit → Financials → Recommendation → GM Decision</footer>
      </main>
    </div>
  );
}

function Metric({ title, value, sub }: {title:string; value:string; sub:string}) {
  return <div className="metric"><span>{title}</span><strong>{value}</strong><small>{sub}</small></div>;
}
