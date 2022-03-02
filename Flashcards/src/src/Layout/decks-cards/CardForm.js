import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createCard, updateCard } from "../../utils/api";

function CardForm({ createMode = true, deck, deckId, card }) {
  const initialFormState = {
    front: "",
    back: "",
  };
  const [formState, setFormState] = useState(initialFormState);
  const { front, back } = formState;
  const history = useHistory();

  useEffect(() => {
    if (card && card.front && card.back) {
      setFormState({ front: card.front, back: card.back });
    }
  }, [card]);

  const handleFormChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    async function createFormCard(formState) {
      await createCard(deckId, formState, new AbortController().abort());
      setFormState({ ...initialFormState });
    }

    async function editFormCard(formState) {
      await updateCard(
        {
          ...card,
          front: formState.front,
          back: formState.back,
        },
        new AbortController().abort()
      );
      history.push(`/decks/${deck.id}`);
      window.location.reload();
    }

    if (createMode) {
      createFormCard(formState);
    } else {
      editFormCard(formState);
    }
  };

  const handleDone = () => {
    if (createMode) {
      history.push(`/decks/${deckId}`);
      window.location.reload();
    } else {
      history.push(`/decks/${deckId}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="front">Front</label>
      <textarea
        id="front"
        name="front"
        required
        value={front}
        onChange={handleFormChange}
      ></textarea>
      <br />
      <label htmlFor="back">Back</label>
      <textarea
        id="back"
        name="back"
        required
        value={back}
        onChange={handleFormChange}
      ></textarea>
      <br />
      <button onClick={() => handleDone()}>Done</button>
      <button type="submit">Save</button>
    </form>
  );
}

export default CardForm;