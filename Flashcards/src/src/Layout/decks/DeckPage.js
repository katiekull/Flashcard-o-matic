import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch, Route, Switch } from "react-router-dom";
import StudyButton from "../Deck/DeckButtons/StudyButton";
import EditButton from "../Deck/DeckButtons/EditButton";
import AddCardsButton from "../Deck/DeckButtons/AddCardsButton";
import DeleteButton from "../Deck/DeckButtons/DeleteButton";
import { deleteCard, listCards, readDeck } from "../../utils/api";
import Breadcrumb from "../Breadcrumb";
import CardList from "./CardList";
import DeckStudyPage from "../decks-study/DeckStudyPage";
import DeckEditPage from "../decks-edit/DeckEditPage";
import CardRoute from "../decks-cards/CardRoute";

function DeckPage({ deleteDeckClick, routeButtonClick }) {
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([1]);
  const { deckId } = useParams();
  const { url, path } = useRouteMatch();

  useEffect(() => {
    readDeck(deckId, new AbortController().abort()).then(setDeck);
  }, [deckId, cards]);

  const deleteCardClick = (cardId) => {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      deleteCard(cardId, new AbortController().abort())
        .then(listCards(deck.id, new AbortController().abort()))
        .then(setCards);
      
    }
  };

  return (
    <Switch>
      <Route path={`${path}/study`}>
        <DeckStudyPage
          cards={cards}
          setCards={setCards}
          routeButtonClick={routeButtonClick}
          deck={deck}
          setDeck={setDeck}
        />
      </Route>
      <Route path={`${path}/edit`}>
        <DeckEditPage deck={deck} setDeck={setDeck} />
      </Route>
      {/* Added CardRoute to seperate cards page components and keep it all from being clumped up in DeckPage */}
      <Route path={`${path}/cards`}>
        <CardRoute deck={deck} setDeck={setDeck} />
      </Route>
      <Route>
        <Breadcrumb deck={deck} />
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <StudyButton url={`${url}/study`} deckButtonClick={routeButtonClick} />
        <EditButton url={`${url}/edit`} deckButtonClick={routeButtonClick} />
        <AddCardsButton
          url={`${url}/cards/new`}
          deckButtonClick={routeButtonClick}
        />
        <DeleteButton deleteDeckClick={deleteDeckClick} deckId={deck.id} />
        <CardList
          cards={deck.cards}
          deleteCardClick={deleteCardClick}
          cardButtonClick={routeButtonClick}
        />
      </Route>
    </Switch>
  );
}

export default DeckPage;