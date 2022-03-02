import React from "react";
import { Link } from "react-router-dom";

// create a function for the card form that takes in props
// including the card, it's deck's id, the form's submit
// component, and the form's change component

function CardForm({ submitForm, changeForm, card, deckId }) {
  return (
    <form
      id="cardForm"
      onSubmit={submitForm}
      style={{ fontFamily: "Space Grotesk" }}
    >
      <div className="w-100 m-4">
        <div className="form-group">
          <label>Front</label>
          <textarea
            name="front"
            value={card.front}
            onChange={changeForm}
            id="front"
            className="form-control d-flex justify-content-start card w-100 mb-4 border-dark"
            placeholder="Enter a question"
            rows={4}
          />
        </div>

        <div className="form-group">
          <label>Back</label>
          <textarea
            name="back"
            value={card.back}
            onChange={changeForm}
            className="form-control card w-100 mb-4 border-dark"
            id="back"
            placeholder="Enter an answer"
            rows={4}
          />
        </div>
      </div>

      <Link
        to={`/decks/${deckId}`}
        name="cancel"
        className="btn mr-3 ml-4"
        style={{ border: "2px solid #6D1CBC", color: "#6D1CBC" }}
      >
        Done
      </Link>

      <button
        type="submit"
        className="btn btn-primary"
      >
        Save
      </button>
    </form>
  );
}

export default CardForm;