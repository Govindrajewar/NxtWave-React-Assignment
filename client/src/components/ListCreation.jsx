import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/ListCreation.css";

function ListCreation() {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const fetchAllLists = async () => {
      try {
        const response = await axios.get(
          "https://apis.ccbp.in/list-creation/lists"
        );
        setListData(response.data.lists);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchAllLists();
  }, []);

  const listNumber1 = listData.filter((list) => list.list_number === 1);
  const listNumber2 = listData.filter((list) => list.list_number === 2);

  return (
    <div className="list-creation">
      <h1 className="header">List Creation</h1>

      <button className="create-btn">Create a new list</button>

      <div className="lists-wrapper">
        {/* List 1 */}
        <div className="list-column">
          <div className="list-title">
            <span>
              <input type="checkbox" name="" id="" />
            </span>
            <span className="list-number">List 1</span>
          </div>
          <div className="lists-container">
            {listNumber1.map((listItem) => (
              <div className="list-item" key={listItem.id}>
                <h4 className="list-item-name">{listItem.name}</h4>
                <p className="list-item-description">{listItem.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* List 2 */}
        <div className="list-column">
          <div className="list-title">
            <span>
              <input type="checkbox" name="" id="" />
            </span>
            <span className="list-number">List 2</span>
          </div>
          <div className="lists-container">
            {listNumber2.map((listItem) => (
              <div className="list-item" key={listItem.id}>
                <h4 className="list-item-name">{listItem.name}</h4>
                <p className="list-item-description">{listItem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListCreation;
