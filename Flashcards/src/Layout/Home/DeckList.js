import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api/index.js";

function DeckList({ deck, updateDecks }) {
  const { id, name, description, cards } = deck;
  const deckLength = cards.length;
  const history = useHistory();

  const deleteHandler = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this deck? You will not be able to recover it."
      )
    ) {
      await deleteDeck(id);
      updateDecks(-1);
      history.go(0);
    } else {
      history.go(0);
    }
  };

  return (
    <div
      className="card w-100 mb-4 border-dark"
      style={{ fontFamily: "Space Grotesk" }}
    >
      <div className="card-body mt-0 pl-2">
        <div className="text-decoration-underline font-weight-light">
          <div style={{ color: "#606060" }}>
            <h5
              className="card-title text-capitalize d-flex pl-3 justify-content-start"
              style={{ color: "black" }}
            >
              {name}
            </h5>
            <h6 className="d-flex card-text font-weight-light mb-0 ml-3">
              {description}
            </h6>
            <p className="text-left p-0 ml-3 mt-2">{deckLength} cards</p>
          </div>
        </div>

        <div className="row justify-content-center pl-4 container-fluid">
          <Link
            to={`/decks/${id}`}
            className="btn btn-sm btn-outline-secondary pt-2 pb-2 mr-2 mt-4 mb-4"
            style={{
              border: "3px solid #6D1CBC",
              backgroundColor: "#6D1CBC",
            }}
          >
            <i
              className="bi bi-eye-fill"
              style={{ color: "#ffffff" }}
              aria-hidden="true"
            ></i>
          </Link>
          <Link
            to={`/decks/${id}/study`}
            className="btn btn-sm btn-outline-secondary pt-2 pb-2 mr-2 mt-4 mb-4"
            style={{
              border: "3px solid #6D1CBC",
              backgroundColor: "#6D1CBC",
            }}
          >
            <i
              className="bi bi-book"
              style={{ color: "#ffffff" }}
              aria-hidden="true"
            ></i>
          </Link>
          <Link
            to={`/decks/${id}`}
            onClick={deleteHandler}
            name="delete"
            value={id}
            className="btn btn-sm btn-outline-secondary pt-2 pb-2 mr-2 mt-4 mb-4"
            style={{
              border: "3px solid #6D1CBC",
              backgroundColor: "#6D1CBC",
            }}          >
            <i
              className="bi bi-trash-fill"
              style={{ color: "#ffffff" }}
              aria-hidden="true"
            ></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DeckList;