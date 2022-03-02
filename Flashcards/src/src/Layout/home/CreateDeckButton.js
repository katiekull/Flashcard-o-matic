import React from "react"

function CreateDeckButton({ createDeckClick }){
    return (
        <button onClick={() => createDeckClick()}>+Create Deck</button>
    )
}
export default CreateDeckButton