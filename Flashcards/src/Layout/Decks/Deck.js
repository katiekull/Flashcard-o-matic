import React, {useEffect, useState} from "react";
import {Link, useParams, useHistory, useRouteMatch} from "react-router-dom";
import {deleteCard, readDeck, deleteDeck} from "../../utils/api/index";

function Deck() {
  const [deck, setDeck] = useState([]);
  const {deckId} = useParams();
  const history = useHistory();
  const {url} = useRouteMatch();
  const {id, name, description, cards} = deck;

  useEffect(() => {
      const abortController = new AbortController();
      const deckInfo = async() => {
          const response = await readDeck(deckId, abortController.signal);
          setDeck(() => response);
      };
      deckInfo();
      return() => abortController.abort();
  },[deckId]);

  
}

export default Deck;