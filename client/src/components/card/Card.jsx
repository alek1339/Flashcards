import { useState } from "react";
import { shape, string } from "prop-types";

const Card = ({ card }) => {
  const [showBack, setShowBack] = useState(false);

  return (
    <div onClick={() => setShowBack(true)} className="card">
      <p>{card && card.front}</p>
      <p>{showBack && card.back}</p>
    </div>
  );
};

Card.propTypes = {
  card: shape({
    front: string,
    back: string,
  }),
};

export default Card;
