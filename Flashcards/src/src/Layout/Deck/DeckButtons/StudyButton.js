import React from "react";

function StudyButton({ url, deckButtonClick }) {
  return <button onClick={() => deckButtonClick(url)}>Study</button>;
}

export default StudyButton;