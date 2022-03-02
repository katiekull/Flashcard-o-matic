import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api/index.js";

function CreateDeck({ updateDecks }) {
  const [newDeck, setNewDeck] = useState({ name: "", description: "" });

  const history = useHistory();

  const changeForm = ({ target }) => {
    setNewDeck({ ...newDeck, [target.name]: target.value });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const response = await createDeck(newDeck);
    history.push(`/decks/${response.id}`);
    updateDecks(1);
  };

  // return a webpage containing the following content
  return (
    <div className="col-9 mx-auto" style={{ fontFamily: "Space Grotesk" }}>
      <div className="row pl-4 pb-2">
        <h1>Create Deck</h1>
      </div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-light shadow bg-white rounded pt-2 d-flex justify-content-start">
          <li className="breadcrumb-item" >
            <Link to={`/`}>
              <i
                className="fas fa-home"
                style={{ color: "black" }}
                aria-hidden="true"
              ></i>
            </Link>
          </li>

          <li className="breadcrumb-item">Create Deck</li>
        </ol>
      </nav>

      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>Name</label>

          <input
            type="text"
            name="name"
            value={newDeck.name}
            onChange={changeForm}
            id="name"
            className="form-control"
            placeholder="Deck Name"
          />
        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
            name="description"
            value={newDeck.description}
            onChange={changeForm}
            className="form-control"
            id="description"
            placeholder="Brief description of the deck."
            rows={4}
          />
        </div>

        <Link to={`/`} name="cancel" className="btn btn mr-3" style={{ border: "2px solid #6D1CBC", color: "#6D1CBC" }}>
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

export default CreateDeck;