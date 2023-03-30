import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [seasonId, setSeasonId] = useState('');
  const [matches, setMatches] = useState([]);
  const [leagueTable, setLeagueTable] = useState([]);

  const fetchData = async () => {
    try {
      const matchDataResponse = await axios.get(
        `/api/matches/${dateRange.startDate}/${dateRange.endDate}`
      );
      setMatches(matchDataResponse.data);

      const leagueTableDataResponse = await axios.get(
        `/api/league-table/${seasonId}`
      );
      setLeagueTable(leagueTableDataResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Football Data</h1>
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={dateRange.startDate}
          onChange={(e) =>
            setDateRange({ ...dateRange, startDate: e.target.value })
          }
        />
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={dateRange.endDate}
          onChange={(e) =>
            setDateRange({ ...dateRange, endDate: e.target.value })
          }
        />
        <label htmlFor="seasonId">Season ID:</label>
        <input
          type="number"
          id="seasonId"
          value={seasonId}
          onChange={(e) => setSeasonId(e.target.value)}
        />
        <button onClick={fetchData}>Fetch Data</button>
      </div>
      <h2>Match Data</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id}>
              <td>{match.time.starting_at.date_time}</td>
              <td>{match.localTeam.name}</td>
              <td>{match.visitorTeam.name}</td>
              <td>{match.scores.localteam_score}-{match.scores.visitorteam_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>League Table</h2>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leagueTable.map((standing) => (
            <tr key={standing.team_id}>
              <td>{standing.team_name}</td>
              <td>{standing.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

