import React, { useState } from 'react';

const Card = ({ card }) => {
  const [showBack, setShowBack] = useState(false);
    console.log(card);
  return (
    <div onClick={() => setShowBack(true)} className="card">
        <p>{card && card.front}</p>
        <p>{showBack && card.back}</p>
    </div>
  );
};

export default Card;
