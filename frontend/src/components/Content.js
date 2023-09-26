import axios from "axios";
import React, { useEffect, useState } from "react";
import Viewer from "./Viewer";
import Editor from "./Editor";
import "./Content.css";

const flashcardApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/flashcards",
});

function Content({ selectedCollection }) {
  const [flashcards, setFlashcards] = useState([]);
  const [isEditor, setIsEditor] = useState(true);

  const handleSwitchMode = (bool) => {
    setIsEditor(bool);
  };

  const handleCreate = async (newFlashcard) => {
    newFlashcard = { ...newFlashcard, collection: selectedCollection };
    try {
      await flashcardApi.post("/", newFlashcard);

      const newFlashcards = await fetchData();

      setFlashcards(newFlashcards);
    } catch (error) {
      console.log("Error deleting data: ", error);
    }
  };

  const handleDelete = async (flashcardId) => {
    try {
      // Send the DELETE request to delete the item on the API using Axios
      await flashcardApi.delete(`/${flashcardId}/`);

      // Fetch the latest data after a successful DELETE request
      const newFlashcards = await fetchData();

      // Update the state with the new data
      setFlashcards(newFlashcards);
    } catch (error) {
      console.log("Error deleting data: ", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await flashcardApi.get(
        `/?collection_id=${selectedCollection}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    // skip when no selected collection
    if (!selectedCollection) {
      return;
    }

    fetchData()
      .then((data) => {
        setFlashcards(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    setIsEditor(true);
  }, [selectedCollection]);

  return (
    <div className='content'>
      {selectedCollection ? (
        <div className='app-container'>
          {isEditor ? (
            <Editor
              flashcards={flashcards}
              onSwitchMode={handleSwitchMode}
              onCreate={handleCreate}
              onDelete={handleDelete}
            />
          ) : (
            <Viewer flashcards={flashcards} onSwitchMode={handleSwitchMode} />
          )}
        </div>
      ) : (
        <div className="className='no-collection-selected'">
          No colletion selected.
        </div>
      )}
    </div>
  );
}

export default Content;
