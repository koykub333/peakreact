import React, { useState, useEffect } from 'react';

function App() {
  const [playerData, setData] = useState(null);

  useEffect(() => {
    fetch("https://peakanalytics.onrender.com/players", {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  const [seasonData, setSeasonData] = useState(null);

  useEffect(() => {
    fetch("https://peakanalytics.onrender.com/playerSeasons", {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => setSeasonData(json))
      .catch(error => console.error(error));
  }, []);



  return (
    <div>
      { (playerData && seasonData) ? 
        <div>
        <h1>NHL Player Statistics</h1>
        <h1>Players</h1>
        <table>
          <thead>
            <tr>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Sweater Number</th>
              <th>Position</th>
              <th>PlayerID</th>
            </tr>
          </thead>
          <tbody>
            {playerData.map(player => ( 
              <tr key={player.playerId}>
                <td>{player.lastName.default}</td>
                <td>{player.firstName.default}</td>
                <td>{player.sweaterNumber}</td>
                <td>{player.positionCode}</td>
                <td>{player.playerId}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1>Player Seasons</h1>
        <table>
          <thead>
            <tr>
              <th>PlayerID</th>
              <th>Year</th>
              <th>Goals</th>
              <th>Assists</th>
              <th>Points</th>
              <th>Time On Ice</th>
              <th>Corsi For</th>
              <th>Corsi Against</th>
              <th>Fenwick For</th>
              <th>Fenwick Against</th>
              <th>Penalty Minutes</th>
              <th>Faceoff Wins</th>
              <th>Faceoff Losses</th>
            </tr>
          </thead>
          <tbody>
            {seasonData.map(season => ( 
              <tr key={season._id}>
                <td>{season.playerId}</td>
                <td>{season.year}</td>
                <td>{season.G}</td>
                <td>{season.A}</td>
                <td>{season.P}</td>
                <td>{season.TOI}</td>
                <td>{season.CF}</td>
                <td>{season.CA}</td>
                <td>{season.FF}</td>
                <td>{season.FA}</td>
                <td>{season.PIM}</td>
                <td>{season.FOW}</td>
                <td>{season.FOL}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      : 'Loading...'}
    </div>
  );
}

export default App;

