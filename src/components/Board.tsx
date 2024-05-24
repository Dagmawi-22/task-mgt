import React, { FC, useEffect, useState } from 'react'
import Avatar from './Avatar'
import { useAtom } from 'jotai'
import { boardDataAtom } from '../data/atoms'
import UserProfile from './User'
import Modal from './Modal'
import Autocomplete from './Autocomplete'
import InputField from './Input'
import AvatarLg from './AvatarLg'
import { suggestions } from '../data/static'
import Tooltip from './Tooltip'

type CardData = {
  id: string
  content: string
  assigned: string
}

type List = {
  id: string
  title: string
  cards: string[]
}

type Data = {
  lists: {
    [key: string]: List
  }
  cards: {
    [key: string]: CardData
  }
}

const TrelloBoard: FC = () => {
  const [data, setData] = useAtom<Data>(boardDataAtom)
  const [assignValue, setAssignValue] = useState<string>('')
  const [assignModal, setAssignModal] = useState<boolean>(false)
  const [currentCardId, setCurrentCardId] = useState<string | null>(null)
  const [newTaskModal, setNewTaskModal] = useState<boolean>(false)
  const [newTaskContent, setNewTaskContent] = useState<string>('')
  const [newTaskAssignee, setNewTaskAssignee] = useState<string>('')

  const toggleAssignModal = (cardId: string | null = null) => {
    setAssignModal(!assignModal)
    setAssignValue('')
    setCurrentCardId(cardId)
    if (cardId) {
      setAssignValue(data.cards[cardId].assigned)
    }
  }

  const toggleNewTaskModal = () => {
    setNewTaskModal(!newTaskModal)
    setNewTaskContent('')
    setNewTaskAssignee('')
  }

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase()
  }

  const handleAssign = () => {
    if (currentCardId && assignValue) {
      const newData = { ...data }
      newData.cards[currentCardId].assigned = assignValue
      setData(newData)
      localStorage.setItem('cardData', JSON.stringify(newData))
      toggleAssignModal()
    }
  }

  const handleAddTask = () => {
    if (newTaskContent) {
      const newCardId = `card-${Date.now()}`
      const newCard: CardData = {
        id: newCardId,
        content: newTaskContent,
        assigned: newTaskAssignee
      }
      const newData = { ...data }

      // Ensure the 'todo' list exists
      if (!newData.lists['todo']) {
        newData.lists['todo'] = {
          id: 'todo',
          title: 'To Do',
          cards: []
        }
      }

      newData.cards[newCardId] = newCard
      newData.lists['todo'].cards.push(newCardId)
      setData(newData)
      localStorage.setItem('cardData', JSON.stringify(newData))
      toggleNewTaskModal()
    }
  }

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    cardId: string
  ) => {
    event.dataTransfer.setData('cardId', cardId)
  }

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const onDrop = (event: React.DragEvent<HTMLDivElement>, listId: string) => {
    const cardId = event.dataTransfer.getData('cardId')
    const newData = { ...data }
    const sourceListId = Object.keys(newData.lists).find((key) =>
      newData.lists[key].cards.includes(cardId)
    )

    if (sourceListId && sourceListId === listId) {
      const cards = [...newData.lists[listId].cards]
      const dragIndex = cards.indexOf(cardId)
      const hoverIndex = event.currentTarget.getAttribute('data-index')

      if (hoverIndex !== null) {
        cards.splice(dragIndex, 1)
        cards.splice(Number(hoverIndex), 0, cardId)

        newData.lists[listId].cards = cards
      }
    } else if (sourceListId) {
      newData.lists[sourceListId].cards = newData.lists[
        sourceListId
      ].cards.filter((id) => id !== cardId)
      newData.lists[listId].cards.push(cardId)
    }

    setData(newData)
    localStorage.setItem('cardData', JSON.stringify(newData))
  }

  const onDeleteCard = (listId: string, cardId: string) => {
    const newData = { ...data }
    newData.lists[listId].cards = newData.lists[listId].cards.filter(
      (id) => id !== cardId
    )

    setData(newData)
    localStorage.setItem('cardData', JSON.stringify(newData))
  }

  const [query, setQuery] = useState<string>('')

  const filterData = () => {
    if (!query) {
    } else {
      const filteredLists = { ...data.lists }
      const filteredCards = Object.keys(data.cards)
        .filter((cardId) =>
          data.cards[cardId].content.toLowerCase().includes(query.toLowerCase())
        )
        .reduce(
          (acc, cardId) => {
            acc[cardId] = data.cards[cardId]
            return acc
          },
          {} as Data['cards']
        )

      Object.keys(filteredLists).forEach((listId) => {
        filteredLists[listId].cards = filteredLists[listId].cards.filter(
          (cardId) => cardId in filteredCards
        )
      })
    }
  }
  useEffect(() => {
    filterData()
  }, [query, data])

  return (
    <>
      <UserProfile />

      <div className="flex justify-between items-center m-5">
        <div className="flex items-center mx-5 w-full space-x-4">
          <InputField
            placeholder="Search"
            key="searchInput"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center mx-5 space-x-4">
          {/* <Tooltip text="Add new card"> */}
          <button
            className="btn bt-sm px-5 py-2 bg-green-500 text-white text-2xl rounded-sm hover:bg-green-700"
            onClick={toggleNewTaskModal}
            style={{ marginTop: -11 }}
          >
            +
          </button>
          {/* </Tooltip> */}
        </div>
      </div>

      <div className="mx-5">
        <div className="w-screen px-5 overflow-x-auto">
          <div className="flex justify-around w-max">
            {Object.values(data?.lists).map((list) => (
              <div key={list.id} className="m-2">
                <h6 className="font-semibold text-white">{list.title}</h6>
                <div
                  className="bg-gray-200 bg-opacity-50 p-2 min-h-[200px] rounded"
                  onDragOver={(event) => onDragOver(event)}
                  onDrop={(event) => onDrop(event, list.id)}
                >
                  {list.cards.length === 0 ? (
                    <div className="p-4 text-center text-white text-md">
                      <h4>Nothing found!</h4>
                    </div>
                  ) : (
                    list.cards.map((cardId, index) => (
                      <div
                        key={cardId}
                        draggable
                        onDragStart={(event) => onDragStart(event, cardId)}
                        data-index={index}
                        className="relative mt-3 p-5 min-w-[220px] m-1 bg-white border border-gray-300 rounded cursor-pointer"
                      >
                        {data.cards[cardId].content}
                        <div>
                          <Tooltip text={data.cards[cardId].assigned || ''}>
                            <Avatar
                              title={
                                data.cards[cardId].assigned
                                  ? capitalizeFirstLetter(
                                      data.cards[cardId].assigned
                                    )
                                  : '-'
                              }
                              onClick={() => toggleAssignModal(cardId)}
                            />
                          </Tooltip>
                        </div>
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
        </div>
      </div>

      <Modal
        isOpen={assignModal}
        onClose={() => toggleAssignModal(null)}
        title="Assign task to:"
      >
        <div className="flex items-center justify-center bg-gray-100">
          <Autocomplete
            suggestions={suggestions}
            value={assignValue}
            placeholder="Search assignee..."
            onChange={(val) => setAssignValue(val)}
          />
        </div>
        <button
          onClick={() => toggleAssignModal(null)}
          className="mt-4 px-4 py-2 bg-red-200 text-white rounded hover:bg-red-700"
        >
          Cancel
        </button>
        <button
          onClick={handleAssign}
          className="mt-4 mx-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Assign
        </button>
      </Modal>

      <Modal
        isOpen={newTaskModal}
        onClose={toggleNewTaskModal}
        title="Add New Task"
      >
        <div className="flex my-2 mx-2 flex-col justify-center bg-white-100">
          <InputField
            placeholder="Task description"
            key="taskContent"
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
          />
          <Autocomplete
            suggestions={suggestions}
            value={newTaskAssignee}
            placeholder="Search assignee..."
            onChange={(val) => setNewTaskAssignee(val)}
          />
        </div>
        <button
          onClick={toggleNewTaskModal}
          className="mt-4 px-4 py-2 bg-red-200 text-white rounded hover:bg-red-700"
        >
          Cancel
        </button>
        <button
          onClick={handleAddTask}
          className="mt-4 mx-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Add Task
        </button>
      </Modal>
    </>
  )
}

export default TrelloBoard
