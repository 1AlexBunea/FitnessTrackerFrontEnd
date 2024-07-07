import React, { useState } from 'react';
import './Header.css';

interface HeaderProps {
  displayPage: (page: number) => void;
}

const Header: React.FC<HeaderProps> = ({ displayPage }) => {
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);

  const toggleOffCanvas = () => {
    setIsOffCanvasOpen(!isOffCanvasOpen);
  };

  return (
    <div className="header-container">
      <div className="header-content">
        <button className='header-button' onClick={() => displayPage(0)}>
          <img className="image-button" src="/dumbbell.png" alt="GitHub" style={{height:30, width:30}}/>
        </button>   
        <button className="header-button" onClick={() => displayPage(1)}>Account</button>
        <button className="menu-button" onClick={toggleOffCanvas}>Menu</button>
      </div>
      {isOffCanvasOpen && (
        <>
          <div className="overlay" onClick={toggleOffCanvas}></div>
          <div className="off-canvas slide-in-right">
            <button className='close-button' onClick={toggleOffCanvas}>Close</button>
            <div>
              <button className='header-button' onClick={() => displayPage(0)}>
                <img className="image-button" src="/dumbbell.png" alt="GitHub" style={{height:30, width:30}}/>
              </button>   
              <button className="header-button" onClick={() => displayPage(1)}>Account</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
