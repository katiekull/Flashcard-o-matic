import React from "react";

function AddCardsButton({ url, deckButtonClick }) {
  return <button onClick={() => deckButtonClick(url)}>Add Cards</button>;
}

export default AddCardsButton;