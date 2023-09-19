import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';

import './HomeSidebar.scss';

const Sidebar = () => {
  return (
    <>
        <h1>Home</h1>
        <FontAwesomeIcon icon={faTable} /> Decks
    </>
  )
}

export default Sidebar;