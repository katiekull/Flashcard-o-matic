import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {listDecks} from "../utils/api/index";
import DeckList from "./Decks/DeckList";

function Home({updateDecks, deckLength}) {
    const [decks, setDecks] = useState([]);
    useEffect(() => {
      const abortController = new AbortController();
      async function getDeck() {
        try {
          const getDeckFromAPI = await listDecks(abortController.signal);
          setDecks(() => getDeckFromAPI);
        } catch (error) {
          console.log(error)
        }
      }
      getDeck();
      return () => abortController.abort();
    },[deckLength]);
  
  return (
    <div>
      <div className="row mx-auto">
        <Link to="/decks/new" className="btn btn-secondary w-25 mb-3">
         Create Deck
        </Link>
      </div>
      <div className="row w-100 mx-auto">
        {decks.map((deck) => (
          <DeckList key={deck.id} deck={deck} updateDecks={updateDecks}/>
        ))}
      </div>  
    </div>  
  )
}

export default Home;