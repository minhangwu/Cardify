import React, { useState } from "react";
import "./Editor.css";

function Editor({ flashcards, onSwitchMode, onCreate, onDelete }) {
  const [newFlashcard, setNewFlashcard] = useState({
    front: "",
    back: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFlashcard({ ...newFlashcard, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate(newFlashcard);
    setNewFlashcard({ front: "", back: "" });
  };

  return (
    <div className='editor'>
      <button className='switch-button' onClick={() => onSwitchMode(false)}>
        Go To Viewer
      </button>
      <table className='flashcard-table'>
        <thead>
          <tr>
            <th>Front</th>
            <th>Back</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {flashcards.map((flashcard) => {
            return (
              <tr key={flashcard.id}>
                <td>{flashcard.front}</td>
                <td>{flashcard.back}</td>
                <td>
                  <button
                    className='delete-button'
                    onClick={() => onDelete(flashcard.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <form className='add-form' onSubmit={handleSubmit}>
        <input
          className='input-field'
          type='text'
          name='front'
          placeholder='Front'
          value={newFlashcard.front}
          onChange={handleInputChange}
        />
        <input
          className='input-field'
          type='text'
          name='back'
          placeholder='Back'
          value={newFlashcard.back}
          onChange={handleInputChange}
        />
        <input className='submit-button' type='submit' value='Add' />
      </form>
    </div>
  );
}

export default Editor;
