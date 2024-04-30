import { atom } from "jotai";

const storedData = localStorage.getItem("cardData");
const storedUser = localStorage.getItem("userData");

const userData = storedData ? JSON.parse(storedUser) : null;

const initialData = storedData
  ? JSON.parse(storedData)
  : {
      lists: {
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

export const boardDataAtom = atom(initialData);
export const userDataAtom = atom(userData);

// boardDataAtom.onMount = (setAtom) => {
//   return setAtom((prevAtom) => {
//     const updateLocalStorage = (newValue) => {
//       localStorage.setItem("trelloData", JSON.stringify(newValue));
//     };
//     updateLocalStorage(prevAtom);
//     return prevAtom;
//   });
// };
