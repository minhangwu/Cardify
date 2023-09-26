import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import axios from "axios";
import SidebarRow from "./SidebarRow";

const collectionApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/collections",
});

function Sidebar({ sellectedCollection, onSelect }) {
  const [collections, setCollections] = useState([]);

  const handleSelection = (index) => {
    onSelect(index);
  };

  const handleSave = async (collectionId, newName) => {
    try {
      // Send the PATCH request to update the item on the API using Axios
      await collectionApi.patch(`/${collectionId}/`, { name: newName });

      // Fetch the latest data after a successful PATCH request
      const newCollections = await fetchData();

      // Update the state with the new data
      setCollections(newCollections);
    } catch (error) {
      console.log("Error patching data: ", error);
    }
  };

  const handleAdd = async () => {
    try {
      await collectionApi.post("/", { name: "New Collection" });
      const newCollections = await fetchData();
      setCollections(newCollections);
    } catch (error) {
      console.log("Error creating data: ", error);
    }
  };

  const handleDelete = async (collectionId) => {
    try {
      // Send the DELETE request to delete the item on the API using Axios
      await collectionApi.delete(`/${collectionId}/`);

      // Fetch the latest data after a successful DELETE request
      const newCollections = await fetchData();

      // Update the state with the new data
      setCollections(newCollections);
    } catch (error) {
      console.log("Error deleting data: ", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await collectionApi.get("/");
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData()
      .then((data) => {
        setCollections(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className='sidebar'>
      <h2 className='heading'>Collections</h2>
      {collections.map((collection) => {
        return (
          <SidebarRow
            key={collection.id}
            collection={collection}
            isSelected={collection.id === sellectedCollection}
            onSelect={handleSelection}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        );
      })}
      <button className='new-collection-button' onClick={handleAdd}>
        New Collection
      </button>
    </div>
  );
}

export default Sidebar;
