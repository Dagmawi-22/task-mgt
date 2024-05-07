import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialData = {
  list1: [
    { id: "1", content: "Item 1" },
    { id: "2", content: "Item 2" },
    { id: "3", content: "Item 3" },
  ],
  list2: [
    { id: "4", content: "Item 4" },
    { id: "5", content: "Item 5" },
    { id: "6", content: "Item 6" },
  ],
};

const Demo = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceList = data[source.droppableId];
    const destinationList = data[destination.droppableId];

    if (source.droppableId === destination.droppableId) {
      const items = Array.from(sourceList);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      setData({
        ...data,
        [source.droppableId]: items,
      });
    } else {
      const sourceItems = Array.from(sourceList);
      const destinationItems = Array.from(destinationList);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, movedItem);

      setData({
        ...data,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destinationItems,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "50px",
        }}
      >
        {Object.keys(data).map((listId) => (
          <Droppable key={listId} droppableId={listId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  width: "200px",
                  minHeight: "200px", // Ensure a minimum height for the list
                }}
              >
                <h2 style={{ textAlign: "center" }}>{listId}</h2>
                {data[listId].map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: "none",
                          padding: "8px",
                          margin: "0 0 8px 0",
                          backgroundColor: "#fff",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          ...provided.draggableProps.style,
                        }}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Demo;
