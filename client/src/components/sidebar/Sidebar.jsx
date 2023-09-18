import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';

import './Sidebar.scss';

const Sidebar = () => {
  return (
    <div className='sidebar-container'>
        <h1>Home</h1>
        <FontAwesomeIcon icon={faTable} /> Decks
    </div>
  )
}

export default Sidebar;