import React, { useState } from "react";
import "./MainPage.css";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";

function MainPage() {
  const [selectedCollection, setSelectedCollection] = useState(null);

  const handleSelection = (index) => {
    setSelectedCollection(index);
  };

  return (
    <div className='main-page'>
      <Sidebar
        sellectedCollection={selectedCollection}
        onSelect={handleSelection}
      />
      <Content selectedCollection={selectedCollection} />
    </div>
  );
}

export default MainPage;
