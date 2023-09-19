import React from 'react';
import HomeSidebar from '../../components/homeSidebar/HomeSidebar';

import './Home.scss';
import Sidebarcontainer from '../../components/sidebarContainer/Sidebarcontainer';
import MainContentContainer from '../../components/mainContentContainer/MainContentContainer';

const Home = () => {
  return (
    <div className='home-container'>
      <Sidebarcontainer><HomeSidebar /></Sidebarcontainer>

        <MainContentContainer>
          <div className='home-content'>
            Home Content
        </div>
        </MainContentContainer>

    </div>
  )
}

export default Home;