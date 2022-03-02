import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api/index.js";

function EditDeck({ updateDecks }) {
  const [deck, editDeck] = useState({ name: "", description: "" });
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();

    const deckInfo = async () => {
      const response = await readDeck(deckId, abortController.signal);
      editDeck(() => response);
    };

    deckInfo();

    return () => abortController.abort();
  }, [deckId]);

  const changeForm = ({ target }) => {
    editDeck({ ...deck, [target.name]: target.value });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const response = await updateDeck(deck);
    history.push(`/decks/${response.id}`);
    updateDecks(1);
  };

  if (!deck) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  } else {
    return (
      <div style={{ fontFamily: "Space Grotesk" }} className="col-9 mx-auto">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-light shadow bg-white rounded pt-2 d-flex justify-content-start">
            {" "}
            <li className="breadcrumb-item">
              <Link to={`/`} style={{ color: "black" }}>
                <i className="fa fa-home" aria-hidden="true"></i>
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`} style={{ color: "black" }}>
                Deck name
              </Link>
            </li>
            <li className="breadcrumb-item">Edit Deck</li>
          </ol>
        </nav>

        <div className="row pl-3 pb-2">
          <h1>Edit Deck</h1>
        </div>

        <form onSubmit={submitForm}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={deck.name}
              onChange={changeForm}
              id="name"
              className="form-control"
              placeholder={deck.name}
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              value={deck.description}
              onChange={changeForm}
              className="form-control"
              id="description"
              placeholder={deck.description}
              rows={4}
            />
          </div>

          <Link
            to={`/decks/${deckId}`}
            name="cancel"
            className="btn mr-3"
            style={{ border: "2px solid #6D1CBC", color: "#6D1CBC" }}
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="btn text-white"
            style={{ backgroundColor: "#6D1CBC" }}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default EditDeck;