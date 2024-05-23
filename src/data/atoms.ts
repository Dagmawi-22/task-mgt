import { atom } from 'jotai'

const storedData = localStorage.getItem('cardData')
const storedUser = localStorage.getItem('userData')

const userData = storedUser ? JSON.parse(storedUser) : null

const initialData = storedData
  ? JSON.parse(storedData)
  : {
      lists: [
        {
          id: 'list-4',
          title: 'Blocked',
          cards: ['card-8', 'card-9']
        },
        {
          id: 'list-5',
          title: 'High Priority',
          cards: ['card-10', 'card-11']
        },
        {
          id: 'list-6',
          title: 'Medium Priority',
          cards: ['card-12', 'card-13']
        },
        {
          id: 'list-7',
          title: 'Low Priority',
          cards: ['card-14', 'card-15']
        },
        {
          id: 'list-1',
          title: 'To Do',
          cards: ['card-1', 'card-2', 'card-3']
        },
        {
          id: 'list-2',
          title: 'In Progress',
          cards: ['card-4', 'card-5']
        },
        {
          id: 'list-3',
          title: 'Completed',
          cards: ['card-6', 'card-7']
        }
      ],
      cards: [
        {
          id: 'card-1',
          content: 'User registration',
          assigned: 'john'
        },
        {
          id: 'card-2',
          content: 'Transaction management',
          assigned: 'john'
        },
        {
          id: 'card-3',
          content: 'Promotion campaigns',
          assigned: 'john'
        },
        {
          id: 'card-4',
          content: 'Admin management',
          assigned: 'john'
        },
        {
          id: 'card-5',
          content: 'Content management',
          assigned: 'john'
        },
        {
          id: 'card-6',
          content: 'Data analysis',
          assigned: 'john'
        },
        {
          id: 'card-7',
          content: 'Bug fixing',
          assigned: 'john'
        },
        {
          id: 'card-8',
          content: 'Feature development',
          assigned: 'john'
        },
        {
          id: 'card-9',
          content: 'Code refactoring',
          assigned: 'john'
        },
        {
          id: 'card-10',
          content: 'Testing and QA',
          assigned: 'john'
        },
        {
          id: 'card-11',
          content: 'Documentation',
          assigned: 'john'
        },
        {
          id: 'card-12',
          content: 'UI/UX design',
          assigned: 'john'
        },
        {
          id: 'card-13',
          content: 'Performance optimization',
          assigned: 'john'
        },
        {
          id: 'card-14',
          content: 'Deployment',
          assigned: 'john'
        },
        {
          id: 'card-15',
          content: 'Maintenance',
          assigned: 'john'
        }
      ]
    }

export const boardDataAtom = atom(initialData)
export const userDataAtom = atom(userData)
