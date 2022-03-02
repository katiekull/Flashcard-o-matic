import React from "react";
import Header from "./Header";
import Home from "./Home";
import Study from "./Study";
import CreateDeck from "./Decks/CreateDeck";
import Deck from "./Decks/Deck";
import EditDeck from "./Decks/EditDeck";
import AddCard from "./Decks/AddCard";
import EditCard from "./Decks/EditCard";
import NotFound from "./NotFound";
import { Switch, Route } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>  
          <Route path="/decks/:deckId/study">
            <Study />
          </Route> 
          <Route path="/decks/new">
            <CreateDeck />
          </Route> 
          <Route path="/decks/:deckId">
            <Deck />
          </Route> 
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route> 
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route> 
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
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
