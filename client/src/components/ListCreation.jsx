import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/ListCreation.css";

function ListCreation() {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedLists, setSelectedLists] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newList, setNewList] = useState([]);
  const [tempListData, setTempListData] = useState([]);

  useEffect(() => {
    const fetchAllLists = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(
          "https://apis.ccbp.in/list-creation/lists"
        );
        setListData(response.data.lists);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAllLists();
  }, []);

  const handleRetry = () => {
    setError(false);
    setLoading(true);
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

  const moveItem = (item, fromList, toList, setFromList, setToList) => {
    setFromList((prevList) =>
      prevList.filter((listItem) => listItem.id !== item.id)
    );
    setToList((prevList) => [...prevList, item]);
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

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return (
      <div className="failure-view">
        <p>Failed to fetch data. Please try again.</p>
        <span className="retry-btn" onClick={handleRetry}>
          Try Again
        </span>
      </div>
    );
  }

  const listNumber1 = listData.filter((list) => list.list_number === 1);
  const listNumber2 = listData.filter((list) => list.list_number === 2);

  return (
    <div className="list-creation">
      <h1 className="header">List Creation</h1>

      {!isCreating ? (
        <>
          <h1 className="create-btn" onClick={handleCreateNewList}>
            Create a new list
          </h1>

          <div className="lists-wrapper">
            <div className="list-column">
              <div className="list-title">
                <input
                  type="checkbox"
                  onChange={() => toggleSelectList(1)}
                  checked={selectedLists.includes(1)}
                />
                <span className="list-number">List 1</span>
              </div>
              <div className="lists-container">
                {listNumber1.map((listItem) => (
                  <div className="list-item" key={listItem.id}>
                    <h4 className="list-item-name">{listItem.name}</h4>
                    <p className="list-item-description">
                      {listItem.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="list-column">
              <div className="list-title">
                <input
                  type="checkbox"
                  onChange={() => toggleSelectList(2)}
                  checked={selectedLists.includes(2)}
                />
                <span className="list-number">List 2</span>
              </div>
              <div className="lists-container">
                {listNumber2.map((listItem) => (
                  <div className="list-item" key={listItem.id}>
                    <h4 className="list-item-name">{listItem.name}</h4>
                    <p className="list-item-description">
                      {listItem.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="lists-wrapper">
            <div className="list-column">
              <h3>List 1 ({listNumber1.length})</h3>

              <div className="lists-container">
                {listNumber1.map((item) => (
                  <div key={item.id} className="list-item">
                    <h4 className="list-item-name">{item.name}</h4>
                    <p className="list-item-description">{item.description}</p>
                    <span
                      onClick={() =>
                        moveItem(
                          item,
                          listNumber1,
                          newList,
                          setListData,
                          setNewList
                        )
                      }
                    >
                      🡆
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="list-column">
              <h3>List 3 ({newList.length})</h3>

              <div className="lists-container">
                {newList.map((item) => (
                  <div key={item.id} className="list-item">
                    <h4 className="list-item-name">{item.name}</h4>
                    <p className="list-item-description">{item.description}</p>
                    <div className="new-list-buttons">
                      <span
                        onClick={() =>
                          moveItem(
                            item,
                            newList,
                            listNumber1,
                            setNewList,
                            setListData
                          )
                        }
                      >
                        🡄
                      </span>
                      <span
                        onClick={() =>
                          moveItem(
                            item,
                            newList,
                            listNumber2,
                            setNewList,
                            setListData
                          )
                        }
                      >
                        🡆
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="list-column">
              <h3>List 2 ({listNumber2.length})</h3>

              <div className="lists-container">
                {listNumber2.map((item) => (
                  <div key={item.id} className="list-item">
                    <h4 className="list-item-name">{item.name}</h4>
                    <p className="list-item-description">{item.description}</p>
                    <span
                      onClick={() =>
                        moveItem(
                          item,
                          listNumber2,
                          newList,
                          setListData,
                          setNewList
                        )
                      }
                    >
                      🡄
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="button-container">
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button className="update-btn" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ListCreation;
