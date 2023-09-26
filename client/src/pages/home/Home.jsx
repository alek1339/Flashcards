import { useState } from 'react';
import HomeSidebar from '../../components/homeSidebar/HomeSidebar';
import UserDecks from '../../components/userDecks/UserDecks';
import Sidebarcontainer from '../../components/sidebarContainer/Sidebarcontainer';
import MainContentContainer from '../../components/mainContentContainer/MainContentContainer';
import DeckDetail from '../../components/deckDetail/DeckDetail';

import './Home.scss';

const Home = () => {
  const [showDeckDetail, setShowDeckDetail] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState(null);

  const handleDeckClick = (deck) => {
    setSelectedDeck(deck);
    setShowDeckDetail(true);
  };

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
