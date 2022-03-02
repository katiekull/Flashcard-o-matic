import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck, updateDeck } from "../../utils/api";

function DeckForm({createMode=true, deck, deckId}) {
    const initialFormState = {
        name: "",
        description: "",
    };
    const [formState, setFormState] = useState(initialFormState);
    const {name, description} = formState;
    const history = useHistory();

    useEffect(() => {
        if (deck && deck.name && deck.description) {
            setFormState({name: deck.name, description: deck.description});
        }
    }, [deck]);

    const handleFormChange = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        async function createFormDeck(formState) {
            const {id} = await createDeck(formState, new AbortController().abort());
            history.push(`/decks/${id}`);
        }

        async function editFormDeck(formState) {
            await updateDeck({
                ...deck,
                name: formState.name,
                description: formState.description
            }, new AbortController().abort());
            history.push(`/decks/${deck.id}`);
            window.location.reload();
        }

        if(createMode) {
            createFormDeck(formState);
        } else {
            editFormDeck(formState);
        }
    }

    const handleCancel = () => {
        if (createMode) {
            history.push("/");
        } else {
            history.push(`decks/${deckId}`);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">
                Name
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Deck Name"
                    required
                    value={name}
                    onChange={handleFormChange}
                />
            </label>
            <br/>
            <label htmlFor="description">
                Description
            </label>
            <textarea
                id="description"
                name="description"
                placeholder="Brief description of the deck"
                required
                value={description}
                onChange={handleFormChange}
            >
            </textarea>
            <br/>
            <button onClick={() => handleCancel()}>Cancel</button>
            <button type="submit">Submit</button>
        </form>
    )
}

export default DeckForm;