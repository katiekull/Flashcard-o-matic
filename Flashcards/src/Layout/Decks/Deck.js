import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard, readDeck } from "../../utils/api/index.js";
import { deleteDeck } from "../../utils/api/index.js";

// create a function that retrieves an updated deck's id,
// fetches it's card data, and sets the deck's useState to
// contain it's content
function Deck({ updateDecks }) {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
  const history = useHistory();
  const { url } = useRouteMatch();
  const { id, name, description, cards } = deck;

  useEffect(() => {
    const abortController = new AbortController();
    const deckInfo = async () => {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(() => response);
    };
    deckInfo();
    return () => abortController.abort();
  }, [deckId]);

  const deleteHandler = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this deck? You will not be able to recover it."
      )
    ) {
      await deleteDeck(id);
      updateDecks(-1);
      history.push("/");
    } else {
      history.go(0);
    }
  };

  // if there is no deck or no cards, return the following webpage
  // that displays "loading..."
  if (!deck || !cards) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      // if a deck or cards are present, return a webpage with the following content
    );
  } else {
    return (
      <div style={{ fontFamily: "Space Grotesk" }}>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-light shadow bg-white rounded pt-2 d-flex justify-content-start">
            {" "}
            <li className="breadcrumb-item">
              <Link to={`/`}>
                <i
                  className="fas fa-home"
                  style={{ color: "black" }}
                  aria-hidden="true"
                ></i>
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`} style={{ color: "black" }}>
                {name}
              </Link>
            </li>
            <li className="breadcrumb-item">Cards</li>
          </ol>
        </nav>

        <div className="card border-0 mb-4">
          <div className="card-body">
            <div className="row">
              <h5 className="card-title ml-3">{name}</h5>
            </div>

            {/* deck description */}
            <p className="card-text">{description}</p>

            <div className="row justify-content-end">
              {/* edit button */}
              <Link
                to={`/decks/${id}/edit`}
                className="btn btn-sm pt-2"
                style={{
                  border: "3px solid #6D1CBC",
                  backgroundColor: "#6D1CBC",
                }}
              >
                <i
                  aria-hidden="true"
                  style={{ color: "#ffffff" }}
                  className="bi bi-pencil-fill"
                ></i>
              </Link>

              {/* study button */}
              <Link
                to={`/decks/${id}/study`}
                className="btn btn-sm btn-outline-secondary ml-2 pt-2"
                style={{
                  border: "3px solid #6D1CBC",
                  backgroundColor: "#6D1CBC",
                }}
              >
                <i className="bi bi-book" style={{ color: "#ffffff" }}></i>
              </Link>

              {/* add cards button */}
              <Link
                to={`/decks/${id}/cards/new`}
                className="btn btn-sm btn-outline-secondary pt-2 ml-2"
                style={{
                  border: "3px solid #6D1CBC",
                  backgroundColor: "#6D1CBC",
                }}
              >
                <i
                  className="fa fa-plus"
                  style={{ color: "#ffffff" }}
                  aria-hidden="true"
                ></i>
              </Link>

              {/* delete button */}
              <button
                onClick={deleteHandler}
                name="delete"
                value={id}
                className="btn btn-sm btn-outline-secondary p-1 ml-2"
                style={{
                  border: "3px solid #6D1CBC",
                  backgroundColor: "#6D1CBC",
                }}
              >
                <i
                  className="fa fa-trash p-2"
                  style={{ color: "#ffffff" }}
                  aria-hidden="true"
                ></i>
              </button>
            </div>
          </div>
        </div>

        <div className="row pl-4 pb-2">
          <h1>Cards</h1>
        </div>

        {cards.map((card, index) => (
          <div className="row d-flex justify-content-center" key={index}>
            <div className="card col-sm-5 m-4">
              <div className="row card-body">
                {/* front */}
                <h4 className="col-6 card-text">{card.front}</h4>
              </div>

              <div className="d-flex justify-content-end pl-4">
                {/* edit button */}
                <Link
                  to={`${url}/cards/${card.id}/edit`}
                  className="btn btn-sm btn-outline-secondary pt-2 pb-2 mr-2 mt-4 mb-4"
                  style={{
                    border: "3px solid #6D1CBC",
                    backgroundColor: "#6D1CBC",
                  }}
                >
                  <i
                    aria-hidden="true"
                    style={{ color: "#ffffff" }}
                    className="bi bi-pencil-fill"
                  ></i>
                </Link>

                <Link
                  onClick={async () => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this card? You will not be able to recover it."
                      )
                    ) {
                      await deleteCard(card.id);
                      updateDecks(-1);
                      history.go(0);
                    } else {
                      history.go(0);
                    }
                  }}
                  name="deleteCard"
                  value={card.id}
                  className="btn btn-sm btn-outline-secondary pt-2 pb-1 mr-2 mt-4 mb-4"
                  style={{
                    border: "3px solid #6D1CBC",
                    backgroundColor: "#6D1CBC",
                  }}
                >
                  <i
                    aria-hidden="true"
                    style={{ color: "#ffffff" }}
                    className="fa fa-trash"
                  ></i>{" "}
                </Link>
              </div>
            </div>
            <div className="card col-sm-5 m-4">
              <div className="row card-body">
                {/* front */}

                {/* back */}
                <h4 className="col-6 card-text">{card.back}</h4>
              </div>

              <div className="d-flex justify-content-end pl-4">
                {/* edit button */}
                <Link
                  to={`${url}/cards/${card.id}/edit`}
                  className="btn btn-sm btn-outline-secondary pt-2 pb-2 mr-2 mt-4 mb-4"
                  style={{
                    border: "3px solid #6D1CBC",
                    backgroundColor: "#6D1CBC",
                  }}
                >
                  <i
                    aria-hidden="true"
                    style={{ color: "#ffffff" }}
                    className="bi bi-pencil-fill"
                  ></i>
                </Link>

                <Link
                  onClick={async () => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this card? You will not be able to recover it."
                      )
                    ) {
                      await deleteCard(card.id);
                      updateDecks(-1);
                      history.go(0);
                    } else {
                      history.go(0);
                    }
                  }}
                  name="deleteCard"
                  value={card.id}
                  className="btn btn-sm btn-outline-secondary pt-2 pb-2 mr-2 mt-4 mb-4"
                  style={{
                    border: "3px solid #6D1CBC",
                    backgroundColor: "#6D1CBC",
                  }}
                >
                  <i
                    aria-hidden="true"
                    style={{ color: "#ffffff" }}
                    className="fa fa-trash"
                  ></i>{" "}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Deck;
