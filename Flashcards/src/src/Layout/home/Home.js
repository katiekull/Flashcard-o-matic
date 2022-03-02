import React from "react";
import DeckList from "../Deck/DeckList";
import { useHistory } from "react-router-dom";
import CreateDeckButton from "./CreateDeckButton";


function Home({ decks, setDecks, deleteClick, deckButtonClick }) {
  const history = useHistory();

  const createDeckClick = () => {
    history.push("/decks/new");
  };

  return (
    <div>
      <CreateDeckButton createDeckClick={createDeckClick} />
     
      <DeckList
        decks={decks}
        setDecks={setDecks}
        deleteClick={deleteClick}
        deckButtonClick={deckButtonClick}
      />
    </div>
  );
}

export default Home