import React, { useState } from 'react';
import "./Card.css";

const Card = ({ question, answer }) => {
  const [flipped, setFlipped] = useState(false);

  const toggleCard = () => {
    setFlipped(!flipped);
  };

  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={toggleCard}>
      <div className="card-inner">
        <div className="card-front">
          <p>{question}</p>
        </div>
        <div className="card-back">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
