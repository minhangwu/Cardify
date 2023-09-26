import axios from "axios";
import React, { useEffect, useState } from "react";

function Content({ selectedCollection }) {
  const [flashcards, setFlashcards] = useState([]);

  const fetchData = () => {
    if (!selectedCollection) {
      return;
    }
    axios
      .get(
        `http://127.0.0.1:8000/api/flashcards/?collection_id=${selectedCollection}`
      )
      .then((response) => {
        setFlashcards(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  };

  useEffect(fetchData, [selectedCollection]);

  return (
    <div>
      {selectedCollection
        ? flashcards.map((flashcard) => {
            return <div key={flashcard.id}>{flashcard.front}</div>;
          })
        : "No collection is selected."}
    </div>
  );
}

export default Content;
