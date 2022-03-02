import React from "react";
import Card from "./Card";

function CardList({ cards = [], deleteCardClick, cardButtonClick }) {
  const list =
    !!cards.length &&
    cards.map((card) => {
      if (card && card.id) {
        return (
          <Card
            key={card.id}
            card={card}
            deleteCardClick={deleteCardClick}
            cardButtonClick={cardButtonClick}
          />
        );
      }
      return null;
    });

  return (
    !!list && (
      <div className="container">
        <h3>Cards</h3>
        <div className="row">{list}</div>
      </div>
    )
  );
}

export default CardList;