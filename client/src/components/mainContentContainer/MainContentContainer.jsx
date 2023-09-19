import React from 'react';

import './MainContentContainer.scss';

const MainContentContainer = ({children}) => {
  return (
    <div className="main-content-container">
      {children}
    </div>
  )
}

export default MainContentContainer;