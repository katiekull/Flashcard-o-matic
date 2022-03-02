import React from "react";
import { useParams } from "react-router-dom";

function Breadcrumb({ createMode = false, deck, type }) {
  const { deckId } = useParams();

  if (createMode) {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
    );
  }

  if (!type) {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
    );
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/">Home</a>
        </li>
        <li className="breadcrumb-item">
          <a href={`/decks/${deckId}`}>{deck.name}</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {type}
        </li>
      </ol>
    </nav>
  );
}

export default Breadcrumb;