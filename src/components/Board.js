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
        <div className="flex justify-around">
          {Object.values(data.lists).map((list) => (
            <div key={list.id} className="m-2">
              <h6 className="font-semibold text-white">{list.title}</h6>
              <div
                className="bg-gray-400 bg-opacity-50 p-2 min-h-[200px] rounded"
                onDragOver={(event) => onDragOver(event)}
                onDrop={(event) => onDrop(event, list.id)}
              >
                {list.cards.length === 0 ? (
                  <div className="p-4 text-center text-white text-4xl">
                    <ImFileEmpty />
                  </div>
                ) : (
                  list.cards.map((cardId, index) => (
                    <div
                      key={cardId}
                      draggable
                      onDragStart={(event) => onDragStart(event, cardId)}
                      data-index={index}
                      className="relative p-5 min-w-[220px] m-1 bg-white border border-gray-300 rounded cursor-pointer"
                    >
                      {data.cards[cardId].content}
                      <Avatar title="AB" />
                      <button
                        onClick={() => onDeleteCard(list.id, cardId)}
                        className="absolute top-0 right-0 p-2 text-red-500"
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
