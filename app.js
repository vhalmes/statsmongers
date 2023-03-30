const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.SPORTMONKS_API_KEY;

app.get('/', (req, res) => {
  res.send('Hello FootballingWorld!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const fetchMatchData = async (date) => {
  const url = `https://soccer.sportmonks.com/api/v2.0/fixtures/date/${date}?api_token=${API_KEY}&include=localTeam,visitorTeam,goals,substitutions,referee,lineup`;
  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching match data:', error);
    return [];
  }
};

const fetchLeagueTableData = async (seasonId) => {
  const url = `https://soccer.sportmonks.com/api/v2.0/standings/season/${seasonId}?api_token=${API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching league table data:', error);
    return [];
  }
};

app.get('/api/matches/:date', async (req, res) => {
  const date = req.params.date;
  const matchData = await fetchMatchData(date);
  res.json(matchData);
});

app.get('/api/league-table/:seasonId', async (req, res) => {
  const seasonId = req.params.seasonId;
  const leagueTableData = await fetchLeagueTableData(seasonId);
  res.json(leagueTableData);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
