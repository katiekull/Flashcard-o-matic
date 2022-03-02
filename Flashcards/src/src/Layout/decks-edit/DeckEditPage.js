import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import Breadcrumb from "../Breadcrumb";
import DeckForm from "../Deck/DeckForm";

function DeckEditPage({ deck, setDeck }) {
  const { deckId } = useParams();

  useEffect(() => {
    readDeck(deckId, new AbortController().abort()).then(setDeck);
  }, [deckId, setDeck]);

  return (
    <div>
      <Breadcrumb deck={deck} type="Edit Deck" />
      <h2>Edit Deck</h2>
      <DeckForm createMode={false} deck={deck} deckId={deckId} />
    </div>
  );
}

export default DeckEditPage;