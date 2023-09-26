import React, { useState } from "react";
import "./Viewer.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosNewIcon from "@mui/icons-material/ArrowForwardIos";

function Viewer({ flashcards, onSwitchMode }) {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handlePrevClick = () => {
    setIndex(index - 1);
    setIsFlipped(false);
  };

  const handleNextClick = () => {
    setIndex(index + 1);
    setIsFlipped(false);
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className='viewer'>
      <button className='switch-button' onClick={() => onSwitchMode(true)}>
        Go To Editor
      </button>
      <div className='flashcard-container'>
        <button className='flashcard' onClick={handleCardClick}>
          {isFlipped ? flashcards[index].back : flashcards[index].front}
        </button>
      </div>
      <div className='nav-container'>
        <button
          className='nav-button'
          disabled={index === 0}
          onClick={handlePrevClick}
        >
          <ArrowBackIosNewIcon />
        </button>
        <div className='page-indicator'>
          {index + 1}/{flashcards.length}
        </div>
        <button
          className='nav-button'
          disabled={index === flashcards.length - 1}
          onClick={handleNextClick}
        >
          <ArrowForwardIosNewIcon />
        </button>
      </div>
    </div>
  );
}

export default Viewer;
