import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/ListCreation.css";
import FailureView from "../components/FailureView";
import ListSelector from "../components/ListSelector";
import ListCreator from "../components/ListCreator";
import { List_Creation_API_URL } from "../links";

function ListCreation() {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedLists, setSelectedLists] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newList, setNewList] = useState([]);
  const [tempListData, setTempListData] = useState([]);

  const fetchAllLists = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(`${List_Creation_API_URL}`);
      setListData(response.data.lists);
    } catch (error) {
      setError(true);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    fetchAllLists();
  }, []);

  const handleRetry = () => {
    fetchAllLists();
  };

  const toggleSelectList = (listNumber) => {
    if (selectedLists.includes(listNumber)) {
      setSelectedLists(selectedLists.filter((num) => num !== listNumber));
    } else {
      setSelectedLists([...selectedLists, listNumber]);
    }
  };

  const handleCreateNewList = () => {
    if (selectedLists.length !== 2) {
      alert("You should select exactly 2 lists to create a new list");
      return;
    }
    setIsCreating(true);
    setTempListData([...listData]);
  };

  const moveItem = (
    item,
    fromList,
    toList,
    setFromList,
    setToList,
    newListNumber
  ) => {
    const updatedItem = { ...item, list_number: newListNumber };

    setFromList((prevList) =>
      prevList.filter((listItem) => listItem.id !== item.id)
    );

    setToList((prevList) => [...prevList, updatedItem]);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setListData([...tempListData]);
    setNewList([]);
  };

  const handleUpdate = () => {
    setIsCreating(false);
    setTempListData([]);
  };

  const listNumber1 = listData.filter((list) => list.list_number === 1);
  const listNumber2 = listData.filter((list) => list.list_number === 2);

  if (loading) {
    return <div className="loader"></div>;
  }

  if (error) {
    return (
      <div className="failure-view">
        <FailureView handleRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="list-creation">
      {!isCreating ? (
        <ListSelector
          handleCreateNewList={handleCreateNewList}
          toggleSelectList={toggleSelectList}
          selectedLists={selectedLists}
          listNumber1={listNumber1}
          listNumber2={listNumber2}
        />
      ) : (
        <ListCreator
          listNumber1={listNumber1}
          listNumber2={listNumber2}
          newList={newList}
          moveItem={moveItem}
          setListData={setListData}
          setNewList={setNewList}
          handleCancel={handleCancel}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default ListCreation;
