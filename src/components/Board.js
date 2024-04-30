import React from "react";
import { ImFileEmpty } from "react-icons/im";
import Avatar from "./Avatar";
import { useAtom } from "jotai";
import { boardDataAtom, userDataAtom } from "../data/atoms";
import LoginWithGoogle from "./GoogleLogin";

const TrelloBoard = () => {
  const [data, setData] = useAtom(boardDataAtom);

  const [user, setUser] = useAtom(userDataAtom);

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
    localStorage.setItem("cardData", JSON.stringify(newData));
  };

  const onDeleteCard = (listId, cardId) => {
    const newData = { ...data };
    newData.lists[listId].cards = newData.lists[listId].cards.filter(
      (id) => id !== cardId
    );

    setData(newData);
    localStorage.setItem("cardData", JSON.stringify(newData));
  };

  return (
    <>
      {user ? (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {Object.values(data.lists).map((list) => (
            <div key={list.id} style={{ margin: 8 }}>
              <h6 style={{ fontWeight: 500 }}>{list.title}</h6>
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
                        padding: 20,
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
                      <button
                        onClick={() => onDeleteCard(list.id, cardId)}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          padding: 7,
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 12,
                          color: "red",
                        }}
                      >
                        X
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <LoginWithGoogle />
      )}
    </>
  );
};

export default TrelloBoard;
