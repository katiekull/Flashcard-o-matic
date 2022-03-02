import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import CreateCardPage from "../decks-cards/CreateCardPage";
import CardEditPage from "../decks-cards/CardEditPage";
import NotFound from "../NotFound";

function CardRoute({ deck, setDeck }) {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/new`}>
        <CreateCardPage deck={deck} setDeck={setDeck} />
      </Route>
      <Route path={`${path}/:cardId/edit`}>
        <CardEditPage deck={deck} setDeck={setDeck} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default CardRoute;