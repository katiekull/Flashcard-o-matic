import React from "react";
import Breadcrumb from "../Breadcrumb";
import DeckForm from "../Deck/DeckForm";

function CreateDeckPage() {
  return (
    <div>
      <Breadcrumb createMode />
      <h2>Create Deck</h2>
      <DeckForm />
    </div>
  );
}

export default CreateDeckPage;