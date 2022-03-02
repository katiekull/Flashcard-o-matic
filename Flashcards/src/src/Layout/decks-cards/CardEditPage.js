import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readCard, readDeck } from "../../utils/api";
import Breadcrumb from "../Breadcrumb";
import CardForm from "../decks-cards/CardForm";

function CardEditPage({ deck, setDeck }) {
  const [card, setCard] = useState({});
  const { deckId, cardId } = useParams();

  useEffect(() => {
    readDeck(deckId, new AbortController().abort()).then(setDeck);
  }, [deckId, setDeck]);

  useEffect(() => {
    readCard(cardId, new AbortController().abort()).then(setCard);
  }, [deck, cardId]);

  return (
    <div>
      <Breadcrumb deck={deck} type={`Edit Card ${cardId}`} />
      <h3>Edit Card</h3>
      <CardForm createMode={false} deckId={deckId} deck={deck} card={card} />
    </div>
  );
}

export default CardEditPage;