
import React from "react";

function ViewButton({ url, deckButtonClick }) {
  return <button onClick={() => deckButtonClick(url)}>View</button>;
}

export default ViewButton;