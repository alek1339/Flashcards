import React from 'react'

const DeckDetail = ({deck, onBack}) => {
  return (
    <div>
        {deck && (
            <div>
            <h1>{deck.name}</h1>
            <button>Study</button>
            <button onClick={onBack}>Back to Decks</button>
          </div>
        )}
    </div>
  )
}

export default DeckDetail;