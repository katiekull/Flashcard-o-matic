import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import Breadcrumb from "../Breadcrumb";
import CardForm from "../decks-cards/CardForm";

function CreateCardPage({ deck, setDeck }) {
  const { deckId } = useParams();

  useEffect(() => {
    readDeck(deckId, new AbortController().abort()).then(setDeck);
  }, [deckId, setDeck]);

  return (
    <div>
      <Breadcrumb type="Add Card" deck={deck} />
      <h3>{deck.name}: Add Card</h3>
      <CardForm deckId={deckId} deck={deck} />
    </div>
  );
}

export default CreateCardPage;