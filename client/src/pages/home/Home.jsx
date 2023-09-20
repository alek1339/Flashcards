import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import HomeSidebar from '../../components/homeSidebar/HomeSidebar';
import UserDecks from '../../components/userDecks/UserDecks';
import Sidebarcontainer from '../../components/sidebarContainer/Sidebarcontainer';
import MainContentContainer from '../../components/mainContentContainer/MainContentContainer';
import DeckDetail from '../../components/deckDetail/DeckDetail';

import './Home.scss';

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const decks = useSelector((state) => state.deck.decks);

  // State to control whether to show DeckDetail or UserDecks
  const [showDeckDetail, setShowDeckDetail] = useState(false);

  // State to store the selected deck (for passing data to DeckDetail)
  const [selectedDeck, setSelectedDeck] = useState(null);

  // Function to handle clicking on a deck
  const handleDeckClick = (deck) => {
    setSelectedDeck(deck);
    setShowDeckDetail(true);
  };

  // Function to go back to UserDecks
  const handleBackToUserDecks = () => {
    setShowDeckDetail(false);
    setSelectedDeck(null);
  };

  return (
    <div className='home-container'>
      <Sidebarcontainer>
        <HomeSidebar />
      </Sidebarcontainer>

      <MainContentContainer>
        {showDeckDetail ? (
          <DeckDetail deck={selectedDeck} onBack={handleBackToUserDecks} />
        ) : (
          <UserDecks onDeckClick={handleDeckClick} />
        )}
      </MainContentContainer>
    </div>
  );
};

export default Home;
