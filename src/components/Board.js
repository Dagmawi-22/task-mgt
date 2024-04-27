import React, { useState } from "react";
import { ImFileEmpty } from "react-icons/im";
import Avatar from "./Avatar";

const initialData = {
  lists: {
    "list-1": {
      id: "list-1",
      title: "To Do",
      cards: ["card-1", "card-2", "card-3"],
    },
    "list-2": {
      id: "list-2",
      title: "In Progress",
      cards: ["card-4", "card-5"],
    },
    "list-3": {
      id: "list-3",
      title: "Completed",
      cards: ["card-6", "card-7"],
    },
    "list-4": {
      id: "list-4",
      title: "Blocked",
      cards: ["card-8", "card-9"],
    },
    "list-5": {
      id: "list-5",
      title: "High Priority",
      cards: ["card-10", "card-11"],
    },
    "list-6": {
      id: "list-6",
      title: "Medium Priority",
      cards: ["card-12", "card-13"],
    },
    "list-7": {
      id: "list-7",
      title: "Low Priority",
      cards: ["card-14", "card-15"],
    },
  },
  cards: {
    "card-1": { id: "card-1", content: "User registration" },
    "card-2": { id: "card-2", content: "Transaction management" },
    "card-3": { id: "card-3", content: "Promotion campaigns" },
    "card-4": { id: "card-4", content: "Admin management" },
    "card-5": { id: "card-5", content: "Content management" },
    "card-6": { id: "card-6", content: "Data analysis" },
    "card-7": { id: "card-7", content: "Bug fixing" },
    "card-8": { id: "card-8", content: "Feature development" },
    "card-9": { id: "card-9", content: "Code refactoring" },
    "card-10": { id: "card-10", content: "Testing and QA" },
    "card-11": { id: "card-11", content: "Documentation" },
    "card-12": { id: "card-12", content: "UI/UX design" },
    "card-13": { id: "card-13", content: "Performance optimization" },
    "card-14": { id: "card-14", content: "Deployment" },
    "card-15": { id: "card-15", content: "Maintenance" },
  },
};

const TrelloBoard = () => {
  const [data, setData] = useState(initialData);

  const onDragStart = (event, cardId) => {
    event.dataTransfer.setData("cardId", cardId);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event, listId) => {
    const cardId = event.dataTransfer.getData("cardId");

    const newData = { ...data };
    const sourceListId = Object.keys(newData.lists).find(
      (key) => newData.lists[key].cards.indexOf(cardId) !== -1
    );

    if (sourceListId === listId) {
      const cards = [...newData.lists[listId].cards];
      const dragIndex = cards.indexOf(cardId);
      const hoverIndex = event.target.getAttribute("data-index");

      cards.splice(dragIndex, 1);
      cards.splice(hoverIndex, 0, cardId);

      newData.lists[listId].cards = cards;
    } else {
      newData.lists[sourceListId].cards = newData.lists[
        sourceListId
      ].cards.filter((id) => id !== cardId);
      newData.lists[listId].cards.push(cardId);
    }

    setData(newData);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {Object.values(data.lists).map((list) => (
        <div key={list.id} style={{ margin: 8 }}>
          <h6>{list.title}</h6>
          <div
            style={{
              background: "rgba(211, 211, 211, 0.5)",
              padding: 8,
              minHeight: "200px",
              borderRadius: 7,
            }}
            onDragOver={(event) => onDragOver(event)}
            onDrop={(event) => onDrop(event, list.id)}
          >
            {list.cards.length === 0 ? (
              <div
                style={{
                  padding: 16,
                  textAlign: "center",
                  color: "#fff",
                  fontSize: 54,
                  width: 200,
                  marginTop: 70,
                }}
              >
                <ImFileEmpty />
              </div>
            ) : (
              list.cards.map((cardId, index) => (
                <div
                  key={cardId}
                  draggable
                  onDragStart={(event) => onDragStart(event, cardId)}
                  data-index={index}
                  style={{
                    userSelect: "none",
                    padding: 16,
                    minWidth: 220,
                    margin: "0 0 8px 0",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    border: "1px solid lightgrey",
                    borderRadius: "4px",
                    width: 200,
                    fontSize: 14,
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  {data.cards[cardId].content}
                  <Avatar title="AB" />
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrelloBoard;
