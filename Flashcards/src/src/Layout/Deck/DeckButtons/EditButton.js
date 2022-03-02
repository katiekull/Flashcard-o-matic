import React from "react";

function EditButton({ url, deckButtonClick }) {
  return <button onClick={() => deckButtonClick(url)}>Edit</button>;
}

export default EditButton;