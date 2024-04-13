import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Main.css';

// Make sure the URL matches your server's URL
const socket = io('http://staging.freqtradehub.com:4000', {
    autoConnect: true // Prevents automatic connection
});

export const MainPage = () => {
  const [logs, setLogs] = useState('');

  useEffect(() => {
    // Connect manually to have more control
    socket.connect();

    // Handle connection
    socket.on('connect', () => {
      console.log('Connected to server');
      // Send a message right after connecting
      socket.emit('connectMessage', 'Hello, server! The client is now connected.');
    });

    // Listen for log messages from the server
    socket.on('log', (newLog) => {
      setLogs(prevLogs => `${prevLogs}\n${newLog}`);
    });

    // Cleanup function to disconnect and remove event listeners
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