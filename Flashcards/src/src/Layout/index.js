import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./home/Home";
import { Switch, Route, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";
import DeckPage from "./decks/DeckPage";
import CreateDeckPage from "./decks-new/CreateDeckPage";

function Layout() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    listDecks(new AbortController().abort()).then(setDecks);

    return () => abortController.abort();
  }, []);

  const routeButtonClick = (url) => {
    history.push(url);
  };

  const deleteDeckClick = (deckId) => {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      deleteDeck(deckId, new AbortController().abort())
        .then(listDecks(new AbortController().abort()))
        .then(setDecks)
        .then(history.push("/"))
        .then(window.location.reload());
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home
              decks={decks}
              setDecks={setDecks}
              deleteClick={deleteDeckClick}
              deckButtonClick={routeButtonClick}
            />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeckPage />
          </Route>
          <Route path="/decks/:deckId">
            <DeckPage
              deleteDeckClick={deleteDeckClick}
              routeButtonClick={routeButtonClick}
            />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;