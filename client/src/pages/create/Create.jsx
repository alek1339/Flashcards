import React, { useState } from 'react';
import CreateDeck from '../../components/createDeck/CreateDeck';
import CreateCard from '../../components/createCard/CreateCard';
import Sidebarcontainer from '../../components/sidebarContainer/Sidebarcontainer';
import CreateSidebar from '../../components/createSidebar/CreateSidebar';
import MainContentContainer from '../../components/mainContentContainer/MainContentContainer';

const Create = () => {
    const [isCreateDeckVisible, setIsCreateDeckVisible] = useState(false);
    const [isCreateCardVisible, setIsCreateCardVisible] = useState(false);

    const handleCreateDeckClick = () => {
        setIsCreateDeckVisible(true);
        setIsCreateCardVisible(false);
    }

    const handleCreateCardClick = () => {
        setIsCreateCardVisible(true);
        setIsCreateDeckVisible(false);
    }

  return (
    <div>
        <Sidebarcontainer>
            <CreateSidebar handleCreateDeckClick={handleCreateDeckClick} handleCreateCardClick={handleCreateCardClick} />
        </Sidebarcontainer>
        <MainContentContainer>
            {isCreateDeckVisible && <CreateDeck />}
            {isCreateCardVisible && <CreateCard />}
        </MainContentContainer>
     </div>
  )
}

export default Create