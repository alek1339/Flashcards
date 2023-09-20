import React from 'react';
import { useSelector } from 'react-redux';
import HomeSidebar from '../../components/homeSidebar/HomeSidebar';

import './Home.scss';
import Sidebarcontainer from '../../components/sidebarContainer/Sidebarcontainer';
import MainContentContainer from '../../components/mainContentContainer/MainContentContainer';

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const decks = useSelector((state) => state.deck.decks);

  return (
    <div className='home-container'>
      <Sidebarcontainer><HomeSidebar /></Sidebarcontainer>

        <MainContentContainer>
          <div className='home-content'>
            <h1>Decks</h1>
            {user && decks && decks.map((deck) => (
              <div className='deck-container' key={deck._id}>
                <h3>{deck.name}</h3>
              </div>
            ))}
        </div>
        </MainContentContainer>

    </div>
  )
}

export default Home;