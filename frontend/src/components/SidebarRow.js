import React, { useState } from "react";
import "./SidebarRow.css";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

function SidebarRow({ collection, isSelected, onSelect, onSave, onDelete }) {
  const [newName, setNewName] = useState(collection.name);
  const [isEditing, setIsEditing] = useState(false);

  const handleRowClick = () => {
    onSelect(collection.id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    onDelete(collection.id);
  };

  const handleSaveClick = () => {
    // empty input checking
    if (newName.trim().length === 0) {
      setNewName(collection.name);
      setIsEditing(false);
    }

    onSave(collection.id, newName);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setNewName(collection.name);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handleBlur = (e) => {
    if (!e.relatedTarget || e.relatedTarget.tagName !== "BUTTON") {
      setNewName(collection.name);
      setIsEditing(false);
    }
  };

  return (
    <li
      className={`sidebar-row ${isSelected ? "selected" : ""}`}
      onClick={handleRowClick}
    >
      {isEditing ? (
        <div className='row-content'>
          <input
            autoFocus
            onBlur={handleBlur}
            value={newName}
            onChange={handleInputChange}
          />
          <div className='button-container'>
            <button className='row-button' onClick={handleSaveClick}>
              <CheckIcon />
            </button>
            <button className='row-button' onClick={handleCancelClick}>
              <CloseIcon />
            </button>
          </div>
        </div>
      ) : (
        <div className='row-content'>
          <span>{collection.name}</span>
          {isSelected && (
            <div className='button-container'>
              <button className='row-button' onClick={handleEditClick}>
                <EditNoteIcon />
              </button>
              <button className='row-button' onClick={handleDeleteClick}>
                <DeleteIcon />
              </button>
            </div>
          )}
        </div>
      )}
    </li>
  );
}

export default SidebarRow;
