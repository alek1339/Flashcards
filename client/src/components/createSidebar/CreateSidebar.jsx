import React from 'react';

import './CreateSidebar.scss';

const CreateSidebar = ({handleCreateDeckClick, handleCreateCardClick}) => {
  return (
    <div className='create-sidebar'>
        <ul>
            <li onClick={handleCreateDeckClick}>New Deck</li>
            <li onClick={handleCreateCardClick}>New Card</li>
        </ul>
    </div>
  )
}

export default CreateSidebar;