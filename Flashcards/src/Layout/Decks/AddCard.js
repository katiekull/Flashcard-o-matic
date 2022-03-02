import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api/index.js";
import CardForm from "./CardForm.js";

// create a component for adding a card to a deck that takes in
// the function updateDecks(newDecks) as a prop. this function
// takes the current number of decks, and returns it after adding
// the newly added decks

function AddCard() {
  const [deck, setDeck] = useState([]);
  const [card, addCard] = useState({ front: "", back: "", deckId: "" });
  const { deckId } = useParams();


  useEffect(() => {
    const abortController = new AbortController();

    const deckInfo = async () => {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(() => response);
    };

    deckInfo();
    return () => abortController.abort();
  }, [deckId]);


  const changeForm = ({ target }) => {
    addCard({ ...card, [target.name]: target.value });
  };

  const submitForm = (event) => {
    event.preventDefault();
    addCard({ ...card, deckId: deckId });
    createCard(deckId, card);
    console.log("'submitForm' saved");
    addCard({ front: "", back: "", deckId: "" });
  };

  return (
    <div className="col-9 mx-auto" style={{ fontFamily: "Space Grotesk" }}>
      {/*navigation bar */}
      <div className="row pl-4 pb-2">
        <h1>Add Card</h1>
      </div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-light shadow bg-white rounded pt-2 d-flex justify-content-start ml-4 mr-4 pr-4">
          {/* a link to the home page */}
          <li className="breadcrumb-item">
            <Link to={`/`}>
              <i
                className="fa fa-home"
                style={{ color: "black" }}
                aria-hidden="true"
              ></i>
            </Link>
          </li>

          {/* a link to the deck */}
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`} style={{ color: "black" }}>
              {/* Deck name */}
              {deck.name} 
            </Link>
          </li>

          {/* a link for adding a card */}
          <Link className="breadcrumb-item" to={`/decks/${deckId}/cards/new`} style={{ color: "black" }}> Add Card</Link>
        </ol>
      </nav>

      <div className="row  d-flex justify-content-start pb-2">
        {/* a heading that display's the deck's name and "add card" */}
        <h4>{deck.name}</h4>
      </div>

      <CardForm
        submitForm={submitForm}
        changeForm={changeForm}
        card={card}
        deckId={deckId}
      />
    </div>
  );
}


export default AddCard;