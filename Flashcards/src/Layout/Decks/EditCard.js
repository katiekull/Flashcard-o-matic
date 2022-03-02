import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateCard, readDeck, readCard } from "../../utils/api/index.js";
import CardForm from "./CardForm.js";

function EditCard({ updateDecks }) {
  const [deck, setDeck] = useState([]);
  const [card, editCard] = useState({ front: "", back: "", deckId: "" });
  const { deckId, cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();

    const cardInfo = async () => {
      const response = await readCard(cardId, abortController.signal);
      editCard(() => response);
    };
    cardInfo();
    return () => abortController.abort();
  }, [cardId]);

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
    editCard({ ...card, [target.name]: target.value });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    await updateCard(card);
    history.push(`/decks/${deck.id}`);
    updateDecks(1);
  };

  return (
    <div style={{ fontFamily: "Space Grotesk" }} className="col-9 mx-auto">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-light shadow bg-white rounded pt-2 d-flex justify-content-start">
          {" "}
          <li className="breadcrumb-item">
            <Link to={"/"} style={{ color: "black" }}>
              <i
                className="fa fa-home"
                aria-hidden="true"
                style={{ color: "black" }}
              ></i>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`} style={{ color: "black" }}>
              Deck name
            </Link>
          </li>
          <li className="breadcrumb-item">
            Edit Card
          </li>
        </ol>
      </nav>

      <div className="row pl-3 pb-2">
        <h1>Edit Card</h1>
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

export default EditCard;