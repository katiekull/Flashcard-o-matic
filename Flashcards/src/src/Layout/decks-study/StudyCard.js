import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import AddCardsButton from "../Deck/DeckButtons/AddCardsButton";

function StudyCard({ cards, setCards, deck, routeButtonClick }) {
  const [index, setIndex] = useState(0);
  const [cardDisplay, setCardDisplay] = useState("");
  const [hasFlipped, setHasFlipped] = useState(false);
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    if (!deck.cards || !deck.cards.length) return;
    setCardDisplay(deck.cards[index].front);
  }, [deck, index]);

  const flipCard = () => {
    setHasFlipped(true);
    if (cardDisplay === deck.cards[index].front) {
      setCardDisplay(deck.cards[index].back);
    } else {
      setCardDisplay(deck.cards[index].front);
    }
  };

  const nextCard = () => {
    if (index === deck.cards.length - 1) {
      if (
        window.confirm(
          "Restart cards?\n\nClick 'cancel' to return to the home page."
        )
      ) {
        setIndex(0);
      } else {
        history.push("/");
      }
    } else {
      setIndex((previousIndex) => previousIndex + 1);
    }
  };

  const nextButton = hasFlipped && (
    <button onClick={() => nextCard()}>Next</button>
  );

  if (!!deck.cards && deck.cards.length <= 2) {
    return (
      <div>
        <h4>Not enough cards</h4>
        <p>
          You need at least 3 cards to study. There are {deck.cards.length}{" "}
          cards in this deck.
        </p>
        <AddCardsButton
          url={`/decks/${deckId}/cards/new`}
          deckButtonClick={routeButtonClick}
        />
      </div>
    );
  }

  return (
    !!deck.cards && (
      <div>
        <h4>
          Card {index + 1} of {deck.cards.length}
        </h4>
        <p>{cardDisplay}</p>
        <button onClick={() => flipCard()}>Flip</button>
        {nextButton}
      </div>
    )
  );
}

export default StudyCard;