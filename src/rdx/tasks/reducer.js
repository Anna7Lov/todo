import { v4 as uuidv4 } from 'uuid';
import {
  ADD_TASK, REMOVE_TASK, UPDATE_TASK, CHANGE_TASK_STATUS,
} from './actions';

const initialState = {
  list: [
    {
      id: uuidv4(),
      title: 'Learn CSS',
      description: 'Watch video and do homework 5',
      status: 'Done',
      creationDate: 1569437585730,
      updateDate: null,
    },
    {
      id: uuidv4(),
      title: 'Bake a birthday cake',
      description: 'Honey cake',
      status: 'In Progress',
      creationDate: 1665765789757,
      updateDate: 1668364647658,
    },
    {
      id: uuidv4(),
      title: 'Do English homework',
      description: 'Page 35, exercises 1-6',
      status: 'Open',
      creationDate: 1668364647658,
      updateDate: null,
    },
    {
      id: uuidv4(),
      title: 'Buy meat',
      description: 'Buy 1.5 kg of beef',
      status: 'Done',
      creationDate: Date.now(),
      updateDate: Date.now(),
    },
    {
      id: uuidv4(),
      title: 'Cook dinner',
      description: 'Meat and garnish for 2 persons',
      status: 'In Progress',
      creationDate: Date.now(),
      updateDate: null,
    },
    {
      id: uuidv4(),
      title: 'Learn Redux',
      description: 'Watch video tutorial',
      status: 'Open',
      creationDate: 1666478568885,
      updateDate: null,
    },
    {
      id: uuidv4(),
      title: 'Wash the dishes',
      description: 'Clean up all dirty dishes',
      status: 'Open',
      creationDate: Date.now(),
      updateDate: Date.now(),
    },
  ],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        list: [...state.list, action.payload],
      };

    case REMOVE_TASK:
      return {
        ...state,
        list: state.list.filter((todo) => todo.id !== action.id),
      };

    case UPDATE_TASK:
      return {
        ...state.list,
        list: [
          ...state.list.slice(
            0,
            state.list.findIndex((i) => i.id === action.updatedItem),
          ),
          action.newValue,
          ...state.list.slice(state.list.findIndex((i) => i.id === action.updatedItem) + 1),
        ],
      };

    case CHANGE_TASK_STATUS:
      return {
        ...state.list,
        list: state.list.map((todo) => (
          (todo.id === action.id
            ? {
              ...todo,
              status: action.newStatus,
              updateDate:
              todo.status === action.newStatus ? todo.updateDate : Date.now(),
            }
            : todo)
        )),
      };

    default:
      return state;
  }
};
