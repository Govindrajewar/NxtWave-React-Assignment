import React from "react";

function ListCreator({
  listNumber1,
  listNumber2,
  newList,
  moveItem,
  setListData,
  setNewList,
  handleCancel,
  handleUpdate,
}) {
  const handleMoveToFirstList = (item) => {
    moveItem(item, newList, listNumber1, setNewList, setListData, 1);
  };

  const handleMoveToSecondList = (item) => {
    moveItem(item, newList, listNumber2, setNewList, setListData, 2);
  };

  return (
    <>
      <div className="lists-wrapper">
        {/* List 1 */}
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
                      setNewList,
                      3
                    )
                  }
                >
                  🡆
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* New List */}
        <div className="list-column">
          <h3>List 3 ({newList.length})</h3>
          <div className="lists-container">
            {newList.map((item) => (
              <div key={item.id} className="list-item">
                <h4 className="list-item-name">{item.name}</h4>
                <p className="list-item-description">{item.description}</p>
                <div className="new-list-buttons">
                  <span onClick={() => handleMoveToFirstList(item)}>🡄</span>
                  <span onClick={() => handleMoveToSecondList(item)}>🡆</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* List 2 */}
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
                      setNewList,
                      3
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
  );
}

export default ListCreator;
