import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Main.css';

const socket = io('http://localhost:3000');

export const MainPage = () => {
  const [logs, setLogs] = useState('');

  useEffect(() => {
    console.log('Setting up socket connections and listeners');

    socket.connect();
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('log', (newLog) => {
      console.log(`Received new log: ${newLog}`); // Ensure you see this in the console
      setLogs(prevLogs => `${prevLogs}\n${newLog}`);
    });

    return () => {
      socket.off('connect');
      socket.off('log');
      socket.disconnect();
    };
  }, []);

  return (
    <div className="container">
      <main>
        <h2 className="welcome-title">Welcome to Nodelauncher</h2>
        <h3 className="welcome-subtitle">Node status:</h3>
        <textarea className="log-textarea" value={logs} readOnly rows="20" cols="80" />
        <div className="buttons">
          <button className="button button-filled" onClick={() => socket.connect()}>
            Connect
          </button>
          <button className="button button-outline" onClick={() => socket.disconnect()}>
            Disconnect
          </button>
        </div>
      </main>
    </div>
  );
};
