import { shape, string, func } from "prop-types";

import "./Card.scss";

const Card = ({ card, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <p>{card && card.front}</p>
    </div>
  );
};

Card.propTypes = {
  card: shape({
    front: string,
    back: string,
  }),
  onClick: func,
};

export default Card;
