import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

// ASCII art frames for animation
const CAT_FRAMES = [
   `
      /\\_/\\
     / o o \\           _ 
   >( =_Y_= )<        | |
      =====           / /
    /   o  \\_________/ /
    |                  |
    |  /\\   _____      |
    | |  | |     | | | |
    |_|  |_|     |_| |_|
    `,
   `
      /\\_/\\
     / > < \\           _ 
   >( =_Y_= )<        | |
      =====           / /
    /   o  \\_________/ /
    |                  |
    |  /\\   _____      |
    | |  | |     | | | |
    |_|  |_|     |_| |_|
  `,
];

const MAX_BAR_LENGTH = 20; // Both bars same length
const MAX_HUNGER = MAX_BAR_LENGTH;
const MAX_HAPPINESS = MAX_BAR_LENGTH;
const HUNGER_DECREASE_INTERVAL = 400; // ms
const HAPPINESS_DECREASE_INTERVAL = 300; // ms (faster than hunger)

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function App() {
  const [hunger, setHunger] = useState(MAX_HUNGER);
  const [happiness, setHappiness] = useState(MAX_HAPPINESS);
  const [input, setInput] = useState('');
  const [catFrame, setCatFrame] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  // Animate cat with random blink timing
  useEffect(() => {
    if (gameOver) return;
    let blinkTimeout;
    let blinkInterval;

    function scheduleBlink() {
      // Hold open-eye frame for 2-5 seconds randomly
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);
        setCatFrame(1); // blink frame
        // Blink lasts 0.5s
        blinkInterval = setTimeout(() => {
          setIsBlinking(false);
          setCatFrame(0); // open-eye frame
          scheduleBlink();
        }, 200);
      }, 1000 + Math.random() * 2000);
    }

    setCatFrame(0);
    setIsBlinking(false);
    scheduleBlink();

    return () => {
      clearTimeout(blinkTimeout);
      clearTimeout(blinkInterval);
    };
  }, [gameOver]);

  // Decrease hunger
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setHunger(h => {
        if (h <= 1) {
          setGameOver(true);
          setMessage('Your cat starved!');
          return 0;
        }
        return h - 1;
      });
    }, HUNGER_DECREASE_INTERVAL);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Decrease happiness
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setHappiness(h => {
        if (h <= 1) {
          setGameOver(true);
          setMessage('Your cat got too sad. It has died.');
          return 0;
        }
        return h - 1;
      });
    }, HAPPINESS_DECREASE_INTERVAL);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, [gameOver]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (gameOver) return;
    const cmd = input.trim().toLowerCase();
    if (cmd === 'feed') {
      setHunger(h => clamp(h + 5, 0, MAX_HUNGER));
      setMessage('You fed your cat.');
    } else if (cmd === 'pet') {
      setHappiness(h => clamp(h + 3, 0, MAX_HAPPINESS));
      setMessage('You pet your cat.');
    } else if (cmd) {
      setMessage('Unknown command. Try "feed" or "pet".');
    }
    setInput('');
  };

  const handleRestart = () => {
    setHunger(MAX_HUNGER);
    setHappiness(MAX_HAPPINESS);
    setGameOver(false);
    setMessage('');
    setInput('');
    setCatFrame(0);
    inputRef.current?.focus();
  };

  // Render stat bars
  const renderBar = (label, value, max) => (
    <div className="stat-row">
      <span>{label}:</span>
      <span
        className="bar"
        style={{
          fontFamily: 'inherit',
          letterSpacing: '0',
          display: 'inline-block',
          width: `${max + 2}ch`, // +2 for brackets
          textAlign: 'left',
        }}
      >
        {'[' + 'X'.repeat(value) + '\u00A0'.repeat(max - value) + ']'}
      </span>
    </div>
  );

  return (
    <div className="terminal-outer">
      <div className="terminal-window">
        <div className="terminal-title">DIGI-CAT <span className="close-btn">x</span></div>
        <div className="terminal-content">
          <div>
            {renderBar('Hunger', hunger, MAX_HUNGER)}
            {renderBar('Happiness', happiness, MAX_HAPPINESS)}
          </div>
          <div className="cat-art-wrapper">
            <pre className="cat-art">{CAT_FRAMES[catFrame]}</pre>
          </div>
          <div className="message" style={{ minHeight: '1.5em', visibility: message ? 'visible' : 'hidden' }}>
            {message || ' '}
          </div>
          <div style={{ minHeight: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70px' }}>
              <div style={{ visibility: gameOver ? 'visible' : 'hidden', height: gameOver ? 'auto' : 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="game-over">Game Over</div>
                <button style={{ marginTop: 8 }} onClick={handleRestart}>Restart</button>
              </div>
            </div>
          </div>
          <div className="bottom-bar">
            {!gameOver && (
              <form className="command-row" onSubmit={handleCommand}>
                <span>Enter command:</span>
                <input
                  ref={inputRef}
                  className="command-input"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  autoComplete="off"
                  disabled={gameOver}
                />
              </form>
            )}
            <div className="commands">Commands: &lt;feed&gt; &lt;pet&gt;</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
