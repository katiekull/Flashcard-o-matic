import React from "react";
import EditButton from "../Deck/DeckButtons/EditButton";
import DeleteButton from "../Deck/DeckButtons/DeleteButton";
import { useRouteMatch } from "react-router-dom";

function Card({ card, deleteCardClick, cardButtonClick }) {
  const { url } = useRouteMatch();

  return (
    <div className="card col-12 col-md-4 rounded-0">
      <div className="card-body">
        <p>{card.front}</p>
        <p>
          <em>{card.back}</em>
        </p>
        <EditButton
          url={`${url}/cards/${card.id}/edit`}
          deckButtonClick={cardButtonClick}
        />
        <DeleteButton deleteCardClick={deleteCardClick} cardId={card.id} />
      </div>
    </div>
  );
}

export default Card;

