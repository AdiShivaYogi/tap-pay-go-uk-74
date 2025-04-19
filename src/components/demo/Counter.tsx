import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-container">
      <h2>Demo Counter</h2>
      <div className="counter-display">{count}</div>
      <div className="counter-buttons">
        <button onClick={() => setCount(c => c + 1)}>Increment</button>
        <button onClick={() => setCount(c => c - 1)}>Decrement</button>
      </div>
      <style jsx>{`
        .counter-container {
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          max-width: 300px;
          margin: 20px auto;
          text-align: center;
        }
        .counter-display {
          font-size: 24px;
          margin: 15px 0;
          font-weight: bold;
        }
        .counter-buttons button {
          margin: 0 5px;
          padding: 8px 16px;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .counter-buttons button:hover {
          background: #0061d5;
        }
      `}</style>
    </div>
  );
}
