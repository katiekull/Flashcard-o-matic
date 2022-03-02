import React from "react";
import Deck from "./Deck";

function DeckList({ decks = [], deleteClick, deckButtonClick }) {
  const list =
    !!decks.length &&
    decks.map((deck) => (
      <Deck
        key={deck.id}
        deck={deck}
        deleteClick={deleteClick}
        deckButtonClick={deckButtonClick}
      />
    ));

  return (
    !!list && (
      <div className="container">
        <div className="row">{list}</div>
      </div>
    )
  );
}

export default DeckList;