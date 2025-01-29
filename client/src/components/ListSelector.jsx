import React from "react";

function ListSelector({
  handleCreateNewList,
  toggleSelectList,
  selectedLists,
  listNumber1,
  listNumber2,
}) {
  return (
    <>
      <h1 className="header">List Creation</h1>
      <h1 className="create-btn" onClick={handleCreateNewList}>
        Create a new list
      </h1>

      <div className="lists-wrapper">
        {[
          { number: 1, data: listNumber1 },
          { number: 2, data: listNumber2 },
        ].map((list) => (
          <div className="list-column" key={list.number}>
            <div className="list-title">
              <input
                type="checkbox"
                onChange={() => toggleSelectList(list.number)}
                checked={selectedLists.includes(list.number)}
              />
              <span className="list-number">{`List ${list.number}`}</span>
            </div>
            <div className="lists-container">
              {list.data.map((listItem) => (
                <div className="list-item" key={listItem.id}>
                  <h4 className="list-item-name">{listItem.name}</h4>
                  <p className="list-item-description">
                    {listItem.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ListSelector;
