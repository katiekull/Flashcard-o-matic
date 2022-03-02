import React from "react";

function DeleteButton({ deleteDeckClick, deleteCardClick, deckId, cardId }) {
  if (cardId) {
    return <button onClick={() => deleteCardClick(cardId)}>Delete</button>;
  }

  return (
    !!deckId && <button onClick={() => deleteDeckClick(deckId)}>Delete</button>
  );
}

export default DeleteButton;