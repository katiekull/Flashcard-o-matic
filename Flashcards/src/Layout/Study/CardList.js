import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

function CardList({ cards }) {
  const [currentCard, setCurrentCard] = useState(0);
  const [frontSide, setFrontSide] = useState(true);
  const { deckId } = useParams();
  const history = useHistory();

  const nextHandler = () => {
    if (currentCard === cards.length - 1) {
      window.confirm(
        "Click OK to restart the deck, or CANCEL to return to the homepage."
      )
        ? setCurrentCard(() => 0)
        : history.push("/");

    } else {
      setCurrentCard((currentCard) => currentCard + 1);
      setFrontSide(() => !frontSide);
    }
  };

  const flipHandler = () => {
    setFrontSide(() => !frontSide);
  };

  if (cards.length > 2) {
    return (
      <div style={{ fontFamily: "Space Grotesk" }} className="row p-3">
        <div className="card w-100">
          <div className="card-body">
            <h5 className="card-title">
              Card {currentCard + 1} of {cards.length}
            </h5>

            <p className="card-text">
              {frontSide ? cards[currentCard].front : cards[currentCard].back}
            </p>

            <button onClick={flipHandler} className="btn btn-secondary mr-3">
              Flip
            </button>

            {frontSide ? null : (
              <button onClick={nextHandler} className="btn btn-primary">
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="row p-3" style={{ fontFamily: "Space Grotesk" }}>
        <div className="pl-4 pr-4 w-100">
          <div className="card-body">
            <div className="row pl-3 pb-2">
              <h1>Your Cards</h1>
            </div>
            <div className="card m-4 shadow p-2 mb-5 bg-white rounded">
              <div className="card-body">
                <h4 className="card-title d-flex justify-content-center pt-3">
                  Front of card
                </h4>

                <Link
                  to={`/decks/${deckId}/cards/new`}
                  className="btn d-flex justify-content-end"
                ></Link>
              </div>

              <button
                onClick={flipHandler}
                style={{ backgroundColor: "#6D1CBC" }}
                className="btn mb-4 mx-auto text-white pl-4 pr-4 pb-2 pt-2"
              >
                Flip
              </button>

            </div>
            <div className="card m-4 shadow p-2 mb-5 bg-white rounded">
              <div className="card-body">
                <h4 className="card-title d-flex justify-content-center pt-3">
                  Front of card
                </h4>

                <Link
                  to={`/decks/${deckId}/cards/new`}
                  className="btn d-flex justify-content-end"
                ></Link>
              </div>

              <button
                onClick={flipHandler}
                style={{ backgroundColor: "#6D1CBC" }}
                className="btn btn-light text-white border-dark mb-4 mx-auto pl-4 pr-4 pb-2 pt-2"
              >
                Flip
              </button>

            </div>

            <div className="card m-4 shadow p-2 mb-5 bg-white rounded">
              <div className="card-body">
                <h4 className="card-title d-flex justify-content-center pt-3">
                  Front of card
                </h4>

                <Link
                  to={`/decks/${deckId}/cards/new`}
                  className="btn d-flex justify-content-end"
                ></Link>
              </div>

              <button
                onClick={flipHandler}
                style={{ backgroundColor: "#6D1CBC" }}
                className="btn btn-light text-white border-dark mb-4 mx-auto pl-4 pr-4 pb-2 pt-2"
              >
                Flip
              </button>

            </div>
            <div className="card m-4 shadow p-2 mb-5 bg-white rounded">
              <div className="card-body">
                <h4 className="card-title d-flex justify-content-center pt-3">
                  Front of card
                </h4>

                <Link
                  to={`/decks/${deckId}/cards/new`}
                  className="btn d-flex justify-content-end"
                ></Link>
              </div>

              <button
                onClick={flipHandler}
                style={{ backgroundColor: "#6D1CBC" }}
                className="btn btn-light text-white border-dark mb-4 mx-auto pl-4 pr-4 pb-2 pt-2"
              >
                Flip
              </button>

            </div>
            <div className="row mx-auto w-75">
              <Link
                to={`/decks/new`}
                className="btn-lg btn mb-3 mx-auto pr-3"
                style={{ border: "2px solid #6D1CBC", color: "#6D1CBC" }}
              >
                Add Card
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardList;